# CODEX.md — Contexto del proyecto

## Objetivo del sitio

Landing page en español para **Docentes digitales**, una propuesta de Waled Innovations para capacitar a docentes de colegios privados de Guatemala en el uso práctico de herramientas digitales. El sitio busca que directores y propietarios de colegios contacten al equipo y agenden una conversación de 20 minutos.

## Estado actual

La landing está construida en HTML, CSS y JavaScript vanilla. Se puede abrir directamente con `index.html` para desarrollo y dispone de un build de producción con `npm run build`, que genera `dist/` mediante una lista explícita de archivos publicables. Incluye:

- Hero con propuesta de valor, CTA y fotografía ilustrativa.
- Secciones de problemas, temas de aprendizaje, presentación, planes, preguntas frecuentes y contacto.
- Planes comerciales institucionales e individuales renderizados desde `js/config.js` mediante `js/plans.js`, con selector segmentado accesible y precios/condiciones aprobados.
- Enlaces de redes sociales y lógica preparada para WhatsApp: mensajes prellenados para reunión y consulta de cada plan.
- Imágenes para docentes, Office, Google Workspace, contenido multimedia e IA aplicada.
- Video incrustado con `youtube-nocookie.com`.
- Tipografía IBM Plex Sans autoalojada, favicon, metadatos básicos y hojas CSS organizadas por sección.
- Interfaz responsive y controles de accesibilidad como HTML semántico, enlace para saltar al contenido, foco visible y respeto por movimiento reducido.
- Configuración de Netlify en `netlify.toml`, página 404, `robots.txt`, cabeceras defensivas y auditoría estática con `npm test`.
- SEO absoluto generado durante el build a partir de `SITE_URL` o de la variable `URL` de Netlify; incluye canonical, sitemap, Open Graph, Twitter Card y Schema.org.
- Fachada de privacidad para YouTube: no se crea el iframe ni se contacta al tercero hasta que el visitante activa el video.

La configuración de WhatsApp está incompleta: `whatsappNumber` en `js/config.js` está vacío. Mientras se confirma, el icono y los CTA abren `web.whatsapp.com` como referencia temporal. Al definir el número internacional, el código existente construye enlaces `wa.me` con texto prellenado. No inventar ni introducir un número sin que el usuario lo proporcione.

## Próximo trabajo solicitado

La prioridad es mejorar el frontend, sobre todo para uso desde celular:

1. Revisar y pulir la experiencia móvil: legibilidad, jerarquía, navegación, espaciado, botones fáciles de tocar y flujo claro hacia el contacto.
2. Hacer que los botones de contacto y consulta abran WhatsApp con un mensaje listo para enviar. Reutilizar la configuración central en `js/config.js`; para activarlo hace falta el número de WhatsApp con código de país.
3. Adaptar o reemplazar imágenes para que encajen con el diseño, el contenido y los tamaños móviles. Mantener textos alternativos útiles, dimensiones explícitas y carga diferida cuando corresponda. Registrar las fuentes/licencias en `docs/ASSETS.md`.

Empieza inspeccionando la página y los archivos relevantes; implementa mejoras coherentes con el diseño y verifica visualmente los tamaños móviles disponibles. Si falta un dato imprescindible —en especial el número de WhatsApp o las imágenes nuevas— avanza lo que sea independiente y pide el dato concreto antes de inventarlo.

## Guía de diseño y contenido

- Público: directores de colegios privados, con poco tiempo y distintos niveles de familiaridad tecnológica; muchos llegarán desde un celular.
- Usar español claro, cercano y sencillo. Evitar jerga y anglicismos innecesarios.
- Priorizar un CTA reconocible para contactar/agendar. Mantener enlaces de WhatsApp directos y mensajes prellenados cuando haya número configurado.
- Diseñar primero para móvil. Mantener texto de cuerpo legible (objetivo mínimo 18 px), controles cómodos (objetivo mínimo 48 px), contraste AA, foco visible y navegación por teclado.
- Conservar la identidad azul y clara actual, la tipografía IBM Plex Sans y los componentes existentes. Evitar efectos que distraigan; respetar `prefers-reduced-motion`.
- No presentar imágenes ilustrativas como clientes reales, testimonios o evidencia de resultados. Añadir alt descriptivo y documentar recursos visuales nuevos.
- No inventar testimonios, clientes, estadísticas, certificaciones, cifras ni condiciones comerciales.
- Mostrar los precios y características oficiales de ambas categorías tal como están centralizados en `js/config.js`; no alterarlos ni añadir beneficios sin aprobación.
- El documento de finalización solo puede describirse como «certificado privado de capacitación emitido por Waled Innovations» para quienes cumplan los requisitos de aprobación. No afirmar reconocimiento oficial.
- Conservar literalmente el mensaje principal «Docentes digitales» y «En 1 mes, tus docentes usan la tecnología que tu colegio ya paga.» por instrucción del usuario.
- La marca visible está configurada como Waled Innovations; confirmar la razón social antes de publicar.

## Arquitectura

- `index.html`: estructura de la landing y carga de estilos/scripts.
- `css/tokens.css`, `css/base.css`: variables visuales y estilos base.
- `css/components/` y `css/sections/`: estilos de botones, WhatsApp y secciones.
- `js/config.js`: marca, número/mensajes de WhatsApp y categorías institucional/individual de planes.
- `js/plans.js`: render de tarjetas, selector de categorías y navegación por teclado.
- `js/main.js`: aplica marca y enlaces de WhatsApp.
- `scripts/build.mjs`: genera `dist/`, prerenderiza los planes y excluye documentación/archivos internos.
- `scripts/audit.mjs`: valida contenido crítico, navegación local, recursos y configuración de producción.
- `scripts/seo-build-test.mjs`: prueba la generación SEO con una URL HTTPS controlada y restaura el build local.
- `netlify.toml`: build, directorio de publicación, caché y cabeceras de seguridad.
- `404.html`, `robots.txt`: recursos públicos básicos de producción.
- `docs/PENDIENTES.md`: decisiones y QA pendiente.
- `docs/DECISIONES.md`: decisiones de diseño y cambios recientes.
- `docs/ASSETS.md`: fuentes de imágenes, tipografía y licencias.

Usar JavaScript clásico con `defer`, IIFEs y namespace `LD`, para conservar compatibilidad con `file://`. Mantener los datos editables en un solo lugar y seguir la estructura modular existente. Responder en español.

## Pendientes conocidos

- Añadir el número de WhatsApp internacional cuando el usuario lo proporcione para reemplazar el enlace temporal por una conversación directa.
- Sustituir o recuperar el logo original; el SVG actual es una reconstrucción aproximada.
- Verificar el uso de logos de Microsoft y Google.
- Confirmar los datos y condiciones comerciales de las preguntas frecuentes.
- Añadir política de privacidad, términos/condiciones, datos empresariales verificables y condiciones completas de contratación tras revisión jurídica.
- Configurar el dominio definitivo para canonical, Open Graph, sitemap, HTTPS y la decisión final sobre HSTS.
- Completar validación manual en NVDA, VoiceOver y TalkBack sobre dispositivos reales; Lighthouse/ARIA no sustituyen estas pruebas.
- Verificar HTTPS y cabeceras efectivamente servidas cuando exista la URL pública de Netlify.
- Recopilar Core Web Vitals reales, especialmente INP, después del lanzamiento.

Consulta `docs/PENDIENTES.md`, `docs/DECISIONES.md` y `docs/ASSETS.md` antes de modificar el contenido. Actualiza esos documentos cuando una decisión o recurso nuevo lo amerite.
