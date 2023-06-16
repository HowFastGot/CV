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
               smoothScroll(tooltip);
               break;
     }
};

const createTooltip = (e) => {
     e.preventDefault();

     if (!e.target.closest("header")) return;

     const target = e.target;
     const visibleTooltip = findDOM_node(".tooltip");
     const elementMenu = target.closest("li");


     if (visibleTooltip) {
          deleteTooltip(visibleTooltip, target);
          return;
     }


     if (!elementMenu || !elementMenu?.classList.contains("menu-header__item")) return;

     const tooltip = document.createElement("a");
     const dataAttrText = elementMenu.dataset.tooltip;
     tooltip.textContent = dataAttrText;

     createProperAttrs(dataAttrText, tooltip)

     tooltip.classList.add("tooltip");
     elementMenu.append(tooltip);

};

const deleteTooltip = (tooltip, target) => {

     if (tooltip && !target.classList.contains("tooltip")) {
          tooltip.remove();
     }
}

export function showTooltip(menuSelector) {

     const menuBlock = findDOM_node(menuSelector);

     if (!menuBlock) {
          menuBlock.removeEventListener("mouseover", createTooltip)
     };

     document.addEventListener("mouseover", createTooltip);
}