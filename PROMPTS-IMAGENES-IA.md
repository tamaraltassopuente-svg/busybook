# 🎨 PACK DE PROMPTS PARA GENERAR LAS IMÁGENES CON IA

## Cómo funciona esto

Yo **no puedo generar imágenes**, pero sí puedo dejar todo listo para que las generes vos en un rato
(Claude en la web, ChatGPT, Midjourney, Gemini... cualquiera sirve).

El código va a buscar los dibujos **en este orden**:

```
1º  img/propias/<nombre>.png     ← tu imagen hecha con IA   (gana siempre)
2º  img/twemoji/<codigo>.svg     ← el set base
3º  el emoji de reserva por categoría
```

O sea: **apenas guardás un archivo en `img/propias/`, aparece solo en todos los juegos.**
No hace falta que yo toque nada, ni que las hagas todas de una. Podés hacer 5 hoy y 5 el mes que viene.

---

## ⚠️ Reglas de oro para que queden todas parejas

1. **Fondo transparente** (PNG). Si tu herramienta no puede, usá **fondo blanco liso** y avisame: lo recorto por código.
2. **Cuadradas**, 512×512 px o más.
3. **Un solo objeto centrado**, con aire alrededor. Nada de escenas con muchas cosas (salvo los 6 puzles del final).
4. **Sin texto ni letras** en el dibujo. Los chicos tienen que reconocer por la forma.
5. **Nombre del archivo**: en minúscula, sin acentos ni espacios. Tal cual la columna "ARCHIVO" de las tablas.
   `mate.png`, `pizarron.png`, `dulce-de-leche.png`

---

## 🖌️ EL PROMPT DE ESTILO (pegalo SIEMPRE al principio)

Copiá este bloque y agregale al final el objeto que querés. Es lo que hace que las 33 se vean
de la misma familia y peguen con el diseño de la app.

```
Ilustración infantil vectorial plana de [OBJETO].
Estilo: flat design, contorno negro grueso y redondeado, formas simples y regordetas,
sombreado mínimo, aspecto de sticker, amigable y alegre, para chicos de 4 a 7 años.
Paleta pastel: celeste #7DD3FC, rosa #F9A8D4, amarillo #FDE68A, verde manzana #86EFAC,
más los colores propios del objeto.
Un solo objeto centrado, de frente, encuadre completo con márgenes.
Fondo transparente. Cuadrada. Sin texto, sin letras, sin números, sin marca de agua.
```

💡 **Truco:** generá de 4 en 4 pidiendo *"las 4 en la misma imagen, en una grilla 2×2, mismo estilo"*.
Salen más parejas entre sí y después las recortás. Rinde mucho más.

---

# 📋 LAS 33 IMÁGENES

## 🧉 1 · Comidas y bebidas argentinas (11)
Twemoji no tiene ninguna de estas y aparecen muchísimo en tu banco de palabras.

| # | Palabra | Archivo | Qué pedir |
|---|---|---|---|
| 1 | MATE | `mate.png` | Un mate de calabaza con bombilla de metal, panza redondeada |
| 2 | TERMO | `termo.png` | Termo de acero con manija y tapa, parado |
| 3 | BOMBILLA | `bombilla.png` | Bombilla de mate sola, de metal, con el filtro achatado |
| 4 | ALFAJOR | `alfajor.png` | Alfajor redondo de chocolate, mordido de un lado, con dulce de leche a la vista |
| 5 | MEDIALUNA | `medialuna.png` | Medialuna de manteca, dorada y brillante |
| 6 | FACTURAS | `facturas.png` | Tres facturas surtidas juntas (una con crema, una con membrillo) |
| 7 | CHIPÁ | `chipa.png` | Tres chipás redondos apilados, dorados |
| 8 | BIZCOCHITOS | `bizcochitos.png` | Puñado de bizcochitos de grasa chiquitos y redondos |
| 9 | MILANESA | `milanesa.png` | Milanesa empanada en un plato, con un gajo de limón |
| 10 | EMPANADA | `empanada.png` | Empanada con el repulgue bien marcado |
| 11 | DULCE DE LECHE | `dulce-de-leche.png` | Frasco abierto de dulce de leche con una cuchara adentro |

## 🦖 2 · Dinosaurios (5)
Twemoji solo tiene 🦕 y 🦖. Estos cinco no existen y a los chicos les encantan.

| # | Palabra | Archivo | Qué pedir |
|---|---|---|---|
| 12 | TRICERATOPS | `triceratops.png` | Triceratops verde con los tres cuernos y el collar óseo, sonriendo |
| 13 | BRONTOSAURIO | `brontosaurio.png` | Brontosaurio celeste de cuello largo, cuerpo redondeado |
| 14 | VELOCIRAPTOR | `velociraptor.png` | Velociraptor naranja chiquito, parado en dos patas, simpático (no feroz) |
| 15 | PTERODÁCTILO | `pterodactilo.png` | Pterodáctilo rosa volando con las alas abiertas |
| 16 | ESTEGOSAURIO | `estegosaurio.png` | Estegosaurio verde con las placas triangulares en el lomo |

## 🎒 3 · Escuela argentina (6)

