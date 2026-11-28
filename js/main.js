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
    var fallbackUrl = config.whatsappWebUrl || "https://web.whatsapp.com/";
    document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
      var planName = link.getAttribute("data-whatsapp-plan");
      var message = planName
        ? config.whatsappMessages.plan.replace("{plan}", planName)
        : config.whatsappMessages.meeting;

      if (digits) {
        link.href = "https://wa.me/" + digits + "?text=" + encodeURIComponent(message);
        link.setAttribute(
          "aria-label",
          planName
            ? "Solicitar información sobre " + planName + " por WhatsApp. Abre en una pestaña nueva."
            : "Escribir por WhatsApp. Abre en una pestaña nueva."
        );
      } else {
        link.href = fallbackUrl;
        link.setAttribute(
          "aria-label",
          planName
            ? "Abrir WhatsApp Web para solicitar información sobre " + planName + ". Abre en una pestaña nueva."
            : "Abrir WhatsApp Web en una pestaña nueva"
        );
      }

      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.hidden = false;

      var channelDescription = link.querySelector(".contact-channel__copy small");
      if (channelDescription) {
        channelDescription.textContent = digits ? "Escríbenos directamente" : "Abrir WhatsApp Web";
        link.removeAttribute("aria-label");
      }
    });
  }

  function applyMoodleLink() {
    var config = window.LD.config;
    var moodleLink = document.querySelector("[data-moodle]");
    var url = config && config.moodleUrl ? config.moodleUrl.trim() : "";

    if (!moodleLink) return;

    if (url) {
      moodleLink.href = url;
      moodleLink.removeAttribute("aria-disabled");
      moodleLink.removeAttribute("tabindex");
      moodleLink.setAttribute("aria-label", "Acceder a Moodle");
      moodleLink.removeAttribute("title");
      moodleLink.classList.add("moodle-access--active");
      return;
    }

    moodleLink.removeAttribute("href");
    moodleLink.setAttribute("aria-disabled", "true");
    moodleLink.setAttribute("tabindex", "-1");
    moodleLink.setAttribute("aria-label", "Acceso a Moodle, disponible próximamente");
    moodleLink.setAttribute("title", "Acceso disponible próximamente");
  }

  function renderVideoPlaceholder(embed, restoreFocus) {
    var loadButton = document.createElement("button");
    var playIcon = document.createElement("span");
    var label = document.createElement("span");
    var privacy = document.createElement("p");

    loadButton.className = "video-consent__load";
    loadButton.type = "button";
    loadButton.setAttribute("aria-describedby", "video-privacy-note");
    playIcon.className = "video-consent__play";
    playIcon.setAttribute("aria-hidden", "true");
    playIcon.textContent = "▶";
    label.textContent = "Cargar presentación en video";
    privacy.className = "video-consent__privacy";
    privacy.id = "video-privacy-note";
    privacy.textContent = "El contenido de YouTube solo se carga cuando eliges reproducirlo.";

    loadButton.appendChild(playIcon);
    loadButton.appendChild(label);
    loadButton.addEventListener("click", function () {
      loadYouTubeVideo(embed);
    });
    embed.replaceChildren(loadButton, privacy);
    embed.removeAttribute("data-video-loaded");
    if (restoreFocus) loadButton.focus();
  }

  function loadYouTubeVideo(embed) {
    var videoId = embed.getAttribute("data-video-id");
    var closeButton = document.createElement("button");
    var iframe = document.createElement("iframe");
    var status = document.createElement("span");
    if (!videoId) return;

    closeButton.className = "video-consent__close";
    closeButton.type = "button";
    closeButton.textContent = "Cerrar video";
    closeButton.setAttribute("aria-label", "Cerrar la presentación de YouTube");
    closeButton.addEventListener("click", function () {
      renderVideoPlaceholder(embed, true);
    });

    iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(videoId) + "?rel=0";
    iframe.title = "Presentación de Waled Innovations";
    iframe.loading = "eager";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    status.className = "sr-only";
    status.setAttribute("role", "status");
    status.textContent = "Video de YouTube cargado.";
    embed.replaceChildren(closeButton, iframe, status);
    embed.setAttribute("data-video-loaded", "true");
    closeButton.focus();
  }

  function initVideoEmbeds() {
    document.querySelectorAll("[data-video-embed]").forEach(function (embed) {
      var loadButton = embed.querySelector(".video-consent__load");
      if (loadButton) {
        loadButton.addEventListener("click", function () {
          loadYouTubeVideo(embed);
        });
      }
      embed.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && embed.hasAttribute("data-video-loaded")) {
          event.preventDefault();
          renderVideoPlaceholder(embed, true);
        }
      });
    });
  }

  function initFaqKeyboard() {
    document.querySelectorAll(".faq-item summary").forEach(function (summary) {
      summary.addEventListener("keydown", function (event) {
        var details = summary.parentElement;
        if (event.key === "Escape" && details && details.open) {
          event.preventDefault();
          details.open = false;
          summary.focus();
        }
      });
    });
  }

  function initMobileNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var navigation = document.querySelector("#site-nav");
    var label = toggle && toggle.querySelector("[data-menu-label]");
    if (!toggle || !navigation) return;

    function updateNavigationState(isOpen) {
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
      toggle.classList.toggle("is-open", isOpen);
      navigation.classList.toggle("is-open", isOpen);
      if (label) label.textContent = isOpen ? "Cerrar" : "Menú";
    }

    function closeNavigation(restoreFocus) {
      updateNavigationState(false);
      if (restoreFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      var willOpen = toggle.getAttribute("aria-expanded") !== "true";
      updateNavigationState(willOpen);
      if (willOpen) {
        var firstLink = navigation.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNavigation(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        closeNavigation(true);
      }
    });

    document.addEventListener("click", function (event) {
      if (
        toggle.getAttribute("aria-expanded") === "true"
        && !navigation.contains(event.target)
        && !toggle.contains(event.target)
      ) {
        closeNavigation(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 672 && toggle.getAttribute("aria-expanded") === "true") {
        closeNavigation(false);
      }
    });
  }

  window.LD.applyWhatsAppLinks = applyWhatsAppLinks;

  function init() {
    applyBrandName();
    applyWhatsAppLinks();
    applyMoodleLink();
    initVideoEmbeds();
    initFaqKeyboard();
    initMobileNavigation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
