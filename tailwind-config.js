/* ==================================================================
   BUSY BOOK DIGITAL · PALETA Y TIPOGRAFÍA
   Se carga DESPUÉS del script de Tailwind y ANTES del <body>:
     <script src="https://cdn.tailwindcss.com"></script>
     <script src="tailwind-config.js"></script>
   ================================================================== */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        cielo:    '#7DD3FC',   // azul cielo
        rosa:     '#F9A8D4',   // rosa
        amarillo: '#FDE68A',   // amarillo
        verde:    '#86EFAC',   // verde manzana
        lila:     '#C4B5FD',
        naranja:  '#FDBA74',
        crema:    '#FFFBEB',   // fondo
        tinta:    '#334155'    // texto
      },
      fontFamily: {
        titulo: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        cuerpo: ['Nunito', 'system-ui', 'sans-serif']
      }
    }
  }
};
