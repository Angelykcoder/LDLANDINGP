# CODEX.md — Contexto del proyecto

## Objetivo del sitio

Landing page en español para **Docentes digitales**, una propuesta de Waled Innovations para capacitar a docentes de colegios privados de Guatemala en el uso práctico de herramientas digitales. El sitio busca que directores y propietarios de colegios contacten al equipo y agenden una conversación de 20 minutos.

## Estado actual

La landing ya está construida en HTML, CSS y JavaScript vanilla, sin proceso de compilación. Se puede abrir directamente con `index.html`. Incluye:

- Hero con propuesta de valor, CTA y fotografía ilustrativa.
- Secciones de problemas, temas de aprendizaje, presentación, planes, preguntas frecuentes y contacto.
- Planes renderizados desde `js/config.js` mediante `js/plans.js`.
- Enlaces de redes sociales y lógica preparada para WhatsApp: mensajes prellenados para reunión y consulta de cada plan.
- Imágenes para docentes, Office, Google Workspace, contenido multimedia e IA aplicada.
- Video incrustado con `youtube-nocookie.com`.
- Tipografía IBM Plex Sans autoalojada, favicon, metadatos básicos y hojas CSS organizadas por sección.
- Interfaz responsive y controles de accesibilidad como HTML semántico, enlace para saltar al contenido, foco visible y respeto por movimiento reducido.

La configuración de WhatsApp está incompleta: `whatsappNumber` en `js/config.js` está vacío. Por eso el botón flotante y el canal de WhatsApp permanecen ocultos, y los CTA relacionados llevan a la sección de contacto. Al definir el número internacional, el código existente construye enlaces `wa.me` con texto prellenado. No inventar ni introducir un número sin que el usuario lo proporcione.

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
- No mostrar precios. Los planes deben conservar sus nombres y placeholders hasta que el usuario defina sus características.
- El diploma solo puede describirse como «diploma de participación y aprobación emitido por Waled Innovations». No afirmar reconocimiento oficial.
- La promesa «En 1 mes…» está pendiente de validación comercial.
- La marca visible está configurada como Waled Innovations; confirmar la razón social antes de publicar.

## Arquitectura

- `index.html`: estructura de la landing y carga de estilos/scripts.
- `css/tokens.css`, `css/base.css`: variables visuales y estilos base.
- `css/components/` y `css/sections/`: estilos de botones, WhatsApp y secciones.
- `js/config.js`: marca, número/mensajes de WhatsApp y contenido de planes.
- `js/plans.js`: render de tarjetas de planes.
- `js/main.js`: aplica marca y enlaces de WhatsApp.
- `docs/PENDIENTES.md`: decisiones y QA pendiente.
- `docs/DECISIONES.md`: decisiones de diseño y cambios recientes.
- `docs/ASSETS.md`: fuentes de imágenes, tipografía y licencias.

Usar JavaScript clásico con `defer`, IIFEs y namespace `LD`, para conservar compatibilidad con `file://`. Mantener los datos editables en un solo lugar y seguir la estructura modular existente. Responder en español.

## Pendientes conocidos

- Añadir el número de WhatsApp internacional cuando el usuario lo proporcione.
- Sustituir o recuperar el logo original; el SVG actual es una reconstrucción aproximada.
- Definir las características reales de los tres planes.
- Verificar el uso de logos de Microsoft y Google.
- Validar la promesa «En 1 mes…» y los datos de las preguntas frecuentes.
- Completar revisión responsive a 360, 768 y 1280 px, contraste y navegación por teclado.

Consulta `docs/PENDIENTES.md`, `docs/DECISIONES.md` y `docs/ASSETS.md` antes de modificar el contenido. Actualiza esos documentos cuando una decisión o recurso nuevo lo amerite.
