# Pendientes del proyecto

- Confirmar que la razón social y la marca pública son Waled Innovations antes de publicar. La marca visible se toma de `js/config.js`.
- Volver a colocar el archivo original del logotipo Waled: el PNG se eliminó antes y no está incrustado en el PDF; el SVG actual es una reconstrucción aproximada.
- Añadir el número de WhatsApp con código de país a `whatsappNumber` en `js/config.js` para reemplazar el enlace temporal a WhatsApp Web por una conversación directa con texto prellenado.
- Verificar lineamientos de uso de los logos de Microsoft y Google; se restauraron desde los recursos proporcionados en el PDF.
- Confirmar datos y condiciones comerciales de las respuestas frecuentes antes de publicarlas.
- Ejecutar pruebas manuales en NVDA, VoiceOver y TalkBack con hardware compatible; Lighthouse alcanzó 100 en accesibilidad y las interacciones de teclado están automatizadas, pero esto no equivale a conformidad WCAG completa.
- Confirmar la fuente y licencia de `img/joven-profesora-rubia-usando-laptop-pie-jardin-infantes_839833-9717.avif`.
- Configurar la URL definitiva de Moodle en `moodleUrl` dentro de `js/config.js`.

## Bloqueos de publicación identificados en la auditoría final

- Proporcionar razón social/nombre legal, NIT si corresponde, domicilio o dirección comercial, correo y canal de contacto verificables.
- Encargar revisión jurídica aplicable en Guatemala y aprobar política de privacidad, términos y condiciones e información de tratamiento de datos.
- Definir condiciones comerciales todavía pendientes: impuestos/facturación, vigencia de precios, plazo de procesamiento del reembolso, duración y costo de la segunda oportunidad, reprogramaciones y datos de contacto. La duración variable de los planes individuales quedará registrada en la confirmación de compra.
- Proporcionar el dominio definitivo para Search Console y validar canonical, sitemap, imagen social y Schema.org ya generados por el build.
- Verificar en el despliegue real HTTPS y las cabeceras servidas. HSTS está configurado sin `includeSubDomains` ni `preload`; ampliar esas directivas solo después de confirmar la estrategia de subdominios.
- Confirmar las URL definitivas de Facebook, Instagram y TikTok mediante una prueba manual en producción.
- Sustituir el acceso genérico a WhatsApp Web por el número empresarial internacional cuando esté disponible.
- Recopilar Core Web Vitals de campo después del lanzamiento, en especial INP; las métricas actuales son únicamente de laboratorio.
- Diseñar una imagen social dedicada de 1200 × 630 px si se desea una composición de marca; el build utiliza por ahora una fotografía JPEG existente de 1200 × 800 px.
