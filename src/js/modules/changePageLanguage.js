import { findDOM_node } from "./findDOM_node.js";
import { pageInternationalization } from "./i18n-locales.js";

const possiblePageLangs = {
     en: "en",
     ua: "ua",
     ru: "ru"
};

const changeActiveLangItem = (e) => {
     const target = e.currentTarget;
     const languageItemsArray = Array.from(target.children);;


     if (languageItemsArray.length < 1 || !languageItemsArray.includes(e.target)) return;

     const indexOfClickedItem = languageItemsArray.indexOf(e.target);

     languageItemsArray.map((item, id) => {
          item.classList.remove("active");

          if (indexOfClickedItem === id) {
               item.classList.add("active");
          }
     });

     setUpSessionStorageLanguage(languageItemsArray[indexOfClickedItem].textContent.toLowerCase());

};

const setUpSessionStorageLanguage = (language = "en") => {

     language && sessionStorage.setItem("language", possiblePageLangs[language]);
}

const comprehensiveFunction = (e) => {

     changeActiveLangItem(e);
     pageInternationalization(sessionStorage.getItem("language"));
}


export function changePageLanguage(languagesBlockSelector) {
     const parentLangBlock = findDOM_node(languagesBlockSelector);

     setUpSessionStorageLanguage();

     parentLangBlock && parentLangBlock.addEventListener("click", comprehensiveFunction)


}