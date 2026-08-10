/* ==================================================================
   BUSY BOOK DIGITAL · BANCO DE PALABRAS
   ------------------------------------------------------------------
   Este archivo es la ÚNICA fuente de palabras de toda la colección.
   Si querés agregar o corregir una palabra, se hace acá y cambia
   en los 7 juegos a la vez.

   FORMATO:  PALABRA:codigo    → PALABRA con ese dibujo de Twemoji
             PALABRA           → sin dibujo propio, usa la reserva
                                 de su categoría (ver RESERVAS)
   En los nombres propios el "código" es el género:  :f nena  :m varón
   :x cuando es ambiguo (usa un dibujo neutro; revisar con Tamara).

   Las palabras van SIEMPRE en MAYÚSCULAS y CON acento (LEÓN, MAMÁ).
   El motor ignora los acentos para comparar, así que el chico nunca
   necesita escribir una tilde.
   ================================================================== */

window.BANCO = (() => {

/* ==================================================================
   1 · CATEGORÍAS
   reserva = dibujo que se usa cuando la palabra no tiene uno propio
   ================================================================== */
const CATEGORIAS = {
  nombres:    { nombre:'NOMBRES',        emoji:'🧒', color:'cielo',    reserva:{ f:'1f467', m:'1f466', x:'1f9d2' } },
  calendario: { nombre:'DÍAS Y MESES',   emoji:'📅', color:'lila',     reserva:'1f4c5' },
  familia:    { nombre:'FAMILIA',        emoji:'👨‍👩‍👧', color:'rosa', reserva:'1f46a' },
  colores:    { nombre:'COLORES',        emoji:'🎨', color:'naranja',  reserva:'1f3a8' },
  animales:   { nombre:'ANIMALES',       emoji:'🦁', color:'amarillo', reserva:'1f43e' },
  bichos:     { nombre:'BICHITOS',       emoji:'🐜', color:'verde',    reserva:'1f41b' },
  dinos:      { nombre:'DINOS Y MAGIA',  emoji:'🦖', color:'verde',    reserva:'1f996' },
  comidas:    { nombre:'COMIDAS',        emoji:'🍎', color:'rosa',     reserva:'1f37d' },
  naturaleza: { nombre:'NATURALEZA',     emoji:'🌸', color:'verde',    reserva:'1f33f' },
  clima:      { nombre:'CLIMA Y ESPACIO',emoji:'⛅', color:'cielo',    reserva:'2601' },
  casa:       { nombre:'LA CASA',        emoji:'🏠', color:'amarillo', reserva:'1f3e0' },
  escuela:    { nombre:'LA ESCUELA',     emoji:'🎒', color:'cielo',    reserva:'1f392' },
  ropa:       { nombre:'ROPA',           emoji:'👕', color:'lila',     reserva:'1f455' },
  transporte: { nombre:'TRANSPORTES',    emoji:'🚗', color:'naranja',  reserva:'1f697' },
  cuerpo:     { nombre:'EL CUERPO',      emoji:'💪', color:'rosa',     reserva:'1fa7a' },
  deportes:   { nombre:'DEPORTE Y MÚSICA',emoji:'⚽',color:'verde',    reserva:'26bd' },
  coti:       { nombre:'PALABRAS DE ACÁ',emoji:'🧉', color:'amarillo', reserva:'1f44b' },
  verbos:     { nombre:'ACCIONES',       emoji:'⚡', color:'cielo',    reserva:'26a1' },
  adjetivos:  { nombre:'CÓMO ES',        emoji:'✨', color:'lila',     reserva:'2728' }
};

/* ==================================================================
   2 · LAS PALABRAS
   ================================================================== */
const CRUDO = {

/* ---------- 🧒 NOMBRES PROPIOS (99) ----------------------------- */
/*  :f nena · :m varón · :x ambiguo (revisar)                       */
/*  Géneros revisados con Tamara. Los apodos van con el género del nombre
    completo: TITI es Thiago, BRUNI y BRU son Bruno, VICO es Ludovico.
    AGUS queda neutro a propósito: puede ser Agustín o Agustina.          */
nombres: `
TITI:m THIAGO:m FELI:m FELIPE:m LOLO:m LORENZO:m DELFI:f DELFINA:f CIRO:m
REGI:f REGINA:f NAHUE:m NAHUEL:m EMMA:f SANTI:m SANTIAGO:m BENJA:m BENJAMÍN:m
THEO:m MATTEO:m MATHEO:m LUCA:m RENU:f RENATA:f LUNA:f BAUTI:m BAUTISTA:m
AGUSTINA:f ANTONELLA:f BRUNO:m BRUNI:m BRU:m CLARI:f CLARITA:f CLARA:f MEGAN:f
YAIR:m ADRIANO:m JOAQUÍN:m VIERA:f CAMILO:m ROMEO:m NICOLÁS:m LEÓN:m AZUL:f
GIO:m GIOVANNI:m ABRIL:f ABI:f FAUSTI:m FAUSTINO:m EMI:f EMILIA:f CONSTANTINO:m
VICO:m LUDOVICO:m WENCHI:m POLITO:m HIPÓLITO:m SIMÓN:m CALI:m JACINTO:m JACIN:m
ISA:f ISABELA:f EVA:f VITO:m AGUS:x ALMA:f ORNE:f SOL:f EUGENIA:f TAMARA:f
LEILA:f CRISTIAN:m GUSTAVO:m SOFÍA:f AQUILES:m ENEAS:m LOLA:f WALTER:m NORMA:f
MATÍAS:m MARTÍN:m DAFNE:f MAGALÍ:f EVELYN:f DÁNAE:f IAN:m GABRIEL:m FRANCISCO:m
MARCOS:m MAXI:m CAROLINA:f LAUREANO:m ESTEFI:f BELÉN:f LAILA:f MARILINA:f
VERA:f BRUNELA:f QUIMEI:f KIMEI:f AGUSTÍN:m ORNELLA:f MAXIMILIANO:m
`,

/* ---------- 📅 DÍAS Y MESES (19) -------------------------------- */
calendario: `
LUNES MARTES MIÉRCOLES JUEVES VIERNES SÁBADO DOMINGO
ENERO FEBRERO MARZO ABRIL MAYO JUNIO JULIO AGOSTO
SEPTIEMBRE OCTUBRE NOVIEMBRE DICIEMBRE
`,

/* ---------- 👨‍👩‍👧 FAMILIA (24) --------------------------------- */
familia: `
MAMÁ:1f469 MAMÁS:1f469 PAPÁ:1f468 PAPÁS:1f468
HERMANO:1f466 HERMANOS:1f466 HERMANA:1f467 HERMANAS:1f467
ABUELO:1f474 ABUELOS:1f474 ABUELA:1f475 ABUELAS:1f475
TÍO:1f468 TÍOS:1f468 TÍA:1f469 TÍAS:1f469
PRIMO:1f466 PRIMOS:1f466 PRIMA:1f467 PRIMAS:1f467
HIJO:1f466 HIJOS:1f466 HIJA:1f467 HIJAS:1f467
`,

/* ---------- 🎨 COLORES (los básicos + tu ampliación) ------------ */
/*  Estos NO usan dibujo: el motor les pone un círculo del color
    real, que es mucho más claro para un chico de 4 años.           */
colores: `
ROJO ROJOS ROJA ROJAS AZUL AZULES VERDE VERDES
AMARILLO AMARILLOS AMARILLA AMARILLAS ROSA ROSAS CELESTE CELESTES
BLANCO BLANCOS BLANCA BLANCAS NEGRO NEGROS NEGRA NEGRAS
NARANJA NARANJAS VIOLETA VIOLETAS TURQUESA TURQUESAS LILA LILAS
FUCSIA FUCSIAS GRIS GRISES MARRÓN MARRONES
DORADO DORADOS DORADA DORADAS PLATEADO PLATEADOS PLATEADA PLATEADAS
BRILLANTE BRILLANTES FLÚOR ARCOÍRIS:1f308
`,

/* ---------- 🦁 ANIMALES (60) ------------------------------------ */
animales: `
PERRO:1f436 PERROS:1f436 GATO:1f431 GATOS:1f431 LORO:1f99c LOROS:1f99c
CABALLO:1f434 CABALLOS:1f434 VACA:1f42e VACAS:1f42e OVEJA:1f411 OVEJAS:1f411
CHANCHO:1f437 CHANCHOS:1f437 GALLINA:1f414 GALLINAS:1f414 POLLITO:1f425 POLLITOS:1f425
PATO:1f986 PATOS:1f986 PÁJARO:1f426 PÁJAROS:1f426 PALOMA:1f54a PALOMAS:1f54a
PEZ:1f41f PECES:1f41f PECECITO:1f41f TORTUGA:1f422 TORTUGAS:1f422
CONEJO:1f430 CONEJOS:1f430 RATÓN:1f42d RATONES:1f42d
ELEFANTE:1f418 ELEFANTES:1f418 LEÓN:1f981 LEONES:1f981 TIGRE:1f42f TIGRES:1f42f
OSO:1f43b OSOS:1f43b MONO:1f435 MONOS:1f435 JIRAFA:1f992 JIRAFAS:1f992
CEBRA:1f993 CEBRAS:1f993 SAPO:1f438 SAPOS:1f438 RANA:1f438 RANAS:1f438
TIBURÓN:1f988 TIBURONES:1f988 BALLENA:1f433 BALLENAS:1f433
DELFÍN:1f42c DELFINES:1f42c
`,

/* ---------- 🐜 BICHITOS DEL JARDÍN ------------------------------ */
bichos: `
HORMIGA:1f41c HORMIGAS:1f41c ABEJA:1f41d ABEJAS:1f41d
MARIPOSA:1f98b MARIPOSAS:1f98b MOSQUITO:1f99f MOSQUITOS:1f99f
ARAÑA:1f577 ARAÑAS:1f577 CARACOL:1f40c CARACOLES:1f40c
GUSANO:1fab1 GUSANOS:1fab1 VAQUITA:1f41e GRILLO:1f997 GRILLOS:1f997
LUCIÉRNAGA:1fab2 LUCIÉRNAGAS:1fab2 CUCARACHA:1fab3 CUCARACHAS:1fab3
AVISPA:1f41d AVISPAS:1f41d MOSCA:1fab0 MOSCAS:1fab0
CANGREJO:1f980 CANGREJOS:1f980
`,

/* ---------- 🦖 DINOSAURIOS Y FANTASÍA --------------------------- */
/*  Los 5 dinos específicos esperan tu imagen en img/propias/       */
dinos: `
DINO:1f996 DINOSAURIO:1f996 DINOSAURIOS:1f996
TRICERATOPS BRONTOSAURIO VELOCIRAPTOR PTERODÁCTILO ESTEGOSAURIO
DIPLODOCUS T-REX
MONSTRUO:1f479 MONSTRUOS:1f479 DRAGÓN:1f409 DRAGONES:1f409
HADA:1f9da HADAS:1f9da MAGO:1f9d9 MAGOS:1f9d9 MAGIA:2728
BRUJA:1f9d9 BRUJAS:1f9d9 CASTILLO:1f3f0 CASTILLOS:1f3f0
FANTASMA:1f47b FANTASMAS:1f47b ESPADA:1f5e1 ESPADAS:1f5e1 VARITA:1fa84
`,

/* ---------- 🍎 COMIDAS, FRUTAS Y GOLOSINAS --------------------- */
comidas: `
MILANESA MILANESAS PURÉ ASADO:1f356 EMPANADA EMPANADAS
PIZZA:1f355 PIZZAS:1f355 FIDEOS:1f35d ARROZ:1f35a SOPA:1f372
PAPAS:1f954 FRITAS:1f35f HAMBURGUESA:1f354 HAMBURGUESAS:1f354
PANCHO:1f32d PANCHOS:1f32d HUEVO:1f95a HUEVOS:1f95a PAN:1f35e PANES:1f35e
QUESO:1f9c0 QUESOS:1f9c0 JAMÓN:1f953 MANTECA:1f9c8 LECHE:1f95b
YOGUR:1f95b JUGO:1f9c3 JUGOS:1f9c3 AGUA:1f4a7
HELADO:1f366 HELADOS:1f366 CHOCOLATE:1f36b CHOCOLATES:1f36b
ALFAJOR ALFAJORES CARAMELO:1f36c CARAMELOS:1f36c
CHUPETÍN:1f36d CHUPETINES:1f36d GALLETITA:1f36a GALLETITAS:1f36a
TORTA:1f382 TORTAS:1f382 FLAN:1f36e
MANZANA:1f34e MANZANAS:1f34e BANANA:1f34c BANANAS:1f34c
NARANJA:1f34a NARANJAS:1f34a MANDARINA:1f34a MANDARINAS:1f34a
FRUTILLA:1f353 FRUTILLAS:1f353 LIMÓN:1f34b LIMONES:1f34b
UVA:1f347 UVAS:1f347 PERA:1f350 PERAS:1f350
SANDÍA:1f349 MELÓN:1f348 DURAZNO:1f351
TOMATE:1f345 TOMATES:1f345 LECHUGA:1f96c ZANAHORIA:1f955 CHOCLO:1f33d
TARTA BUDÍN MEDIALUNA MEDIALUNAS CHURRO:1f9c7 CHURROS:1f9c7 CHIPÁ
SÁNDWICH:1f96a SÁNDWICHES:1f96a POCHOCLO:1f37f POCHOCLOS:1f37f
GELATINA GELATINAS DONAS:1f369 CACAO:2615 MERMELADA:1f36f
ANANÁ:1f34d KIWI:1f95d COCO:1f965 PALTA:1f951
FACTURAS BIZCOCHITOS DULCE_DE_LECHE
`,

/* ---------- 🌸 NATURALEZA, FLORES Y ÁRBOLES --------------------- */
naturaleza: `
FLOR:1f338 FLORES:1f338 ROSA:1f339 ROSAS:1f339
MARGARITA:1f33c MARGARITAS:1f33c JAZMÍN:1f33c JAZMINES:1f33c
GIRASOL:1f33b GIRASOLES:1f33b ÁRBOL:1f333 ÁRBOLES:1f333
PINO:1f332 PINOS:1f332 PALMERA:1f334 PALMERAS:1f334
PASTO:1f33f PLANTA:1fab4 PLANTAS:1fab4 HOJA:1f343 HOJAS:1f343
RAMA:1f33f RAMAS:1f33f SEMILLA:1f331 TIERRA:1fab5 BARRO
PIEDRA:1faa8 RÍO:1f30a MAR:1f30a PLAYA:1f3d6 ARENA
`,

/* ---------- ⛅ CLIMA, ESPACIO Y PLANETAS ------------------------ */
clima: `
SOL:2600 LUNA:1f319 ESTRELLA:2b50 ESTRELLAS:2b50
NUBE:2601 NUBES:2601 LLUVIA:1f327 VIENTO:1f32c ARCOÍRIS:1f308
TORNADO:1f32a RAYO:26a1 RAYOS:26a1 TRUENO:1f329 TRUENOS:1f329
NIEVE:2744 HIELO:1f9ca CIELO:2601
PLANETA:1fa90 PLANETAS:1fa90 COHETE:1f680 COHETES:1f680 ASTRONAUTA:1f9d1
`,

/* ---------- 🏠 LA CASA, MUEBLES Y COTIDIANEIDAD ----------------- */
casa: `
CASA:1f3e0 CASAS:1f3e0 PIEZA PIEZAS CUARTO
CAMA:1f6cf CAMAS:1f6cf ALMOHADA ALMOHADAS SÁBANA COLCHÓN ROPERO
COCINA:1f373 HELADERA HORNO MICROONDAS
MESA MESAS SILLA:1fa91 SILLAS:1fa91 BANCO SILLÓN SILLONES
TELE:1f4fa TELEVISOR:1f4fa CONTROL LIVING
BAÑO:1f6bd BAÑOS:1f6bd DUCHA:1f6bf BAÑADERA:1f6c1 INODORO:1f6bd BIDET
PILETA CANILLA CANILLAS ESPEJO:1fa9e ESPEJOS:1fa9e
JABÓN:1f9f4 JABONES:1f9f4 TOALLA TOALLAS CEPILLO PASTA
VENTANA:1fa9f VENTANAS:1fa9f PUERTA:1f6aa PUERTAS:1f6aa PICAPORTE
PARED PAREDES PISO PISOS TECHO PATIO PATIOS JARDÍN BALCÓN TERRAZA
ESCALERA:1fa9c ESCALERAS:1fa9c TIMBRE LLAVE:1f511 LLAVES:1f511
LUZ:1f4a1 LUCES:1f4a1 LÁMPARA:1fa94 VELADOR ENCHUFE:1f50c CABLE
VENTILADOR ESTUFA CORTINA
VASO:1f95b VASOS:1f95b PLATO:1f37d PLATOS:1f37d
TENEDOR:1f374 TENEDORES:1f374 CUCHILLO:1f52a CUCHARA:1f944
OLLA:1f372 SARTÉN:1f373 TAZA:2615 TAZAS:2615
CAJÓN CAJONES PERCHERO PEINE ESPONJA BALDE:1faa3 ESCOBA:1f9f9 TRAPO
BOLSA:1f6cd BOLSAS:1f6cd MANTA MANTAS MOÑO:1f380 MOÑOS:1f380 COLITA
ANILLO:1f48d ANILLOS:1f48d RELOJ:231a
`,

/* ---------- 🎒 LA ESCUELA, ÚTILES Y JUGUETES -------------------- */
escuela: `
ESCUELA:1f3eb ESCUELAS:1f3eb SALITA MAESTRO:1f468 MAESTRA:1f469 SEÑO:1f469
COMPAÑERO COMPAÑEROS AMIGO:1f9d2 AMIGOS:1f9d2 AMIGA:1f9d2 AMIGAS:1f9d2
MOCHILA:1f392 MOCHILAS:1f392 CARTUCHERA CARTUCHERAS
LÁPIZ:270f LÁPICES:270f GOMA GOMAS LAPICERA:1f58a REGLA:1f4cf REGLAS:1f4cf
PLASTICOLA PEGAMENTO TIJERA:2702 TIJERAS:2702
CUADERNO:1f4d4 CUADERNOS:1f4d4 LIBRO:1f4d5 LIBROS:1f4d5
CUENTO:1f4d6 CUENTOS:1f4d6 CARPETA:1f4c1 PIZARRÓN TIZA TIZAS
FIBRÓN TÉMPERA TÉMPERAS PINCEL:1f58c PINCELES:1f58c PLASTILINA MASA
CRAYÓN:1f58d GUARDAPOLVO
JUGUETE:1f9f8 JUGUETES:1f9f8 PELOTA:26bd PELOTAS:26bd
MUÑECA:1fa86 MUÑECAS:1fa86 AUTO:1f697 AUTOS:1f697 CAMIONCITO:1f69b
TREN:1f686 TRENES:1f686 BLOQUE:1f9f1 BLOQUES:1f9f1 LEGO:1f9f1
ROMPECABEZAS:1f9e9 CARTAS:1f0cf DADOS:1f3b2 JUEGO:1f3ae TÍTERE DISFRAZ:1f383
TOBOGÁN:1f6dd HAMACA SUBIBAJA CALESITA PELOTERO
`,

/* ---------- 👕 ROPA Y CALZADO ----------------------------------- */
ropa: `
REMERA:1f455 REMERAS:1f455 PANTALÓN:1f456 PANTALONES:1f456
SHORT:1fa73 SHORTS:1fa73 BERMUDA BUZO:1f9e5 BUZOS:1f9e5
CAMPERA:1f9e5 CAMPERAS:1f9e5 PIJAMA PIJAMAS CALZONCILLO BOMBACHA
MEDIA:1f9e6 MEDIAS:1f9e6 ZAPATILLA:1f45f ZAPATILLAS:1f45f
ZAPATO:1f45e ZAPATOS:1f45e BOTA:1f462 BOTAS:1f462
SANDALIA:1f461 OJOTA:1fa74 OJOTAS:1fa74 CROCS
GORRA:1f9e2 GORRAS:1f9e2 GORRO:1f9e4 GORROS:1f9e4 BUFANDA:1f9e3
GUANTE:1f9e4 MALLA:1fa71 VESTIDO:1f457 POLLERA:1f457 CALZA
PARAGUAS:2602 ANTEOJOS:1f453 JOGGING
`,

/* ---------- 🚗 TRANSPORTES, CALLES Y CIUDAD --------------------- */
transporte: `
AUTO:1f697 AUTOS:1f697 COCHE:1f697 COCHECITO COCHECITOS TAXI:1f696
COLECTIVO:1f68c COLECTIVOS:1f68c BONDI:1f68c BONDIS:1f68c
TREN:1f686 TRENES:1f686 SUBTE:1f687
BICI:1f6b2 BICIS:1f6b2 BICICLETA:1f6b2 BICICLETAS:1f6b2
MOTO:1f3cd MOTOS:1f3cd CAMIÓN:1f69b CAMIONES:1f69b CAMIONETA:1f690
AVIÓN:2708 AVIONES:2708 HELICÓPTERO:1f681 BARCO:1f6a2 BOTE:1f6f6
MONOPATÍN:1f6f4
CALLE CALLES VEREDA VEREDAS ESQUINA SEMÁFORO:1f6a6
PLAZA:1f3de PLAZAS:1f3de PARQUE:1f3de QUIOSCO:1f3ea
SÚPER:1f6d2 SUPERMERCADO:1f6d2 ALMACÉN:1f3ea
PANADERÍA:1f956 HELADERÍA:1f366 FARMACIA:1f48a HOSPITAL:1f3e5
MÉDICO:1f469 BOMBERO:1f692 POLICÍA:1f693 CINE:1f3ac CANCHA:1f3df
`,

/* ---------- 💪 CUERPO HUMANO Y SALUD --------------------------- */
cuerpo: `
CUERPO:1f9d2 CABEZA:1f9d2 PELO:1f9b1 OJOS:1f440 OJO:1f441
NARIZ:1f443 BOCA:1f444 DIENTES:1f9b7 DIENTE:1f9b7 LENGUA:1f445
OREJA:1f442 OREJAS:1f442 CUELLO HOMBRO
BRAZO:1f4aa BRAZOS:1f4aa CODO:1faf6 MANO:1f44b MANOS:1f44b
DEDO:1f446 DEDOS:1f446 UÑA:1f485 PANZA OMBLIGO ESPALDA COLA
PIERNA:1f9b5 PIERNAS:1f9b5 RODILLA PIE:1f9b6 PIES:1f9b6
CORAZÓN:2764 SANGRE:1fa78 HUESO:1f9b4
TOS FIEBRE:1f912 MOCO MOCOS
VACUNA:1f489 REMEDIO:1f48a CURITA:1fa79 CURITAS:1fa79
`,

/* ---------- ⚽ DEPORTES, MÚSICA Y PANTALLAS -------------------- */
deportes: `
FÚTBOL:26bd PELOTA:26bd ARCO:1f945 GOL:26bd GOLES:26bd
BÁSQUET:1f3c0 TENIS:1f3be RAQUETA:1f3be
PATÍN:26f8 PATINES:26f8 ROLLERS:26f8 SKATE:1f6f9 MONOPATÍN:1f6f4
NATACIÓN:1f3ca BAILE:1f483 MÚSICA:1f3b5 CANCIÓN:1f3b5 CANCIONES:1f3b5
GUITARRA:1f3b8 PIANO:1f3b9 PIANOS:1f3b9 TAMBOR:1f941 MICRÓFONO:1f3a4
VIDEO:1f4f9 CELU:1f4f1 CELULAR:1f4f1 TABLET:1f4f1 PANTALLA:1f4f1
COMPU:1f4bb COMPUTADORA:1f4bb DIBUJO:1f3a8
`,

/* ---------- 🧉 DICCIONARIO COTI-RIOPLATENSE -------------------- */
coti: `
CHE MATE MATES TERMO TERMOS BOMBILLA YERBA
PLATA:1f4b5 GUITA:1f4b5
CHAU:1f44b HOLA:1f44b PORFA:1f64f GRACIAS:1f64f PERMISO DALE RE
LINDO:1f60d FEO:1f612 RICO:1f60b ASCO:1f922 PIOLA:1f60e COPADO:1f60e
FIACA:1f634 SIESTA:1f634 BERRINCHE:1f62d UPA:1f931
MIMOS:1f970 ABRAZO:1f917 BESO:1f48b BESOS:1f48b
`,

/* ---------- ⚡ VERBOS FÁCILES (ACCIONES) ----------------------- */
verbos: `
JUGAR:1f3ae CORRER:1f3c3 SALTAR:1f938 CANTAR:1f3a4 BAILAR:1f483
DIBUJAR:1f58d PINTAR:1f3a8 ESCRIBIR:270f LEER:1f4d6
MIRAR:1f440 VER:1f440 ESCUCHAR:1f442 HABLAR:1f5e3
COMER:1f374 TOMAR:1f95b DORMIR:1f634 DESPERTAR:23f0
LAVAR:1f9fc BAÑAR:1f6c0 PEINAR:1f486 VESTIR:1f455
ABRIR:1f6aa CERRAR:1f6aa SUBIR:2b06 BAJAR:2b07 ENTRAR:1f6ac SALIR:1f6aa
PASEAR:1f6b6 VIAJAR:2708 ANDAR:1f6b6 VENIR:1f44b IR:1f6b6
TRAER:1f4e6 LLEVAR:1f4e6 REÍR:1f602 LLORAR:1f622 GRITAR:1f62e
SOPLAR:1f4a8 APLAUDIR:1f44f ABRAZAR:1f917 BESAR:1f48b
QUERER:2764 CUIDAR:1f91d AYUDAR:1f91d COMPARTIR:1f91d
GANAR:1f3c6 PERDER:1f614
`,

/* ---------- ✨ ADJETIVOS Y TEXTURAS ---------------------------- */
adjetivos: `
LISO SUAVE ÁSPERO FRÍO:1f976 CALIENTE:1f975 BLANDO DURO
OLOROSO:1f443 LIMPIO:2728 SUCIO ROTO NUEVO
`
};

/* ==================================================================
   3 · PARSEO
   Convierte el texto compacto de arriba en objetos usables.
   ================================================================== */

/** Quita acentos: LEÓN → LEON. Se usa para comparar y para el teclado.
    ⚠️ La Ñ NO es una N con acento: es otra letra. Hay que protegerla antes
    de normalizar, si no MOÑO se convierte en MONO (bug real que tuvimos). */
function sinAcento(t){
  return String(t)
    .replace(/Ñ/g, '').replace(/ñ/g, '')   // guardamos las eñes
    .normalize('NFD').replace(/[̀-ͯ]/g, '')  // saca tildes y diéresis
    .replace(//g, 'Ñ').replace(//g, 'ñ');  // las devolvemos
}

const PALABRAS = [];
const PORTEXTO = Object.create(null);   // índice para buscar rápido

for (const [cat, crudo] of Object.entries(CRUDO)){
  for (const token of crudo.trim().split(/\s+/)){
    if (!token) continue;
    const i = token.lastIndexOf(':');
    // El guion bajo es un espacio: DULCE_DE_LECHE → "DULCE DE LECHE".
    // Hace falta porque separamos los tokens por espacios.
    const texto  = (i > 0 ? token.slice(0, i) : token).toUpperCase().replace(/_/g, ' ');
    const codigo =  i > 0 ? token.slice(i + 1) : null;

    const esNombre = (cat === 'nombres');
    const p = {
      texto,                            // MAYÚSCULAS con acento: LEÓN
      plano: sinAcento(texto),          // LEON — para comparar y escribir
      cat,
      largo: sinAcento(texto).length,
      // En nombres el "código" es el género, no un dibujo
      genero: esNombre ? (codigo || 'x') : null,
      twemoji: esNombre ? null : codigo,
      cats: null,      // se llena abajo
      esColor: false   // se calcula abajo
    };
    PALABRAS.push(p);

    /* Varias palabras están en dos categorías: LEÓN es nombre propio Y animal,
       SOL es nombre Y clima, ROSA es color Y flor, NARANJA es color Y fruta.
       - `cats` es un array COMPARTIDO por todas las versiones de la palabra,
         así cualquiera de ellas sabe en qué categorías aparece.
       - Como representante para buscar() elegimos la versión que tenga dibujo,
         para que LEÓN muestre 🦁 y no 👦.                                    */
    const previa = PORTEXTO[p.plano];
    if (!previa){
      p.cats = [cat];
      PORTEXTO[p.plano] = p;
    } else {
      p.cats = previa.cats;                             // misma referencia
      if (!p.cats.includes(cat)) p.cats.push(cat);
      if (!previa.twemoji && p.twemoji) PORTEXTO[p.plano] = p;
    }
  }
}

/* Círculo de color en vez de dibujo, pero SOLO si la palabra no tiene un
   dibujo propio. Así AZUL sale como círculo azul, y ROSA sale como 🌹
   (el juego de colores puede pedir el círculo igual, ver Img.html). */
for (const p of PALABRAS){
  p.esColor = p.cats.includes('colores') && !p.twemoji;
}

/* ==================================================================
   4 · API PÚBLICA
   ================================================================== */
return {
  CATEGORIAS,
  PALABRAS,
  sinAcento,

  /** ¿Existe esta palabra? Ignora acentos y mayúsculas. → objeto o null */
  buscar(texto){
    return PORTEXTO[sinAcento(String(texto).toUpperCase())] || null;
  },

  /** Filtra el banco. Ej: filtrar({cat:'animales', conDibujo:true, maxLargo:6}) */
  filtrar({ cat = null, conDibujo = null, minLargo = 0, maxLargo = 99 } = {}){
    return PALABRAS.filter(p =>
      (cat === null || p.cat === cat) &&
      (conDibujo === null || (!!p.twemoji) === conDibujo) &&
      p.largo >= minLargo && p.largo <= maxLargo
    );
  },

  /** Los 99 nombres, para el selector de perfil */
  nombres(){ return PALABRAS.filter(p => p.cat === 'nombres'); },

  /** Números útiles, para chequear que el banco esté completo */
  resumen(){
    const r = { total: PALABRAS.length, conDibujo: 0, porCategoria: {} };
    for (const p of PALABRAS){
      if (p.twemoji) r.conDibujo++;
      r.porCategoria[p.cat] = (r.porCategoria[p.cat] || 0) + 1;
    }
    r.sinDibujo = r.total - r.conDibujo;
    return r;
  }
};
})();
