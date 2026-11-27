(function () {
  "use strict";

  window.LD = window.LD || {};
  window.LD.config = {
    brandName: "Waled Innovations",
    // TODO: Configurar aquí la URL definitiva de acceso a Moodle.
    moodleUrl: "",
    // Completar con código de país y número, solo dígitos.
    whatsappNumber: "",
    // Enlace temporal mientras se confirma el número comercial.
    whatsappWebUrl: "https://web.whatsapp.com/",
    whatsappMessages: {
      meeting: "Hola, quisiera agendar una reunión para conocer la capacitación digital docente.",
      plan: "Hola, estoy interesado en el {plan}."
    },
    planCategories: {
      institutional: {
        label: "Institucionales",
        audience: "Para instituciones educativas",
        description: "Compara la cantidad de profesores, cursos y modalidad de acompañamiento de cada paquete institucional.",
        plans: [
          {
            name: "Plan Esencial",
            price: "Q1,500",
            contactLabel: "Plan Esencial Institucional de Q1,500",
            features: [
              "Acceso a la plataforma virtual.",
              "Capacidad para 10 profesores.",
              "Certificado privado de capacitación.",
              "Elección de 1 curso para todos los profesores."
            ]
          },
          {
            name: "Plan Institucional",
            price: "Q2,600",
            contactLabel: "Plan Institucional de Q2,600",
            featured: true,
            badge: "Más popular",
            features: [
              "Acceso a la plataforma virtual.",
              "Capacidad para 20 profesores.",
              "Certificado privado de capacitación.",
              "Elección de 2 cursos.",
              "Cada profesor puede escoger los cursos que desea realizar."
            ]
          },
          {
            name: "Plan Integral",
            price: "Q3,900",
            contactLabel: "Plan Integral Institucional de Q3,900",
            features: [
              "Acceso a la plataforma virtual.",
              "Capacidad para 35 profesores.",
              "Certificado privado de capacitación.",
              "Elección de 3 cursos.",
              "Cada profesor puede escoger los cursos que desea realizar.",
              "Conferencia en vivo para resolver dudas.",
              "Una conferencia semanal.",
              "Explicación y acompañamiento de los temas."
            ]
          }
        ]
      },
      individual: {
        label: "Individuales",
        audience: "Para docentes individuales",
        description: "Elige una capacitación individual según la cantidad de cursos y la duración acordada al contratar.",
        plans: [
          {
            name: "Plan Esencial",
            price: "Q175",
            contactLabel: "Plan Esencial Individual de Q175",
            features: [
              "Acceso a 1 curso.",
              "Acceso a la plataforma virtual.",
              "Duración de acceso acordada al contratar.",
              "Certificado privado de capacitación por curso aprobado.",
              "Material de aprendizaje.",
              "Evaluaciones del curso.",
              "Soporte por WhatsApp o llamada, de lunes a domingo, con respuesta estimada de 1 a 8 horas."
            ]
          },
          {
            name: "Plan Profesional",
            price: "Q275",
            contactLabel: "Plan Profesional Individual de Q275",
            features: [
              "Acceso a 2 cursos.",
              "Acceso a la plataforma virtual.",
              "Duración de acceso acordada al contratar.",
              "Certificado privado de capacitación por cada curso aprobado.",
              "Elección libre de los cursos.",
              "Material de aprendizaje.",
              "Evaluaciones de los cursos.",
              "Soporte por WhatsApp o llamada, de lunes a domingo, con respuesta estimada de 1 a 8 horas."
            ]
          },
          {
            name: "Plan Integral",
            price: "Q375",
            contactLabel: "Plan Integral Individual de Q375",
            featured: true,
            badge: "Más conveniente",
            features: [
              "Acceso a 3 cursos.",
              "Acceso a la plataforma virtual.",
              "Duración de acceso acordada al contratar.",
              "Certificado privado de capacitación por cada curso aprobado.",
              "Elección libre de los cursos.",
              "Material de aprendizaje.",
              "Evaluaciones de los cursos.",
              "Soporte por WhatsApp o llamada, de lunes a domingo, con respuesta estimada de 1 a 8 horas."
            ]
          }
        ]
      }
    }
  };
})();
