/* ==================================================================
   BUSY BOOK DIGITAL · MOTOR COMPARTIDO
   ------------------------------------------------------------------
   Todo lo que usan los 7 juegos por igual:
     Voz       · hablar con selector de voz por dispositivo
     Sonido    · acierto / error / fanfarria (Web Audio, sin archivos)
     Confeti   · festejo
     Drag      · arrastrar con mouse Y con el dedo
     Silabas   · separador automático de sílabas en español
     Img       · qué dibujo le toca a cada palabra
     Perfil    · quién está jugando (los 99 nombres)
     Puntaje   · estrellas por chico y por área
     UI        · marco de consola, encabezado, festejo, barra, ajustes

   Necesita banco-palabras.js cargado antes.
   ================================================================== */

window.MOTOR = (() => {

/* ==================================================================
   1 · VOZ
   El navegador no trae voz propia: usa la del sistema operativo.
   Por eso suena distinto en Windows, Android y iPhone.
   Solución: dejamos que se elija la voz y la recordamos.
   ================================================================== */
const Voz = (() => {
  const CLAVE_ES = 'bb_voz_es', CLAVE_EN = 'bb_voz_en', CLAVE_ON = 'bb_voz_activa';
  let voces = [];

  function cargar(){
    try { voces = (speechSynthesis.getVoices() || []); } catch(e){ voces = []; }
  }
  if ('speechSynthesis' in window){
    cargar();
    speechSynthesis.addEventListener('voiceschanged', cargar);
  }

  /** Voces disponibles para un idioma, ordenadas por preferencia argentina */
  function disponibles(idioma = 'es'){
    const base = idioma === 'en' ? 'en' : 'es';
    const orden = idioma === 'en'
      ? ['en-us','en-gb','en-au']
      : ['es-ar','es-419','es-mx','es-us','es-es'];
    return voces
      .filter(v => v.lang.replace('_','-').toLowerCase().startsWith(base))
      .sort((a,b) => {
        const ia = orden.indexOf(a.lang.replace('_','-').toLowerCase());
        const ib = orden.indexOf(b.lang.replace('_','-').toLowerCase());
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });
  }

  /** La voz elegida a mano, o la mejor disponible, o null */
  function elegida(idioma = 'es'){
    const guardada = localStorage.getItem(idioma === 'en' ? CLAVE_EN : CLAVE_ES);
    const lista = disponibles(idioma);
    if (guardada){
      const v = lista.find(v => v.name === guardada);
      if (v) return v;
    }
    return lista[0] || null;
  }

  return {
    disponibles, elegida,
    guardar(idioma, nombre){
      localStorage.setItem(idioma === 'en' ? CLAVE_EN : CLAVE_ES, nombre);
    },
    activa(){ return localStorage.getItem(CLAVE_ON) !== 'no'; },
    activar(si){ localStorage.setItem(CLAVE_ON, si ? 'si' : 'no'); },

    /** hablar('PERRO') · hablar('DOG','en')
        Le pasamos el texto en minúscula porque se pronuncia mucho mejor:
        en mayúsculas algunos motores leen letra por letra. */
    hablar(texto, idioma = 'es'){
      if (!('speechSynthesis' in window) || !this.activa()) return;
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(String(texto).toLowerCase());
        const v = elegida(idioma);
        if (v){ u.voice = v; u.lang = v.lang; }
        else  { u.lang = idioma === 'en' ? 'en-US' : 'es-ES'; }
        u.rate = 0.85; u.pitch = 1.12;
        speechSynthesis.speak(u);
      } catch(e){ /* nunca frenamos el juego por el audio */ }
    },

    /** Los móviles no cargan las voces hasta que hay una interacción */
    precalentar(){
      cargar();
      if (!('speechSynthesis' in window)) return;
      try {
        const u = new SpeechSynthesisUtterance(' ');
        u.volume = 0; speechSynthesis.speak(u);
      } catch(e){}
    }
  };
})();


/* ==================================================================
   2 · SONIDO
   ⚠️ Todos los tonos van entre 400 y 1200 Hz: los parlantes de
   celular no reproducen graves. Un tono de 180 Hz que en la compu
   suena bien, en el celu no se escucha.
   ================================================================== */
const Sonido = (() => {
  const CLAVE = 'bb_sonido_activo';
  let ctx = null;

  function ac(){
    if (!ctx){
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function nota(freq, ini, dur, tipo = 'sine', vol = 0.25){
    if (localStorage.getItem(CLAVE) === 'no') return;
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = tipo; o.frequency.value = freq;
    g.gain.setValueAtTime(0, c.currentTime + ini);
    g.gain.linearRampToValueAtTime(vol, c.currentTime + ini + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0008, c.currentTime + ini + dur);
    o.connect(g); g.connect(c.destination);
    o.start(c.currentTime + ini); o.stop(c.currentTime + ini + dur + 0.03);
  }
  return {
    ok(){        nota(659, 0, 0.13, 'sine');  nota(988, 0.11, 0.20, 'sine'); },
    error(){     nota(466, 0, 0.14, 'square', .18); nota(415, 0.12, 0.18, 'square', .18); },
    fanfarria(){ [523, 659, 784, 1046].forEach((f,i) => nota(f, i*0.10, 0.30, 'triangle', .22)); },
    toque(){     nota(880, 0, 0.06, 'sine', .13); },
    activo(){ return localStorage.getItem(CLAVE) !== 'no'; },
    activar(si){ localStorage.setItem(CLAVE, si ? 'si' : 'no'); },
    desbloquear(){ ac(); }
  };
})();


/* ==================================================================
   3 · CONFETI
   ================================================================== */
const Confeti = (() => {
  let cv = null, cx = null, piezas = [], corriendo = false;
  const COL = ['#7DD3FC','#F9A8D4','#FDE68A','#86EFAC','#C4B5FD','#FCA5A5'];

  function preparar(){
    if (cv) return;
    cv = document.createElement('canvas');
    cv.id = 'bb-confeti';
    cv.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998';
    document.body.appendChild(cv);
    cx = cv.getContext('2d');
    const medir = () => { cv.width = innerWidth; cv.height = innerHeight; };
    addEventListener('resize', medir); medir();
  }
  function frame(){
    cx.clearRect(0, 0, cv.width, cv.height);
    piezas.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.16; p.rot += p.vr;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot);
      cx.fillStyle = p.col; cx.fillRect(-p.s/2, -p.s/2, p.s, p.s*0.6); cx.restore();
    });
    piezas = piezas.filter(p => p.y < cv.height + 40);
    if (piezas.length) requestAnimationFrame(frame);
    else { corriendo = false; cx.clearRect(0, 0, cv.width, cv.height); }
  }
  return function lanzar(n = 110){
    preparar();
    for (let i = 0; i < n; i++) piezas.push({
      x: cv.width/2 + (Math.random()-0.5)*cv.width*0.6,
      y: cv.height*0.35 + Math.random()*40,
      vx: (Math.random()-0.5)*9, vy: Math.random()*-11 - 3,
      s: 8 + Math.random()*10, rot: Math.random()*6, vr: (Math.random()-0.5)*0.3,
      col: COL[(Math.random()*COL.length)|0]
    });
    if (!corriendo){ corriendo = true; requestAnimationFrame(frame); }
  };
})();


