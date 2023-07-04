import { findDOM_node } from './findDOM_node.js';
import { smoothScroll } from './smoothScroll.js';

const createProperAttrs = (dataAttrText, tooltip) => {
     switch (dataAttrText) {
          case "Download CV.pdf":
               tooltip.setAttribute("href", "../assets/Frontend Skaretskiy Yevhen (EN).pdf")
               tooltip.setAttribute("download", "Frontend Skaretskiy Yevhen (EN)");
               break;
          case "Email message":
               tooltip.setAttribute("href", "mailto:yevhenskaretskiy@gmail.com")
               break;
          default:
               tooltip.setAttribute("href", `#${dataAttrText}`.toLocaleLowerCase())
               smoothScroll(tooltip,);
               break;
     }
};

const createTooltip = (e) => {
     const target = e.target;

     if (!target.closest("header")) return;

     const tooltip = document.createElement("a");
     const dataAttrText = target.dataset.tooltip;
     tooltip.textContent = dataAttrText;

     createProperAttrs(dataAttrText, tooltip)

     tooltip.classList.add("tooltip");

     addTooltip(target, tooltip)
};

function addTooltip(parentTooltipElement, tooltipElement) {
     parentTooltipElement.append(tooltipElement);
}

const deleteTooltip = () => {
     document.querySelector(".tooltip").remove();
}

export function showTooltip() {

     document.querySelectorAll(".menu-header__item").forEach(link => {
          link.addEventListener("mouseenter", createTooltip);
     });

     document.querySelectorAll(".menu-header__item").forEach(link => {
          link.addEventListener("mouseleave", deleteTooltip);
     });
}