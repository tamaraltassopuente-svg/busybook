# 🚀 CÓMO PUBLICAR BUSY BOOK PARA JUGAR DESDE EL CELULAR

No hace falta saber programar ni escribir comandos. Todo se hace **desde la web**, arrastrando archivos.

---

## 📌 Respuesta corta a tus dos preguntas

**"¿Vos me darías todo para que cargue y corra?"**
Sí. Yo te dejo la carpeta lista. Vos arrastrás la carpeta a una página web y listo.

**"¿Cuál sería el archivo para pasar y jugar?"**
Ninguno: **se pasa un LINK, no un archivo.** Algo así:

```
https://tamara.github.io/busybook/
```

Ese link lo mandás por WhatsApp. El chico lo toca y se abre el panel de inicio.
No tiene que descargar nada, ni descomprimir, ni instalar.

> 🔑 Por eso el panel de inicio se va a llamar **`index.html`** y no `inicio.html`:
> `index.html` es el nombre que los servidores web abren solos cuando alguien entra al link.
> Si se llamara `inicio.html`, habría que mandar `https://.../inicio.html`, más largo y más fácil de arruinar.

---

## OPCIÓN A · GitHub Pages (gratis, para siempre, SIN DESCARGAR NADA)

> ✅ **No hace falta instalar ningún programa.** Git ya está en tu compu y trae
> un gestor de credenciales: cuando haga falta, se abre una ventanita del navegador,
> tocás **Authorize**, y Windows guarda el permiso. Tu contraseña no se la das a nadie.

### Paso 1 · Crear la cuenta *(solo vos podés hacerlo: es tu identidad)*
1. Entrá a **github.com** → botón **Sign up**
2. Poné tu mail, una contraseña y elegí un nombre de usuario.
   ⚠️ **El nombre de usuario va a ser parte del link.** Si elegís `tamara`, el link será
   `https://tamara.github.io/...`. Elegí algo corto y fácil de dictar por teléfono.
3. Confirmá el mail que te llega.

### Paso 2 · Crear el repositorio (la "carpeta en la nube") — 4 clics
1. Arriba a la derecha, el **`+`** → **New repository**
2. **Repository name:** `busybook`
3. Dejá marcado **Public**
   *(Tiene que ser público para que GitHub Pages funcione gratis. Nadie va a ver esto salvo que le pases el link.)*
4. **No** marques "Add a README file"
5. Botón verde **Create repository**

### Paso 3 · Conectar y subir — esto lo hace Claude
1. En la pantalla que aparece, GitHub te muestra una dirección tipo
   `https://github.com/TU-USUARIO/busybook.git`
2. **Copiala y pegásela a Claude.**
3. Claude conecta la carpeta y sube los 363 archivos.
4. Cuando lo haga, **se va a abrir una ventanita del navegador pidiendo autorizar**.
   Tocá **Authorize** (ya estás con la sesión abierta, así que es un clic).
   Windows guarda el permiso y no vuelve a pedirlo.

> 💡 **¿Por qué así y no arrastrando archivos?** El subidor web de GitHub acepta
> 100 archivos por vez, y son 363. Habría que hacerlo en 4 tandas. Por acá va de una.

### Paso 4 · Encender GitHub Pages — 3 clics
1. Pestaña **Settings** (arriba, a la derecha, el engranaje)
2. Menú de la izquierda: **Pages**
3. En **Source**, elegí **Deploy from a branch**
4. En **Branch**, elegí **main** y la carpeta **/ (root)** → **Save**
5. Esperá **1 o 2 minutos** y recargá la página. Va a aparecer arriba:

   > *Your site is live at https://TU-USUARIO.github.io/busybook/*

6. **Ese es el link.** Copialo y mandalo por WhatsApp. 🎉

### Paso 5 · Que quede como una app en el celular
En el celular, abrí el link y:
- **Android (Chrome):** menú `⋮` → **Agregar a pantalla principal**
- **iPhone (Safari):** botón compartir `⬆️` → **Agregar a inicio**

Queda un ícono en el escritorio del teléfono. El chico lo toca y entra directo, sin ver el navegador.

### Para actualizar algo más adelante
**Doble clic en `PUBLICAR.bat`.** Nada más: detecta lo que cambió, lo sube, y te avisa.
En 1 o 2 minutos el link ya muestra la versión nueva.
*(A veces el celular guarda la versión vieja en caché: recargá tirando la pantalla hacia abajo.)*

Y si estás charlando con Claude, alcanza con pedirle "subí los cambios".

---

## OPCIÓN B · Netlify Drop (más fácil todavía, 30 segundos)

Si GitHub te marea, esta es literalmente arrastrar y listo:

1. Entrá a **app.netlify.com/drop**
2. Arrastrá **la carpeta TAM completa** al recuadro
3. Te da un link al instante, tipo `https://algo-random-123.netlify.app`

**Ventaja:** no necesitás cuenta ni configurar nada.
**Contra:** sin cuenta, el link **se borra a las 24 horas**. Si te registrás (gratis, con el mail) queda para
siempre y además podés ponerle un nombre lindo, tipo `busybook-tamara.netlify.app`.

👉 **Mi consejo:** probá primero con Netlify Drop para ver todo funcionando en el celu en 30 segundos.
Después, con calma, hacé GitHub que es la casa definitiva.

---

## OPCIÓN C · Sin internet, solo en tu compu

Doble clic en `index.html`. Funciona todo: los juegos, los dibujos, las estrellas.
Lo único que necesita internet es el diseño de los botones (Tailwind) y la tipografía.
*(Si querés que ande 100% sin conexión, decime y también bajo esos dos a la carpeta.)*

---

## OPCIÓN D · Mandar un archivo único por WhatsApp

Además de todo lo anterior, te voy a dejar un **`busybook-todo-en-uno.html`**: un solo archivo con
absolutamente todo adentro (juegos, palabras, dibujos), para los casos en que necesites mandar un
archivo y no un link.

**Ojo:** WhatsApp lo manda como *documento*. En Android suele abrir; en iPhone muchas veces no.
El link siempre va a funcionar mejor. Este archivo es el plan B.

---

## ❓ Dudas típicas

| Pregunta | Respuesta |
|---|---|
| ¿Es gratis? | Sí. GitHub Pages y Netlify son gratis para esto, sin límite de visitas ni tarjeta. |
| ¿Cualquiera puede encontrarlo? | Es público pero no está en Google. Solo entra quien tenga el link. |
| ¿Se guardan las estrellas? | Sí, en el navegador de cada aparato (`localStorage`). El progreso del celu y el de la compu son distintos: no se sincronizan. |
| ¿Si borro el historial pierdo las estrellas? | Sí, si borrás "datos de sitios". El progreso es local. |
| ¿Funciona sin internet? | Después de abrirlo una vez, casi todo. Los dibujos y los juegos sí, porque están en la carpeta. |
| ¿Consume datos? | La primera vez, menos de 3 MB. Después casi nada. |
| ¿Sirve en tablet? | Sí, y es donde mejor se juega: los botones son grandes y el arrastrar con el dedo va cómodo. |
