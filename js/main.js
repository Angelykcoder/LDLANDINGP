(function () {
  "use strict";

  window.LD = window.LD || {};

  function applyBrandName() {
    var brandElements = document.querySelectorAll("[data-brand]");
    var brandName = window.LD.config && window.LD.config.brandName;

    if (!brandName) return;
    brandElements.forEach(function (element) {
      element.textContent = brandName;
    });
  }

  function applyWhatsAppLinks() {
    var config = window.LD.config;
    if (!config) return;

    var digits = config.whatsappNumber.replace(/\D/g, "");
    document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
      var planName = link.getAttribute("data-whatsapp-plan");
      var message = planName
        ? config.whatsappMessages.plan.replace("{plan}", planName)
        : config.whatsappMessages.meeting;

      if (digits) {
        link.href = "https://wa.me/" + digits + "?text=" + encodeURIComponent(message);
      } else {
        if (link.hasAttribute("data-whatsapp-channel") || link.hasAttribute("data-whatsapp-fab")) return;
        link.href = "#canales-contacto";
        link.setAttribute(
          "aria-label",
          planName
            ? "Consultar el " + planName + " por nuestros canales de contacto"
            : "Escríbenos por nuestros canales de contacto"
        );
      }
    });

    document.querySelectorAll("[data-whatsapp-channel], [data-whatsapp-fab]").forEach(function (link) {
      link.hidden = !digits;
    });
    document.querySelectorAll("[data-whatsapp-pending]").forEach(function (placeholder) {
      placeholder.hidden = Boolean(digits);
    });
  }

  function init() {
    applyBrandName();
    applyWhatsAppLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
