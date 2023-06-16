import { findDOM_node } from "./findDOM_node.js";


export function smoothScroll(link) {

     link.addEventListener("click", (e) => {
          e.preventDefault();

          const targetId = link.getAttribute('href');
          const targetElement = findDOM_node(targetId);

          targetElement.scrollIntoView({
               behavior: 'smooth',

          });
     });
}