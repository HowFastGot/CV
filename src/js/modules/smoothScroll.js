import { findDOM_node } from "./findDOM_node.js";


export function smoothScroll(linkSelectors) {

     const links = findDOM_node(linkSelectors, "multiElems");

     links.forEach(link => {
          link.addEventListener("click", (e) => {
               e.preventDefault();

               const targetId = link.getAttribute('href');
               const targetElement = findDOM_node(targetId);

               targetElement.scrollIntoView({
                    behavior: 'smooth',

               });
          });
     });

}