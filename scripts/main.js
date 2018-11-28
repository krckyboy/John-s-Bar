import ut from "./modules/utility.js";

ut.ready(() => {

    const sections = {
        home: document.getElementById("home"),
        about: document.getElementById("about"),
        menu: document.getElementById("menu"),
        gallery: document.getElementById("gallery")
    }

    const menuParallax = (() => {
        const discountImg = document.getElementById("discountImg");
        const fnc = () => {
            let offset = window.pageYOffset;
            discountImg.style.backgroundPositionY = offset * .1 + "px";
        }
        return fnc;
    })();


    const stickyHeader = (() => {

        const nav = document.getElementById("nav");
        let navOffset = nav.offsetTop;
        const sectionOffsets = {
            about: sections.about.offsetTop,
            menu: sections.menu.offsetTop,
            gallery: sections.gallery.offsetTop,
        }
        const navItems = {
            home: document.getElementById("nav_home"),
            about: document.getElementById("nav_about"),
            menu: document.getElementById("nav_menu"),
            gallery: document.getElementById("nav_gallery")
        }
        const activeColor = () => {
            if (pageYOffset >= sectionOffsets.about && pageYOffset < sectionOffsets.menu) {
                navItems.about.classList.add("activeColor")
                navItems.menu.classList.remove("activeColor")
                navItems.gallery.classList.remove("activeColor")
            } else if (pageYOffset >= sectionOffsets.menu && pageYOffset < sectionOffsets.gallery) {
                navItems.menu.classList.add("activeColor")
                navItems.about.classList.remove("activeColor")
                navItems.gallery.classList.remove("activeColor")
            } else if (pageYOffset >= sectionOffsets.gallery) {
                navItems.gallery.classList.add("activeColor")
                navItems.about.classList.remove("activeColor")
                navItems.menu.classList.remove("activeColor")
            } else {
                navItems.about.classList.remove("activeColor")
                navItems.menu.classList.remove("activeColor")
                navItems.gallery.classList.remove("activeColor")
            }
        }

        const stickyHeaderAppear = () => {
            if (window.pageYOffset > navOffset) {
                nav.classList.add("stickyHeader");
            } else {
                nav.classList.remove("stickyHeader");
            }
        }

        const scrollOnClick = (() => {
            ut.onClick(navItems.home, sections.home);
            ut.onClick(navItems.about, sections.about);
            ut.onClick(navItems.menu, sections.menu);
            ut.onClick(navItems.gallery, sections.gallery);
        })();

        const fnc = () => {
            stickyHeaderAppear();
            activeColor();
        }
        return fnc;
    })();

    const hamburgerAndMobileMenu = (() => {
        const hamEl = document.getElementById("hamburger");
        const header = document.getElementById("header");
        const overlayNav = document.getElementById("overlayNav");
        let headerHeight = header.clientHeight;

        const accentedHamburger = () => {
            if (window.pageYOffset >= headerHeight) {
                if (!hamEl.classList.contains("hamAccented")) {
                    hamEl.classList.add("hamAccented");
                }
            } else {
                if (hamEl.classList.contains("hamAccented")) {
                    hamEl.classList.remove("hamAccented");
                }
            }
        }

        const showOverlayMenu = () => {
            overlayNav.classList.remove("translateToRight");
            document.body.classList.toggle("overflowHidden");
        }

        const hideOverlayMenu = () => {
            overlayNav.classList.add("translateToRight");
            document.body.classList.toggle("overflowHidden");
        }

        const hamToggleStates = () => {
            if (hamEl.classList.contains("inactive")) {
                hamEl.classList.remove("inactive");
                hamEl.classList.add("active");
                showOverlayMenu();

            } else if (hamEl.classList.contains("active")) {
                hamEl.classList.remove("active");
                hamEl.classList.add("inactive");
                hideOverlayMenu();
            }
        }

        const mobileNavItemOnClick = (() => {
            const navItems = {
                home: document.getElementById("overlayNav__item--home"),
                about: document.getElementById("overlayNav__item--about"),
                menu: document.getElementById("overlayNav__item--menu"),
                gallery: document.getElementById("overlayNav__item--gallery"),
            }
            ut.onClickMobileNav(navItems.home, sections.home, () => {
                hideOverlayMenu();
                hamToggleStates();
            });
            ut.onClickMobileNav(navItems.about, sections.about, () => {
                hideOverlayMenu();
                hamToggleStates();
            });
            ut.onClickMobileNav(navItems.menu, sections.menu, () => {
                hideOverlayMenu();
                hamToggleStates();
            });
            ut.onClickMobileNav(navItems.gallery, sections.gallery, () => {
                hideOverlayMenu();
                hamToggleStates();
            });
        })();


        hamEl.addEventListener("click", e => {
            hamToggleStates();
        })

        const fnc = () => {
            accentedHamburger();
        }

        return fnc;
    })();

    window.addEventListener("scroll", e => {
        e.preventDefault();
        menuParallax();
        stickyHeader();
        hamburgerAndMobileMenu();
    })
})