/* ==================================================================
   4 · DRAG & DROP (mouse + dedo)
   Fichas: cualquier elemento pasado a Drag.ficha(el)
   Zonas : cualquier elemento pasado a Drag.zona(el)
   Al soltar se llama al handler de Drag.alSoltar(fn)
   ================================================================== */
const Drag = (() => {
  let arr = null, fant = null, res = null, handler = null;

  const mover = t => {
    fant.style.left = (t.clientX - fant.offsetWidth/2) + 'px';
    fant.style.top  = (t.clientY - fant.offsetHeight/2) + 'px';
  };
  const zonaEn = t => {
    const e = document.elementFromPoint(t.clientX, t.clientY);
    return e ? e.closest('[data-zone]') : null;
  };
  function resaltar(z){
    if (res === z) return;
    if (res) res.classList.remove('ring-4','ring-verde','scale-105');
    res = z;
    if (z) z.classList.add('ring-4','ring-verde','scale-105');
  }
  return {
    alSoltar(fn){ handler = fn; },
    ficha(el){
      el.classList.add('no-sel');
      el.style.cursor = 'grab';
      el.setAttribute('draggable','true');

      el.addEventListener('dragstart', e => {
        arr = el;
        try { e.dataTransfer.setData('text/plain', el.dataset.val || ''); } catch(_){}
        el.classList.add('opacity-40');
      });
      el.addEventListener('dragend', () => { el.classList.remove('opacity-40'); resaltar(null); });

      el.addEventListener('touchstart', e => {
        arr = el;
        fant = el.cloneNode(true);
        fant.classList.add('fixed','pointer-events-none','opacity-90');
        fant.style.zIndex = '9997';
        fant.style.width  = el.offsetWidth  + 'px';
        fant.style.height = el.offsetHeight + 'px';
        fant.style.transform = 'scale(1.12)';
        document.body.appendChild(fant);
        mover(e.touches[0]);
        el.classList.add('opacity-30');
      }, { passive:true });

      el.addEventListener('touchmove', e => {
        if (!fant) return;
        e.preventDefault();                 // que la página no scrollee al arrastrar
        mover(e.touches[0]);
        resaltar(zonaEn(e.touches[0]));
      }, { passive:false });

      el.addEventListener('touchend', e => {
        if (!fant) return;
        fant.remove(); fant = null;
        el.classList.remove('opacity-30');
        const z = zonaEn(e.changedTouches[0]);
        resaltar(null);
        if (handler && z && arr) handler(z, arr);
        arr = null;
      });

      el.addEventListener('touchcancel', () => {
        if (fant){ fant.remove(); fant = null; }
        el.classList.remove('opacity-30'); resaltar(null); arr = null;
      });
    },
    zona(el){
      el.setAttribute('data-zone','1');
      el.addEventListener('dragover',  e => { e.preventDefault(); resaltar(el); });
      el.addEventListener('dragleave', () => resaltar(null));
      el.addEventListener('drop', e => {
        e.preventDefault(); resaltar(null);
        if (handler && arr) handler(el, arr);
        arr = null;
      });
    }
  };
})();


