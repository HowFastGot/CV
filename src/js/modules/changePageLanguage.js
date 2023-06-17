import { findDOM_node } from "./findDOM_node.js";


const changeActiveLangItem = (e) => {
     const target = e.currentTarget;
     const languageItemsArray = Array.from(target.children);;

     if (languageItemsArray.length < 1) return;

     const indexOfClickedItem = languageItemsArray.indexOf(e.target)
     languageItemsArray.map((item, id) => {
          item.classList.remove("active");

          if (indexOfClickedItem === id) {
               item.classList.add("active");
          }
     });

     setUpSessionStorageLanguage(languageItemsArray[indexOfClickedItem].textContent)
};

const setUpSessionStorageLanguage = (language = "EN") => {
     language && sessionStorage.setItem("language", language.toLowerCase())
}

const comprehensiveFunction = (e) => {

     changeActiveLangItem(e)
}


export function changePageLanguage(languagesBlockSelector) {
     const parentLangBlock = findDOM_node(languagesBlockSelector);

     setUpSessionStorageLanguage();

     parentLangBlock && parentLangBlock.addEventListener("click", comprehensiveFunction)


}