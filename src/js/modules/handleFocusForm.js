import { findDOM_node } from "./findDOM_node.js";


export function focusFormInput() {
     const firstFormInput = findDOM_node(`#sendmessage input`);
     firstFormInput.focus();
}

export function handleFocusForm() {
     document.querySelector("[data-tooltip=\"SendMessage\"] a").addEventListener("click", (e) => {
          e.preventDefault();

          focusFormInput();
     })
};