/* ==================================================================
   5 · SILABEADOR AUTOMÁTICO DE ESPAÑOL
   ------------------------------------------------------------------
   Nadie corta 871 palabras a mano. Reglas que aplica:
     · Dígrafos que no se separan nunca:  CH  LL  RR  QU(e/i)  GU(e/i)
     · Grupos trabados que van juntos:    BR BL CR CL DR FR FL GR GL PR PL TR TL
       → LI-BRO (no LIB-RO) · TA-BLA · BI-CI-CLE-TA
     · Diptongos y hiatos:
       fuerte+fuerte se separa       → LE-ER, TO-A-LLA
       vocal débil con tilde separa  → RÍ-O, DÍ-A, MA-ÍZ, AR-CO-Í-RIS
       el resto van juntas           → PIE, A-GUA, ES-TE-GO-SAU-RIO
   ================================================================== */
const Silabas = (() => {
  const VOC       = 'AEIOUÁÉÍÓÚÜ';
  const FUERTES   = 'AEOÁÉÓ';
  const DEBIL_TIL = 'ÍÚ';                        // débil acentuada: rompe el diptongo
  const DIGRAFOS  = ['CH','LL','RR'];
  const TRABADAS  = ['BR','BL','CR','CL','DR','FR','FL','GR','GL','PR','PL','TR','TL'];

  const esVoc = c => VOC.includes(c);

  /** Parte la palabra en unidades: CH y LL cuentan como una sola letra */
  function unidades(p){
    const U = [];
    for (let i = 0; i < p.length; i++){
      const par = p.substr(i, 2), sig = p[i+2] || '';
      if (DIGRAFOS.includes(par)){ U.push({ t:'c', v:par }); i++; continue; }
      // QU y GU sólo son dígrafo delante de E o I (QUESO, JUGUETE).
      // En GUARDAPOLVO o AGUA la U suena, así que no lo son.
      if ((par === 'QU' || par === 'GU') && 'EIÉÍ'.includes(sig)){ U.push({ t:'c', v:par }); i++; continue; }
      U.push({ t: esVoc(p[i]) ? 'v' : 'c', v: p[i] });
    }
    return U;
  }

  /** ¿Estas dos vocales suenan en la misma sílaba? */
  function mismoNucleo(a, b){
    if (DEBIL_TIL.includes(a) || DEBIL_TIL.includes(b)) return false;   // RÍ-O
    if (FUERTES.includes(a)   && FUERTES.includes(b))   return false;   // LE-ER
    return true;                                                        // PIE, GUA, SAU
  }

  const esTrabada = cons =>
    cons.length === 2 &&
    cons[0].v.length === 1 && cons[1].v.length === 1 &&
    TRABADAS.includes(cons[0].v + cons[1].v);

  function separar(palabra){
    const p = String(palabra).toUpperCase().replace(/[^A-ZÁÉÍÓÚÜÑ]/g, '');
    if (p.length < 2) return p ? [p] : [];
    const U = unidades(p);

    /* 1 · Agrupar las vocales en núcleos */
    const nucleos = [];
    for (let i = 0; i < U.length; i++){
      if (U[i].t !== 'v') continue;
      let j = i;
      while (j + 1 < U.length && U[j+1].t === 'v' && mismoNucleo(U[j].v, U[j+1].v)) j++;
      nucleos.push([i, j]);
      i = j;
    }
    if (!nucleos.length) return [p];                 // palabra sin vocales

    /* 2 · Decidir dónde corta cada sílaba */
    const cortes = [0];
    for (let n = 0; n < nucleos.length - 1; n++){
      const fin = nucleos[n][1], ini = nucleos[n+1][0];
      const cons = U.slice(fin + 1, ini);
      let corte;
      switch (cons.length){
        case 0:  corte = ini;                                        break;  // hiato: LE|ER
        case 1:  corte = ini - 1;                                    break;  // CA|SA
        case 2:  corte = esTrabada(cons)        ? ini - 2 : ini - 1;  break;  // LI|BRO · AR|TE
        case 3:  corte = esTrabada(cons.slice(1)) ? ini - 2 : ini - 1; break;  // EN|TRAR · INS|TAR
        default: corte = ini - 2;                                    break;  // CONS|TRUIR
      }
      cortes.push(corte);
    }

    /* 3 · Cortar */
    const salida = [];
    for (let c = 0; c < cortes.length; c++){
      const a = cortes[c];
      const b = (c + 1 < cortes.length) ? cortes[c+1] : U.length;
      salida.push(U.slice(a, b).map(u => u.v).join(''));
    }
    return salida.filter(Boolean);
  }

  return { separar, unidades };
})();


