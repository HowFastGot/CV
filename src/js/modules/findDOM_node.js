export function findDOM_node(selector, multiElems = null) {
     const foundedNode = (multiElems) ? document.querySelectorAll(selector) : document.querySelector(selector);

     return foundedNode;
}