import { showTooltip } from "./modules/tooltips.js";
import { changePageTheme } from "./modules/theme.js";
import { changePageLanguage } from "./modules/changePageLanguage.js"
import { form } from "./modules/form.js";
import { validateForm } from "./modules/validateForm.js";

window.addEventListener("DOMContentLoaded", function () {
     "use strict"

     showTooltip(".menu-header__list");
     changePageTheme(".settings-popup")
     changePageLanguage(".settings-popup__lang-menu");
     form("form");
     validateForm();

     //-swiper initialize----
     var swiper = new Swiper(".mySwiper", {
          slidesPerView: 1,
          spaceBetween: 90,
          freeMode: true,
          navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
          },

          breakpoints: {

               640: {
                    slidesPerView: 2,
                    spaceBetween: 120
               }
          },

     });

});


