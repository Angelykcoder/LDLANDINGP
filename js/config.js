(function () {
  "use strict";

  window.LD = window.LD || {};
  window.LD.config = {
    brandName: "Waled Innovations",
    // Completar con código de país y número, solo dígitos.
    whatsappNumber: "",
    whatsappMessages: {
      meeting: "Hola, quisiera agendar una reunión para conocer la capacitación digital docente.",
      plan: "Hola, quisiera recibir información sobre el {plan}."
    },
    plans: [
      { name: "Plan Esencial", features: ["Feature 1", "Feature 2", "Feature 3"] },
      { name: "Plan Institucional", recommended: true, features: ["Feature 1", "Feature 2", "Feature 3"] },
      { name: "Plan Integral", features: ["Feature 1", "Feature 2", "Feature 3"] }
    ]
  };
})();
