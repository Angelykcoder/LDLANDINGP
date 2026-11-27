# QA técnico — mejoras de prioridad media

Fecha: 26 de noviembre de 2026.

## Resultado

- Lighthouse móvil: Performance 98, Accessibility 100, Best Practices 100, SEO 100.
- Lighthouse escritorio: 100 en las cuatro categorías.
- Laboratorio móvil: FCP 1.1 s, LCP 2.4 s, TBT 0 ms, CLS 0 y Speed Index 1.1 s.
- Laboratorio escritorio: FCP 0.3 s, LCP 0.5 s, TBT 0 ms, CLS 0 y Speed Index 0.3 s.
- Reflow estrecho equivalente a zoom elevado: Performance 100, Accessibility 100, LCP 1.1 s y CLS 0; la captura no mostró desbordamiento horizontal ni controles solapados en el hero.

Las cifras son mediciones de laboratorio sobre servidor local. No son datos reales de usuarios ni garantizan el mismo resultado en la red pública.

## Cambios aplicados

1. Navegación por teclado del selector con flechas, Home y End; Enter/Espacio se conservan mediante botones nativos.
2. Escape cierra FAQ abiertas y restaura el foco.
3. YouTube solo se carga después de una acción explícita. Escape o «Cerrar video» elimina el iframe y devuelve el foco al control inicial.
4. Región `aria-live` para anunciar la categoría de planes.
5. Moodle sin URL no crea una parada de teclado sin acción.
6. Foco visible reforzado, incluido modo de colores forzados.
7. Eliminación del ancho mínimo global y ajustes del header/dock para reflow estrecho.
8. Dimensiones explícitas del logo para evitar CLS.
9. Nombres accesibles de contacto alineados con sus etiquetas visibles.
10. CSS combinado en producción para reducir solicitudes bloqueantes.
11. Canonical, `og:url`, imagen Open Graph/Twitter, sitemap y JSON-LD generados desde la URL HTTPS real del build.
12. HSTS, CSP, `X-Frame-Options`, `nosniff`, Referrer Policy y Permissions Policy configurados en Netlify.

## Cookies y terceros

No se detectaron cookies propias, Google Analytics, Meta Pixel, `localStorage` ni `sessionStorage`. En la traza de Lighthouse hubo cero solicitudes a YouTube, Google Video o DoubleClick antes del consentimiento. Por ello no se añadió un banner de cookies ficticio. La futura política de privacidad debe explicar que YouTube se carga únicamente bajo acción del visitante.

## Pruebas ejecutadas

- `npm.cmd run verify`
- `npm.cmd audit --omit=dev`
- Lighthouse 13.6.0 móvil, escritorio y reflow estrecho.
- Auditoría estática del HTML, recursos, SEO y cabeceras.
- Pruebas de interacción del selector, WhatsApp, FAQ, Moodle y fachada de YouTube.
- `git diff --check`

## Límites y pendientes

- NVDA no está instalado en este equipo. VoiceOver requiere macOS/iOS y TalkBack requiere Android; no se simularon resultados. Debe hacerse una prueba manual final en esos lectores.
- INP requiere interacción real o datos de campo. TBT fue 0 ms, pero no se presenta como sustituto de INP.
- No existe todavía una URL pública definitiva; HTTPS, HSTS y demás cabeceras solo se validaron en configuración, no en una respuesta real de Netlify.
- La imagen social actual es una fotografía JPEG existente de 1200 × 800 px. Puede reemplazarse más adelante por una pieza de marca de 1200 × 630 px.
- Las imágenes secundarias todavía tienen margen de compresión. No se alteraron sus fuentes ni logos sin una decisión de activos/licencias.
