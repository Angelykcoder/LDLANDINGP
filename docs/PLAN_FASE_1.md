# Propuesta de Fase 1: landing «Docentes digitales»

## Lectura del diseño

Se revisaron las cinco páginas de `Docentes digitales.pdf`. El diseño muestra una landing larga con fondo negro, gradientes azules/celestes, tarjetas con borde y efecto de vidrio, formas tridimensionales decorativas y una sans ligera para titulares. Usa etiquetas y cuerpo monoespaciados pequeños; en la implementación propongo reservar la monoespaciada para etiquetas breves y dar al cuerpo una sans de alta legibilidad, como requiere `CODEX.md`.

El PDF incluye precios y cantidades en las tarjetas de planes, logotipos reconocibles de herramientas y una maqueta de reproductor con video. No se trasladan esos detalles: los planes quedan sin precios y solo con Feature 1, Feature 2 y Feature 3; las marcas quedan en texto hasta revisar permisos; el video será un espacio vacío claramente identificado, no un reproductor falso.

## Estructura propuesta

1. **Hero y problemas** — en el primer bloque, promesa «En 1 mes, tus docentes usan la tecnología que tu colegio ya paga», CTA «Agendar reunión» y marca provisional desde la configuración. Debajo, el encabezado «Tu colegio ya tiene la tecnología. Tu equipo aprende a usarla» con tres tarjetas: niveles digitales distintos, herramientas que nadie usa y capacitaciones sin evidencia.
2. **Aprendizaje** — título «Lo que aprenden tus docentes» y cuatro tarjetas: Office, Google Workspace, contenido y multimedia, IA aplicada. Explicaciones breves en español sencillo y sin logos.
3. **Video** — reservar el espacio que aparece antes de planes en el PDF, con aviso visible de video pendiente. No cargar imagen de póster que simule un video real.
4. **Planes** — tres tarjetas: Plan Esencial, Plan Institucional (Recomendado) y Plan Integral. Cada tarjeta contiene únicamente Feature 1, Feature 2 y Feature 3. Sin precios, cantidades, inclusiones adicionales ni características inventadas. CTA «Consultar este plan» con mensaje de WhatsApp que incluya el nombre del plan.
5. **Preguntas frecuentes** — tres preguntas del diseño: duración y número de docentes, temas disponibles, qué recibe cada docente. Responder solo datos confirmados. Acordeón accesible.
6. **Cierre** — «Agenda tu reunión» y «20 minutos para conocer tu colegio, sin compromiso», CTA principal «Agendar reunión». WhatsApp y correo como placeholders centralizados en `js/config.js`.
7. **WhatsApp móvil y pie** — botón flotante en móvil, etiqueta accesible y pie sobrio.

La sección opcional «Cómo funciona» no aparece en el PDF ni se incluye sin aprobación.

## Sistema visual y técnico

- Mantener la composición oscura y los azules/celestes, equilibrando las superficies de vidrio para conservar la lectura y el contraste AA.
- Mobile-first. Un CTA principal, repetido con el mismo texto. Texto base mínimo 18 px; controles de al menos 48 px; contraste AA; foco visible.
- Sans legible para párrafos y mono solo en etiquetas cortas. Limitar efectos, formas decorativas y sombras para que no compitan con el mensaje.
- Sin logos de Microsoft, Google o ChatGPT hasta revisar sus lineamientos. Usar nombres en texto.
- Movimiento sutil y funcional, con `prefers-reduced-motion`; sin animaciones repetitivas, scroll hijacking o efectos que distraigan.
- HTML semántico, un solo H1, idioma español, teclado y nombres accesibles en botones.
- JS clásico con `defer`, IIFE y namespace `LD`, compatible con `file://`. Tokens visuales centralizados en `css/tokens.css`; marca, contactos, planes y mensajes en `js/config.js`.

## Copy base

- **Hero:** «En 1 mes, tus docentes usan la tecnología que tu colegio ya paga.» CTA «Agendar reunión».
- **Problemas:** «Tu colegio ya tiene la tecnología. Tu equipo aprende a usarla.»
- **Aprendizaje:** «Lo que aprenden tus docentes».
- **Video:** aviso «Video de presentación próximamente» junto al espacio reservado.
- **Planes:** solo nombres requeridos, Feature 1, Feature 2, Feature 3 y «Consultar este plan».
- **Cierre:** «Agenda tu reunión. 20 minutos para conocer tu colegio, sin compromiso.»

El texto de diploma, si se incluye, será únicamente «diploma de participación y aprobación emitido por LD Innovations», con el nombre aún pendiente de confirmación.

## Pendientes

- Confirmar la promesa comercial «En 1 mes…» antes de publicar.
- Confirmar nombre de marca; en la implementación guardarlo solo en `js/config.js`.
- Definir número de WhatsApp y correo; mantener `[número]` y `[correo]` mientras tanto.
- Definir las tres features de cada plan; hasta entonces solo placeholders.
- Confirmar video y permiso de uso de logos de herramientas; propuesta actual: no usar logos.
- Confirmar contenido de FAQ sobre duración, temas, cantidades y diploma. El PDF contiene cifras y condiciones que todavía no se trasladan como hechos verificados.