/* ==================================================================
   6 · IMÁGENES
   Prioridad:  img/propias/<palabra>.png  →  img/twemoji/<codigo>.svg
               →  dibujo de reserva de la categoría
   Así, apenas Tamara guarda una imagen propia, gana sin tocar código.
   ================================================================== */
const Img = (() => {
  /** DULCE DE LECHE → dulce-de-leche · PIZARRÓN → pizarron */
  function slug(texto){
    return BANCO.sinAcento(String(texto))
      .toLowerCase().replace(/ñ/g,'n').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  }

  /** Código de reserva de la categoría de una palabra */
  function reserva(p){
    const c = BANCO.CATEGORIAS[p.cat];
    if (!c) return '2753';                                   // signo de pregunta
    if (typeof c.reserva === 'object') return c.reserva[p.genero || 'x'] || c.reserva.x;
    return c.reserva;
  }

  /** Se llama desde el onerror del <img>: prueba el siguiente candidato */
  function fallo(el){
    const cola = (el.dataset.cola || '').split('|').filter(Boolean);
    if (!cola.length){ el.style.visibility = 'hidden'; return; }
    el.dataset.cola = cola.slice(1).join('|');
    el.src = cola[0];
  }

  return {
    slug, reserva, fallo,

    /** ¿Esta palabra se puede dibujar? (para elegir juegos con o sin dibujo) */
    tiene(p){ return !!(p && p.twemoji); },

    /** HTML de la imagen de una palabra del banco.
        Los COLORES llevan un círculo del color real en vez de dibujo.
        ROSA y NARANJA tienen dibujo propio (🌹 y 🍊), así que por defecto
        muestran el dibujo; el juego de colores pasa {comoColor:true} para
        forzar el círculo. */
    html(p, clases = 'w-20 h-20', { comoColor = false } = {}){
      if (!p) return '';
      if (p.esColor || (comoColor && COLORES_CSS[p.plano])){
        const c = COLORES_CSS[p.plano] || '#CBD5E1';
        const borde = ['BLANCO','BLANCOS','BLANCA','BLANCAS'].includes(p.plano) ? '#94A3B8' : 'rgba(0,0,0,.25)';
        return `<span class="${clases} inline-block rounded-full" aria-label="${p.texto}"
                 style="background:${c};border:4px solid ${borde}"></span>`;
      }
      const cola = [];
      if (p.twemoji) cola.push(`img/twemoji/${p.twemoji}.svg`);
      cola.push(`img/twemoji/${reserva(p)}.svg`);
      return `<img class="${clases} inline-block object-contain" alt="${p.texto}"
               src="img/propias/${slug(p.texto)}.png"
               data-cola="${cola.join('|')}"
               onerror="MOTOR.Img.fallo(this)">`;
    }
  };
})();

/* Colores reales para las palabras de la categoría COLORES */
const COLORES_CSS = {
  ROJO:'#EF4444', ROJOS:'#EF4444', ROJA:'#EF4444', ROJAS:'#EF4444',
  AZUL:'#2563EB', AZULES:'#2563EB',
  VERDE:'#22C55E', VERDES:'#22C55E',
  AMARILLO:'#FACC15', AMARILLOS:'#FACC15', AMARILLA:'#FACC15', AMARILLAS:'#FACC15',
  ROSA:'#F472B6', ROSAS:'#F472B6',
  CELESTE:'#7DD3FC', CELESTES:'#7DD3FC',
  BLANCO:'#FFFFFF', BLANCOS:'#FFFFFF', BLANCA:'#FFFFFF', BLANCAS:'#FFFFFF',
  NEGRO:'#1E293B', NEGROS:'#1E293B', NEGRA:'#1E293B', NEGRAS:'#1E293B',
  NARANJA:'#FB923C', NARANJAS:'#FB923C',
  VIOLETA:'#8B5CF6', VIOLETAS:'#8B5CF6',
  TURQUESA:'#2DD4BF', TURQUESAS:'#2DD4BF',
  LILA:'#C4B5FD', LILAS:'#C4B5FD',
  FUCSIA:'#D946EF', FUCSIAS:'#D946EF',
  GRIS:'#94A3B8', GRISES:'#94A3B8',
  MARRON:'#92400E', MARRONES:'#92400E',
  DORADO:'#D4AF37', DORADOS:'#D4AF37', DORADA:'#D4AF37', DORADAS:'#D4AF37',
  PLATEADO:'#C0C0C0', PLATEADOS:'#C0C0C0', PLATEADA:'#C0C0C0', PLATEADAS:'#C0C0C0',
  BRILLANTE:'#FDE68A', BRILLANTES:'#FDE68A', FLUOR:'#CCFF00'
};


