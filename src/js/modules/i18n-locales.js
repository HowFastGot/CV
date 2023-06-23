import Polyglot from "node-polyglot";

const getLanguageDataObject = async (languageOfPage) => {

     try {
          const response = await fetch(`../translations/${languageOfPage}/locale.json`)

          return await response.json();

     } catch (error) {
          console.log(`Error occurs while loading language data object ${error.message}! Check getLanguageDataObject function!`)
     }

}

const changeTextContentofPage = ({ English }) => {
     const polyglot = new Polyglot({ phrases: English });

     const textBlocks = document.querySelectorAll("[data-i18n]");

     if (textBlocks && textBlocks.length < 1) return;

     textBlocks.forEach((textBlock) => {
          const elementKeyAttr = textBlock.dataset.i18n;

          textBlock.innerHTML = polyglot.t(elementKeyAttr)
     });

}

export async function pageInternationalization(defaultLanguage = "en") {

     const currentLanguageData = await getLanguageDataObject(defaultLanguage);
     changeTextContentofPage(currentLanguageData)
}  
