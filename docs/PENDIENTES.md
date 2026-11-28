# Pendientes del proyecto

- Confirmar que la razón social y la marca pública son Waled Innovations antes de publicar. La marca visible se toma de `js/config.js`.
- Confirmar si el SVG horizontal reconstruido debe sustituirse por una versión oficial. El favicon WI ya es independiente y no modifica este logo.
- Añadir el número de WhatsApp con código de país a `whatsappNumber` en `js/config.js` para reemplazar el enlace temporal a WhatsApp Web por una conversación directa con texto prellenado.
- Verificar lineamientos de uso de los logos de Microsoft y Google; se restauraron desde los recursos proporcionados en el PDF.
- Confirmar datos y condiciones comerciales de las respuestas frecuentes antes de publicarlas.
- Ejecutar pruebas manuales en NVDA, VoiceOver y TalkBack con hardware compatible; Lighthouse alcanzó 100 en accesibilidad y las interacciones de teclado están automatizadas, pero esto no equivale a conformidad WCAG completa.
- Confirmar la fuente y licencia de `img/joven-profesora-rubia-usando-laptop-pie-jardin-infantes_839833-9717.avif`.
- Configurar la URL definitiva de Moodle en `moodleUrl` dentro de `js/config.js`.

## Bloqueos de publicación identificados en la auditoría final

- Proporcionar razón social/nombre legal, NIT si corresponde, domicilio o dirección comercial, correo y canal de contacto verificables.
- Encargar revisión jurídica aplicable en Guatemala y aprobar los seis borradores públicos y el contrato institucional privado antes de presentarlos como definitivos.
- Definir condiciones comerciales todavía pendientes: validación contable del tratamiento del IVA y la facturación institucional aplicable también a los planes individuales, vigencia de precios, si el plazo de reembolso de 5 a 10 días se cuenta en días hábiles o calendario y reglas de reprogramación. La segunda oportunidad individual será gratuita y añadirá un mes de acceso; el acceso ordinario dura 30 días desde la activación.
- Confirmar correo, teléfono y número de WhatsApp institucionales. Los planes individuales usarán esos mismos canales y no requieren datos de contacto distintos.
- Proporcionar el dominio definitivo para Search Console y validar canonical, sitemap, imagen social y Schema.org ya generados por el build.
- Revisar la política HSTS efectiva de Netlify: aunque `netlify.toml` no la declara, el sitio publicado responde con `max-age=31536000; includeSubDomains; preload`. Confirmar dominio y estrategia de subdominios antes de conservar o modificar esa política.
- Confirmar las URL definitivas de Facebook, Instagram y TikTok mediante una prueba manual en producción.
- Sustituir el acceso genérico a WhatsApp Web por el número empresarial internacional cuando esté disponible.
- Recopilar Core Web Vitals de campo después del lanzamiento, en especial INP; las métricas actuales son únicamente de laboratorio.
- Diseñar una imagen social dedicada de 1200 × 630 px si se desea una composición de marca; el build utiliza por ahora una fotografía JPEG existente de 1200 × 800 px.
- Optimizar o convertir a WebP/AVIF las imágenes secundarias señaladas por Lighthouse, especialmente `contenido-multimedia.jpg` y los PNG de Office/Google, conservando fidelidad y licencias.
- Mejorar el LCP móvil de laboratorio: la medición actual bajó de 3.2 s a 2.7 s, pero sigue por encima del objetivo estable de 2.5 s. El recurso LCP es AVIF de 21 KB, tiene dimensiones, `fetchpriority="high"` y precarga explícita; falta medir el deploy con compresión real y estudiar una ruta crítica CSS sin introducir regresiones visuales.
