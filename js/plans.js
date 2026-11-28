(function () {
  "use strict";

  window.LD = window.LD || {};

  function makeTextElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function makePlanCard(plan, category) {
    var card = document.createElement("article");
    card.className = plan.featured ? "plan-card plan-card--featured" : "plan-card";

    if (plan.featured) {
      card.appendChild(makeTextElement("p", "plan-card__badge", plan.badge || "Plan destacado"));
    }

    card.appendChild(makeTextElement("p", "plan-card__audience", category.audience));
    card.appendChild(makeTextElement("h3", "", plan.name));
    card.appendChild(makeTextElement("p", "plan-card__price", plan.price));

    var features = document.createElement("ul");
    features.className = "plan-card__features";
    plan.features.forEach(function (feature) {
      var item = document.createElement("li");
      var icon = document.createElement("span");
      icon.className = "plan-card__check";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "✓";
      item.appendChild(icon);
      item.appendChild(document.createTextNode(feature));
      features.appendChild(item);
    });
    card.appendChild(features);

    var action = makeTextElement("a", "button plan-card__action", "Solicitar información");
    action.href = "#contacto";
    action.setAttribute("aria-label", "Solicitar información sobre " + plan.contactLabel);
    action.setAttribute("data-whatsapp", "");
    action.setAttribute("data-whatsapp-plan", plan.contactLabel);
    card.appendChild(action);

    return card;
  }

  function updateTabs(categoryKey) {
    document.querySelectorAll("[data-plan-category]").forEach(function (tab) {
      var isActive = tab.getAttribute("data-plan-category") === categoryKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    document.querySelectorAll("[data-plan-panel]").forEach(function (panel) {
      var isActive = panel.getAttribute("data-plan-panel") === categoryKey;
      if (isActive) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    });
  }

  function ensureCategoryRendered(categoryKey) {
    var config = window.LD.config;
    var categories = config && config.planCategories;
    var category = categories && categories[categoryKey];
    var container = document.querySelector('[data-render-plans="' + categoryKey + '"]');
    if (!category || !container) return null;

    if (!container.children.length) {
      category.plans.forEach(function (plan) {
        container.appendChild(makePlanCard(plan, category));
      });
    }
    return container;
  }

  function renderCategory(categoryKey, animate) {
    var config = window.LD.config;
    var categories = config && config.planCategories;
    var category = categories && categories[categoryKey];
    var container = ensureCategoryRendered(categoryKey);
    var description = document.querySelector("[data-plan-category-description]");
    var status = document.querySelector("[data-plan-status]");
    if (!category || !container) return;

    if (description) description.textContent = category.description;
    if (status) status.textContent = "Mostrando planes " + category.label.toLowerCase() + ".";
    updateTabs(categoryKey);

    if (animate) {
      container.classList.remove("plans__grid--entering");
      void container.offsetWidth;
      container.classList.add("plans__grid--entering");
    }

    if (typeof window.LD.applyWhatsAppLinks === "function") {
      window.LD.applyWhatsAppLinks();
    }
  }

  function activateTab(tab, moveFocus) {
    renderCategory(tab.getAttribute("data-plan-category"), true);
    if (moveFocus) tab.focus();
  }

  function handleTabKeydown(event) {
    var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-plan-category]"));
    var currentIndex = tabs.indexOf(event.currentTarget);
    var nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === currentIndex && !["Home", "End"].includes(event.key)) return;

    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  }

  function initPlans() {
    var tabs = document.querySelectorAll("[data-plan-category]");
    if (!tabs.length) return;

    Object.keys(window.LD.config.planCategories).forEach(ensureCategoryRendered);

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(tab, false);
      });
      tab.addEventListener("keydown", handleTabKeydown);
    });

    renderCategory("institutional", false);
  }

  window.LD.renderPlans = renderCategory;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlans, { once: true });
  } else {
    initPlans();
  }
})();