/* ==================================================================
   7 · PERFIL · quién está jugando
   ================================================================== */
const Perfil = (() => {
  const CLAVE = 'bb_perfil';
  return {
    actual(){ return localStorage.getItem(CLAVE) || null; },
    poner(nombre){ localStorage.setItem(CLAVE, nombre); },
    salir(){ localStorage.removeItem(CLAVE); },
    /** Dibujo del chico según su nombre (nena / varón / neutro) */
    emojiDe(nombre){
      const p = BANCO.buscar(nombre || '');
      const g = p && p.cat === 'nombres' ? p.genero : 'x';
      return { f:'👧', m:'👦', x:'🧒' }[g] || '🧒';
    }
  };
})();


/* ==================================================================
   8 · PUNTAJE · estrellas por chico y por área
   Clave:  bb_p_<PERFIL>_<area>     (sin perfil: bb_p_INVITADO_<area>)
   ================================================================== */
const AREAS = [
  { id:'lectoescritura',  nombre:'LECTOESCRITURA',    emoji:'📚', color:'bg-cielo',    archivo:'lectoescritura.html' },
  { id:'logica',          nombre:'LÓGICA',            emoji:'🧩', color:'bg-rosa',     archivo:'logica.html' },
  { id:'ingles',          nombre:'INGLÉS',            emoji:'🌎', color:'bg-amarillo', archivo:'ingles.html' },
  { id:'matematica',      nombre:'MATEMÁTICA',        emoji:'🔢', color:'bg-verde',    archivo:'matematica.html' },
  { id:'ciencias',        nombre:'CIENCIAS',          emoji:'🔬', color:'bg-lila',     archivo:'ciencias.html' },
  { id:'colores',         nombre:'COLORES Y FORMAS',  emoji:'🎨', color:'bg-naranja',  archivo:'colores-formas.html' },
  { id:'caligrafia',      nombre:'CALIGRAFÍA',        emoji:'✏️', color:'bg-cielo',    archivo:'caligrafia.html' }
];

const Puntaje = (() => {
  let area = null, sesion = 0, alCambiar = null;
  const clave = (a, quien) => 'bb_p_' + (quien || Perfil.actual() || 'INVITADO') + '_' + a;

  return {
    /** Arranca a contar en un área */
    empezar(a, onCambio){ area = a; sesion = 0; alCambiar = onCambio || null; if (alCambiar) alCambiar(0); },
    sumar(n = 1){
      if (!area) return;
      sesion += n;
      try { localStorage.setItem(clave(area), String(this.leer(area) + n)); } catch(e){}
      if (alCambiar) alCambiar(sesion);
    },
    sesion(){ return sesion; },
    reiniciarSesion(){ sesion = 0; if (alCambiar) alCambiar(0); },
    /** Estrellas acumuladas de un área (del chico que esté jugando) */
    leer(a, quien){ return parseInt(localStorage.getItem(clave(a, quien)) || '0', 10) || 0; },
    /** Total de las 7 áreas */
    total(quien){ return AREAS.reduce((s, a) => s + this.leer(a.id, quien), 0); },
    borrarTodo(quien){ AREAS.forEach(a => localStorage.removeItem(clave(a.id, quien))); }
  };
})();


/* ==================================================================
   9 · UI · lo visual que comparten los 8 archivos
   ================================================================== */
