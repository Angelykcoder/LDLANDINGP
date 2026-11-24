(function () {
  "use strict";

  window.LD = window.LD || {};

  function makeTextElement(tag, className, text) {
    var element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function makePlanCard(plan) {
    var card = document.createElement("article");
    card.className = plan.recommended ? "plan-card plan-card--recommended" : "plan-card";

    if (plan.recommended) {
      card.appendChild(makeTextElement("p", "plan-card__badge", "Recomendado"));
    }

    card.appendChild(makeTextElement("h3", "", plan.name));

    var features = document.createElement("ul");
    features.className = "plan-card__features";
    plan.features.forEach(function (feature) {
      features.appendChild(makeTextElement("li", "", feature));
    });
    card.appendChild(features);

    var action = makeTextElement("a", "button", "Consultar este plan");
    action.href = "#contacto";
    action.setAttribute("data-whatsapp", "");
    action.setAttribute("data-whatsapp-plan", plan.name);
    card.appendChild(action);

    return card;
  }

  function renderPlans() {
    var container = document.querySelector("[data-render-plans]");
    var plans = window.LD.config && window.LD.config.plans;
    if (!container || !plans) return;

    plans.forEach(function (plan) {
      container.appendChild(makePlanCard(plan));
    });
  }

  window.LD.renderPlans = renderPlans;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderPlans, { once: true });
  } else {
    renderPlans();
  }
})();