| # | Palabra | Archivo | Qué pedir |
|---|---|---|---|
| 17 | PIZARRÓN | `pizarron.png` | Pizarrón verde con marco de madera y una tiza en la bandeja |
| 18 | CARTUCHERA | `cartuchera.png` | Cartuchera de tela con cierre, abierta, con lápices de colores asomando |
| 19 | PLASTICOLA | `plasticola.png` | Pote de plasticola blanca con tapa naranja de pico |
| 20 | GUARDAPOLVO | `guardapolvo.png` | Guardapolvo blanco de escuela colgado en una percha |
| 21 | TIZA | `tiza.png` | Dos tizas, una blanca y una de color |
| 22 | PLASTILINA | `plastilina.png` | Barritas de plastilina de colores, una amasada en bollo |

## 🎠 4 · Plaza y juegos (4)

| # | Palabra | Archivo | Qué pedir |
|---|---|---|---|
| 23 | SUBIBAJA | `subibaja.png` | Subibaja de plaza rojo y amarillo, visto de costado |
| 24 | CALESITA | `calesita.png` | Calesita con techo a rayas y dos caballitos |
| 25 | PELOTERO | `pelotero.png` | Pileta de pelotas de colores con un tobogán chiquito |
| 26 | HAMACA | `hamaca.png` | Hamaca de plaza con asiento de tabla y dos cadenas |

## 🚌 5 · Transporte argentino (2)

| # | Palabra | Archivo | Qué pedir |
|---|---|---|---|
| 27 | COLECTIVO | `colectivo.png` | Colectivo de línea argentino, de frente, con la puerta y el cartel de número vacío |
| 28 | SUBTE | `subte.png` | Vagón de subte saliendo de un túnel |

## 🧩 6 · Escenas para los ROMPECABEZAS (5)
Estas son **distintas**: acá sí querés una escena con varias cosas, porque se corta en piezas.
Pedilas **horizontales 4:3** y con elementos bien distribuidos (una escena muy vacía hace un puzle imposible).

| # | Escena | Archivo | Qué pedir |
|---|---|---|---|
| 29 | LA PLAZA | `escena-plaza.png` | Plaza con hamaca, tobogán, un árbol, un banco, sol y nubes |
| 30 | LA GRANJA | `escena-granja.png` | Granja con establo rojo, vaca, gallina, oveja, tractor y sol |
| 31 | LA SELVA | `escena-selva.png` | Selva con mono en una liana, tucán, palmeras y hojas grandes |
| 32 | EL MAR | `escena-mar.png` | Fondo del mar con peces de colores, estrella de mar, coral y burbujas |
| 33 | MI CUARTO | `escena-cuarto.png` | Cuarto infantil con cama, ropero, ventana con cortina, juguetes y una lámpara |

Para las 5 escenas, cambiá la última línea del prompt de estilo por:

```
Escena horizontal 4:3, varios elementos claramente separados y distribuidos
por todo el cuadro, sin zonas vacías grandes. Sin texto.
```

---

# 🔁 REGLAS DE RESERVA (lo que pediste)

Cuando una palabra **no tiene** imagen propia ni Twemoji específico, el código pone
automáticamente un dibujo genérico según la categoría. Ya lo dejo programado así:

| Categoría | Reserva | Ejemplos que la van a usar |
|---|---|---|
| **Nombre de nena** | 👧 nena | DELFI, EMMA, RENU, ABRIL, CLARI, ISA, ALMA |
| **Nombre de varón** | 👦 nene | TITI, LOLO, CIRO, BENJA, THEO, VITO, YAIR |
| **Comida sin dibujo** | 🍽️ plato con cubiertos | PURÉ, TARTA, BUDÍN, GELATINA, MERMELADA |
| **Animal sin dibujo** | 🐾 huellitas | CARACOL, LUCIÉRNAGA, VAQUITA, AVISPA |
| **Ropa sin dibujo** | 👕 remera | BERMUDA, CALZA, JOGGING, POLLERA |
| **Casa / mueble** | 🏠 casita | PICAPORTE, PERCHERO, VELADOR, ENCHUFE, BIDET |
| **Escuela / útiles** | 🎒 mochila | FIBRÓN, TÉMPERA, CRAYÓN, CARPETA |
| **Transporte** | 🚗 auto | CAMIONETA, BONDI, MONOPATÍN |
| **Cuerpo / salud** | 🩺 estetoscopio | OMBLIGO, CODO, MOCO, CURITA |
| **Verbo (acción)** | ⚡ rayito | SOPLAR, APLAUDIR, COMPARTIR, CUIDAR |
| **Adjetivo / textura** | ✨ chispitas | ÁSPERO, LISO, BLANDO, OLOROSO |
| **Día o mes** | 📅 calendario | LUNES, MARZO, SEPTIEMBRE |
| **Color** | 🎨 paleta | *(estas van con un círculo del color real, no con emoji)* |

Los **nombres propios**: yo cargo la lista de los 99 marcando cuál es de nena y cuál de varón, para que
DELFI salga con 👧 y THEO con 👦. Los ambiguos como **SOL** los marco a mano.

---

# ✅ Qué necesito de vos

1. Generá las que quieras, **empezando por las 11 comidas argentinas** (son las que más se repiten en tu banco)
2. Guardalas en `TAM\img\propias\` con **el nombre exacto** de la columna ARCHIVO
3. Avisame y yo verifico que estén todas bien cargadas y con el tamaño correcto

**No esperes a tenerlas para que yo siga.** Arranco con Twemoji + las reservas, y tus imágenes van
apareciendo solas a medida que las vayas guardando.
