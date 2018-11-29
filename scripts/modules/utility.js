// Utilities and reusable pieces of code are declared here 
// which are of simple design.
const ut = {
    // Pure vanilla $(document).ready
    ready: function (fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    },
    // Toggles a class on all elements, where theArgs are IDs in the DOM.
    toggleClassOnAllElementsID: function (classToToggle, ...theArgs) {
        for (let arg of theArgs) {
            document.getElementById(arg).classList.toggle(classToToggle);
        }
    },
    // Toggles a class on all elements, where theArgs are already defined elements.
    toggleClassOnAllElements: function (classToToggle, ...theArgs) {
        for (const arg of theArgs) {
            arg.classList.toggle(classToToggle);
        }
    },
    // Toggles a class for element with the provided ID
    toggleClassOnID: function (ID, classToToggle) {
        document.getElementById(ID).classList.toggle(classToToggle)
    },
    // Toggles a class on an already defined element
    toggleClass: function (el, classToToggle) {
        el.classList.toggle(classToToggle)
    },
    // Toggle a class on body element
    toggleClassOnBody: function (classToToggle) {
        document.body.classList.toggle(classToToggle);
    },
    goThroughElementsOfContainer: (cont, callback) => {
        for (let el of cont.children) {
            callback(el);
        }
    },
    iterateThroughObjectProperties: (object, callback) => {
        for (let property in object) {
            if (object.hasOwnProperty(property)) {
                callback(property);
            }
        }
    },
    setPropTrueAndRestFalse: (object, propName) => {
        for (let property in object) {
            if (object.hasOwnProperty(property)) {
                if (property === propName) {
                    object[property] = true;
                } else {
                    object[property] = false;
                }
            }
        }
    },
    onClick: (navEl, sectEl) => {
        navEl.addEventListener("click", e => {
            e.preventDefault();
            const nav = document.getElementById("nav")
            const topOfElement = sectEl.offsetTop - nav.clientHeight - 15;
            window.scroll({
                top: topOfElement,
                behavior: "smooth",
                block: "start"
            });
        })
    },
    onClickMobileNav: (navEl, sectEl, callback) => {
        navEl.addEventListener("click", e => {
            e.preventDefault();
            callback();
            const nav = document.getElementById("nav")
            const topOfElement = sectEl.offsetTop - nav.clientHeight;
            window.scroll({
                top: topOfElement,
                behavior: "smooth",
                block: "start"
            });
            // sectEl.scrollIntoView({
            //     behavior: "smooth",
            //     block: "start"
            // });
        })
    },
    bodyOverflowHiddenOn: () => {
        document.body.classList.add("overflowHidden");
    },
    bodyOverflowHiddenOff: () => {
        document.body.classList.remove("overflowHidden");
    },
    bodyOverflowHiddenToggle: () => {
        document.body.classList.toggle("overflowHidden");
    }
}

export default ut;