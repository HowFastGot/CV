import Polyglot from "node-polyglot";

const getAsyncLanguageDataObject = async (languageOfPage) => {

     try {
          const response = await fetch(`../translations/${languageOfPage}/locale.json`)

          return await response.json();

     } catch (error) {
          console.log(`Error occurs while loading language data object ${error.message}! Check getLanguageDataObject function!`)
     }

}

const changeTextContentofPage = ({ English, Ukrainian, Russian }) => {

     const polyglot = new Polyglot({ phrases: English ?? Ukrainian });

     const textBlocks = document.querySelectorAll("[data-i18n]");

     if (textBlocks && textBlocks.length < 1) return;

     textBlocks.forEach((textBlock) => {
          const elementKeyAttr = textBlock.dataset.i18n;

          textBlock.innerHTML = polyglot.t(elementKeyAttr)
     });

}

export async function pageInternationalization(choosenPageLang) {

     const currentLanguageData = await getAsyncLanguageDataObject(choosenPageLang);
     changeTextContentofPage(currentLanguageData)
}  
