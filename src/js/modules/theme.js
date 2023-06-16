import { findDOM_node } from "./findDOM_node.js"


const setUpDefaultTheme = (bodyELem) => {
     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          bodyELem.classList.remove("ligth");
          bodyELem.classList.add("dark");
     } else {
          bodyELem.classList.remove("dark");
          bodyELem.classList.add("dark");
     }
};

const changeBodyClassName = (e, bodyELem) => {
     e.preventDefault();

     if (e.target.classList.contains("settings-popup__theme")) {
          bodyELem.classList.toggle("dark");
     };


}

const closeSettingsPopup = (e) => {
     e.target.parentElement.style.opacity = "0";
     e.target.parentElement.style.right = "-120px";

     const idTime = setTimeout(() => {
          e.target.parentElement.style.opacity = "";
          e.target.parentElement.style.right = "";

          clearTimeout(idTime);
     }, 200);
}

export function changePageTheme(changeButtonSelector) {
     const trigger = findDOM_node(changeButtonSelector);
     const body = findDOM_node("body");

     if (!body || !trigger) return;

     setUpDefaultTheme(body);

     trigger && trigger.addEventListener("click", (e) => {

          changeBodyClassName(e, body)

          if (e.target.classList.contains("settings-popup__theme") ||
               e.target.tagName.toLowerCase() === "button") {
               closeSettingsPopup(e);
          };
     });
}