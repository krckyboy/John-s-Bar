import ut from "./modules/utility.js";

ut.ready(() => {
    const discountImg = document.getElementById("discountImg");

    window.addEventListener("scroll", e => {
        e.preventDefault();
        let offset = window.pageYOffset;
        discountImg.style.backgroundPositionY = offset * .08 + "px";
    })
})