const UI = (() => {

  /** Marco tipo consola de juguete. Devuelve el <main> donde va el contenido. */
  function consola({ titulo, emoji, volverA = 'index.html' }){
    document.body.className = 'font-cuerpo bg-crema text-tinta min-h-screen py-3 px-2 sm:py-6';
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="max-w-5xl mx-auto flex items-stretch gap-1.5 sm:gap-3">
        <div class="w-5 sm:w-12 rounded-l-[2rem] bg-cielo shadow-lg flex flex-col items-center justify-center gap-3">
          <div class="hidden sm:block w-7 h-7 rounded-full bg-white/50"></div>
          <div class="hidden sm:block w-3 h-16 rounded-full bg-white/40"></div>
        </div>

        <div class="flex-1 bg-white rounded-3xl shadow-xl border-4 border-white/60 overflow-hidden">
          <header class="sticky top-0 z-40 bg-amarillo/95 backdrop-blur px-2 py-2 flex items-center gap-1.5 no-sel">
            <a href="${volverA}" class="btn3d bg-white rounded-2xl px-3 py-2 text-xl sm:text-2xl leading-none"
               title="VOLVER">⬅️</a>
            <h1 class="flex-1 font-titulo font-extrabold text-sm sm:text-2xl text-center leading-tight">
              ${emoji} ${titulo}
            </h1>
            <div id="bb-marcador"
                 class="bg-white rounded-2xl px-3 py-2 font-titulo font-extrabold text-lg sm:text-2xl whitespace-nowrap">⭐ 0</div>
            <button id="bb-ajustes" class="btn3d bg-white rounded-2xl px-3 py-2 text-xl sm:text-2xl leading-none"
                    title="AJUSTES">⚙️</button>
            <button id="bb-reiniciar" class="btn3d bg-rosa rounded-2xl px-3 py-2 text-xl sm:text-2xl leading-none"
                    title="REINICIAR">🔄</button>
          </header>
          <main id="bb-vista" class="p-3 sm:p-6 min-h-[28rem]"></main>
        </div>

        <div class="w-5 sm:w-12 rounded-r-[2rem] bg-rosa shadow-lg flex flex-col items-center justify-center">
          <div class="hidden sm:grid grid-cols-2 gap-2">
            <div class="w-4 h-4 rounded-full bg-white/50"></div><div class="w-4 h-4 rounded-full bg-white/50"></div>
            <div class="w-4 h-4 rounded-full bg-white/50"></div><div class="w-4 h-4 rounded-full bg-white/50"></div>
          </div>
        </div>
      </div>`);

    document.getElementById('bb-ajustes').addEventListener('click', panelAjustes);
    return document.getElementById('bb-vista');
  }

  function marcador(n){
    const m = document.getElementById('bb-marcador');
    if (!m) return;
    m.textContent = '⭐ ' + n;
    m.classList.remove('pop'); void m.offsetWidth; m.classList.add('pop');
  }

  /** Portada que desbloquea el audio (los celulares lo exigen) */
  function portada({ emoji, titulo, subtitulo, alEmpezar }){
    const d = document.createElement('div');
    d.className = 'fixed inset-0 z-[9999] bg-gradient-to-b from-cielo via-crema to-rosa ' +
                  'flex flex-col items-center justify-center gap-6 no-sel text-center px-6';
    d.innerHTML = `
      <div class="text-7xl sm:text-8xl flota">${emoji}</div>
      <h1 class="font-titulo font-extrabold text-3xl sm:text-5xl">${titulo}</h1>
      <p class="font-titulo text-lg sm:text-2xl text-tinta/70">${subtitulo || ''}</p>
      <button class="btn3d bg-verde font-titulo font-extrabold text-2xl sm:text-3xl px-12 py-6 rounded-3xl">
        ▶️ ¡JUGAR!
      </button>`;
    document.body.appendChild(d);
    d.querySelector('button').addEventListener('click', () => {
      Sonido.desbloquear();
      Voz.precalentar();
      d.remove();
      alEmpezar();
    });
  }

  /* Festejo pendiente. Hay que poder cancelarlo: si el chico gana y toca
     MENÚ antes de que termine el cartel, el "pasar al siguiente" volvería
     a dibujar el juego encima del menú. */
  let festejoTimer = null, festejoCartel = null;

  function cancelarFestejo(){
    if (festejoTimer){ clearTimeout(festejoTimer); festejoTimer = null; }
    if (festejoCartel){ festejoCartel.remove(); festejoCartel = null; }
  }

  /** Cartel de festejo + confeti + fanfarria */
  function festejar(texto, alTerminar, espera = 2000){
    cancelarFestejo();                       // nunca dos festejos encimados
    Confeti(120);
    Sonido.fanfarria();
    const c = document.createElement('div');
    c.className = 'fixed inset-0 z-[9996] flex items-center justify-center pointer-events-none px-6';
    c.innerHTML = `
      <div class="pop bg-white/95 rounded-3xl px-8 py-6 shadow-2xl border-8 border-verde text-center">
        <div class="text-6xl">🌟</div>
        <div class="font-titulo font-extrabold text-2xl sm:text-3xl mt-2">${texto}</div>
        <div class="font-titulo font-bold text-tinta/60">¡MUY BIEN!</div>
      </div>`;
    document.body.appendChild(c);
    festejoCartel = c;
    festejoTimer = setTimeout(() => {
      festejoTimer = null; festejoCartel = null;
      c.remove();
      if (alTerminar) alTerminar();
    }, espera);
  }

  /** Sacudida + sonido de error, sin bloquear al chico */
  function error(el){
    Sonido.error();
    if (!el) return;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 450);
  }

  /** Ventana genérica */
  function modal(htmlAdentro, alCerrar){
    const d = document.createElement('div');
    d.className = 'fixed inset-0 z-[9995] bg-tinta/50 flex items-center justify-center p-3 overflow-y-auto';
    d.innerHTML = `<div class="bg-white rounded-3xl p-4 sm:p-6 max-w-lg w-full shadow-2xl my-auto">
        ${htmlAdentro}
        <button class="bb-cerrar btn3d bg-verde w-full mt-5 rounded-3xl py-4 font-titulo font-extrabold text-xl">
          LISTO ✅
        </button>
      </div>`;
    document.body.appendChild(d);
    const cerrar = () => { d.remove(); if (alCerrar) alCerrar(); };
    d.querySelector('.bb-cerrar').addEventListener('click', cerrar);
    d.addEventListener('click', e => { if (e.target === d) cerrar(); });
    return d;
  }

  /** ⚙️ Panel de ajustes: acá se resuelve que la voz suene distinto
      en la compu y en el celular. */
  function panelAjustes(){
    const vEs = Voz.disponibles('es'), vEn = Voz.disponibles('en');
    const elEs = Voz.elegida('es'), elEn = Voz.elegida('en');

    const lista = (voces, elegida, id, idioma) => voces.length
      ? `<select id="${id}" class="w-full rounded-2xl border-4 border-cielo p-3 font-titulo font-bold text-base">
           ${voces.map(v => `<option value="${v.name}" ${elegida && v.name === elegida.name ? 'selected':''}>
              ${v.name} (${v.lang})</option>`).join('')}
         </select>
         <button data-probar="${idioma}" class="btn3d bg-amarillo rounded-2xl px-4 py-3 mt-2 font-titulo font-extrabold w-full">
           🔊 PROBAR ESTA VOZ
         </button>`
      : `<p class="bg-crema rounded-2xl p-3 font-bold text-tinta/60">
           ESTE APARATO NO TIENE VOCES EN ${idioma === 'en' ? 'INGLÉS' : 'ESPAÑOL'}.
           EL JUEGO FUNCIONA IGUAL, PERO SIN LEER EN VOZ ALTA.
         </p>`;

    const quien = Perfil.actual();
    const d = modal(`
      <h2 class="font-titulo font-extrabold text-2xl text-center mb-1">⚙️ AJUSTES</h2>
      <p class="text-center font-bold text-tinta/50 text-sm mb-5">PARA GRANDES</p>

      <div class="space-y-4">
        <div>
          <p class="font-titulo font-extrabold mb-1">🗣️ VOZ EN ESPAÑOL</p>
          <p class="text-xs font-bold text-tinta/50 mb-2">
            LA VOZ LA PONE EL CELULAR O LA COMPU, NO EL JUEGO. POR ESO SUENA DISTINTO
            EN CADA APARATO. ELEGÍ LA QUE MÁS TE GUSTE ACÁ.
          </p>
          ${lista(vEs, elEs, 'bb-voz-es', 'es')}
        </div>

        <div>
          <p class="font-titulo font-extrabold mb-1">🌎 VOZ EN INGLÉS</p>
          ${lista(vEn, elEn, 'bb-voz-en', 'en')}
        </div>

        <div class="bg-crema rounded-3xl p-3 space-y-2">
          <label class="flex items-center gap-3 font-titulo font-bold">
            <input type="checkbox" id="bb-cb-voz" class="w-6 h-6 accent-verde" ${Voz.activa()?'checked':''}>
            LEER EN VOZ ALTA
          </label>
          <label class="flex items-center gap-3 font-titulo font-bold">
            <input type="checkbox" id="bb-cb-son" class="w-6 h-6 accent-verde" ${Sonido.activo()?'checked':''}>
            SONIDOS DE ACIERTO Y ERROR
          </label>
        </div>

        <div class="bg-crema rounded-3xl p-3">
          <p class="font-titulo font-extrabold">👤 JUGANDO: ${quien ? Perfil.emojiDe(quien)+' '+quien : '🧒 INVITADO'}</p>
          <p class="text-xs font-bold text-tinta/50 mt-1">
            ${quien ? 'TIENE ⭐ '+Puntaje.total()+' EN TOTAL.' : 'ELEGÍ TU NOMBRE EN LA PANTALLA DE INICIO.'}
          </p>
          <button id="bb-cambiar" class="btn3d bg-cielo rounded-2xl px-4 py-3 mt-2 font-titulo font-extrabold w-full">
            CAMBIAR DE CHICO
          </button>
        </div>
      </div>`);

    // Guardar la voz elegida al cambiarla
    ['es','en'].forEach(idioma => {
      const sel = d.querySelector('#bb-voz-' + idioma);
      if (sel) sel.addEventListener('change', () => Voz.guardar(idioma, sel.value));
    });
    d.querySelectorAll('[data-probar]').forEach(b => b.addEventListener('click', () => {
      const idioma = b.dataset.probar;
      const sel = d.querySelector('#bb-voz-' + idioma);
      if (sel) Voz.guardar(idioma, sel.value);
      Voz.activar(true);
      d.querySelector('#bb-cb-voz').checked = true;
      Voz.hablar(idioma === 'en' ? 'hello, i am your teacher' : 'hola, vamos a jugar juntos', idioma);
    }));
    d.querySelector('#bb-cb-voz').addEventListener('change', e => Voz.activar(e.target.checked));
    d.querySelector('#bb-cb-son').addEventListener('change', e => {
      Sonido.activar(e.target.checked);
      if (e.target.checked) Sonido.ok();
    });
    d.querySelector('#bb-cambiar').addEventListener('click', () => {
      Perfil.salir();
      location.href = 'index.html';
    });
  }

  /** Barra inferior estándar de los juegos */
  function barra({ escuchar = true, textoSiguiente = 'SIGUIENTE ➡️', menu = true } = {}){
    return `<div class="mt-6 flex flex-wrap items-center justify-center gap-3 no-sel">
      ${escuchar ? `<button id="bb-escuchar" class="btn3d bg-amarillo rounded-3xl px-5 py-4 font-titulo font-extrabold text-base sm:text-lg">🔊 ESCUCHAR</button>` : ''}
      <button id="bb-siguiente" class="btn3d bg-verde rounded-3xl px-5 py-4 font-titulo font-extrabold text-base sm:text-lg">${textoSiguiente}</button>
      ${menu ? `<button id="bb-menu" class="btn3d bg-white border-2 border-tinta/10 rounded-3xl px-5 py-4 font-titulo font-bold text-base sm:text-lg">🏠 MENÚ</button>` : ''}
    </div>`;
  }
  function conectarBarra({ escuchar, siguiente, menu }){
    const e = document.getElementById('bb-escuchar');
    const s = document.getElementById('bb-siguiente');
    const m = document.getElementById('bb-menu');
    if (e && escuchar)  e.addEventListener('click', escuchar);
    if (s && siguiente) s.addEventListener('click', siguiente);
    if (m && menu)      m.addEventListener('click', menu);
  }

  /** Encabezado de consigna */
  const consigna = (t, sub = '') => `
    <h2 class="font-titulo font-extrabold text-lg sm:text-2xl text-center leading-tight">${t}</h2>
    ${sub ? `<p class="text-center font-bold text-tinta/60 text-sm sm:text-base mt-1">${sub}</p>` : ''}`;

  /** Marco SVG decorativo: sol, nube, pasto y el dibujo en el medio */
  function escena(interiorHTML, fondo = '#E0F2FE'){
    return `<div class="relative w-full max-w-[14rem] sm:max-w-[17rem] mx-auto">
      <svg viewBox="0 0 300 190" class="w-full">
        <rect x="4" y="4" width="292" height="182" rx="26" fill="${fondo}" stroke="#fff" stroke-width="8"/>
        <circle cx="252" cy="44" r="21" fill="#FDE68A"/>
        <g stroke="#FDE68A" stroke-width="5" stroke-linecap="round">
          <line x1="252" y1="12" x2="252" y2="2"/><line x1="282" y1="44" x2="294" y2="44"/>
          <line x1="277" y1="20" x2="285" y2="12"/></g>
        <g fill="#fff"><circle cx="52" cy="50" r="16"/><circle cx="72" cy="44" r="20"/>
          <circle cx="92" cy="52" r="14"/><rect x="48" y="50" width="46" height="15" rx="7"/></g>
        <path d="M4 152 Q75 128 150 146 T296 140 L296 182 Q296 186 292 186 H8 Q4 186 4 182 Z" fill="#86EFAC"/>
      </svg>
      <div class="absolute inset-0 flex items-center justify-center pb-4">${interiorHTML}</div>
    </div>`;
  }

  return { consola, marcador, portada, festejar, cancelarFestejo, error, modal, panelAjustes,
           barra, conectarBarra, consigna, escena };
})();


/* ==================================================================
   10 · UTILIDADES
   ================================================================== */
const mezclar = a => a.map(v => [Math.random(), v]).sort((x,y) => x[0]-y[0]).map(p => p[1]);
const alAzar  = a => a[(Math.random() * a.length) | 0];
/** n elementos distintos al azar de un array */
const tomar   = (a, n) => mezclar([...a]).slice(0, n);


/* ================== LO QUE QUEDA DISPONIBLE ====================== */
return { Voz, Sonido, Confeti, Drag, Silabas, Img, Perfil, Puntaje, UI,
         AREAS, mezclar, alAzar, tomar };
})();

/* Atajos cómodos para los archivos de juego */
const { Voz, Sonido, Confeti, Drag, Silabas, Img, Perfil, Puntaje, UI,
        AREAS, mezclar, alAzar, tomar } = window.MOTOR;
const BANCO = window.BANCO;
