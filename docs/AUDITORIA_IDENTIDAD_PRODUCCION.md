# Auditoría de identidad y preparación de producción

Fecha: 27 de noviembre de 2026.

## Resultado técnico

La intervención conserva la arquitectura HTML/CSS/JavaScript y los precios y beneficios existentes. `npm run verify`, el build de producción y la prueba real de navegador pasan. No se publicó, no se hizo commit y no se hizo push.

## Coherencia comercial revisada

- «En 1 mes» y el acceso institucional de 30 días desde el primer lunes siguiente a la contratación expresan el mismo periodo comercial y no se contradicen.
- La modalidad base es virtual mediante Moodle. El expediente v0.3 sustituyó la conferencia mensual por una conferencia semanal para el Plan Integral institucional.
- Los certificados son privados, se entregan al aprobar y no se presentan como títulos ni acreditaciones oficiales.
- El Hero tenía una frase ambigua sobre «la duración final» que podía interpretarse como duración del curso; se sustituyó por una referencia inequívoca a la conversación inicial de 20 minutos.
- Los planes institucionales e individuales conservan exactamente sus precios y beneficios. Ambas categorías están prerenderizadas en `dist/index.html` y el selector sigue siendo accesible por clic y teclado.

## Pendientes que requieren decisión o información del propietario

- Número internacional de WhatsApp. Mientras falte, los CTA abren WhatsApp Web sin destinatario ni mensaje enviado automáticamente.
- URL definitiva de Moodle. El acceso permanece deshabilitado y fuera del orden de tabulación.
- Dominio definitivo, aunque Netlify puede generar canonical, sitemap, Open Graph y JSON-LD con su variable `URL`.
- Confirmación manual de los perfiles de Facebook, Instagram y TikTok sobre el despliegue real.
- Confirmación de la licencia de la imagen AVIF del Hero y lineamientos de uso de logos de Microsoft y Google.
- Decidir si se sustituye el logo horizontal reconstruido por el archivo oficial. El favicon WI es independiente y no resuelve ese pendiente.

## Pendientes legales y contables

- Verificación registral y de representación de `WALED INNOVATION S.A.`, sin publicar datos personales; NIT, correo, teléfono y WhatsApp oficiales pendientes.
- Revisión y aprobación jurídica de los seis documentos públicos de referencia y del contrato institucional privado.
- Tratamiento de IVA, facturación, emisor de comprobantes y vigencia de precios.
- Definir si los reembolsos de 5 a 10 días se cuentan en días hábiles o calendario, además de las reglas de reprogramación.
- El contrato institucional continúa en `docs/legal/`, excluido de `dist/`; `WALED_Expediente/`, `content/`, `docs/` y archivos internos tampoco se publican.

## Rendimiento y despliegue

- Lighthouse móvil: Performance 96, Accessibility 100, Best Practices 100, SEO 100; LCP 2.7 s, TBT 0 ms y CLS 0.
- Lighthouse escritorio: 100 en las cuatro categorías; LCP 0.6 s.
- La imagen LCP es AVIF de 21 KB, tiene dimensiones, prioridad alta y precarga. El objetivo móvil estable de 2.5 s aún requiere medición sobre Netlify con compresión real y, si fuera necesario, optimización segura de la ruta crítica CSS.
- El código no declara HSTS, pero el sitio actualmente publicado sí responde con `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. Esta política proviene de la configuración o infraestructura actual de Netlify y debe revisarse con el propietario antes del lanzamiento, especialmente por `includeSubDomains` y `preload`.
- El 27 de noviembre de 2026 el sitio publicado respondió 200 por HTTPS para `/`, `/robots.txt` y `/legal/`, con CSP y cabeceras defensivas. El deploy actual todavía no contiene la nueva familia completa WI: solo el SVG anterior responde 200 y los nuevos ICO/PNG responden 404, situación esperada porque esta intervención no se publicó.
- Después de un deploy preview autorizado se deben volver a comprobar cabeceras, caché CDN y que los seis activos WI respondan 200.
