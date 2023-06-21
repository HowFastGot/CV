export function findDOM_node(selector, multiElems = null) {

     if (!typeof selector === "string") return;

     const foundedNode = (multiElems) ? document.querySelectorAll(selector) : document.querySelector(selector);

     return foundedNode;
}