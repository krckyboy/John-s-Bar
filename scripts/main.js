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
        const header = document.getElementById("header");
        const navItems = {
            home: document.getElementById("nav_home"),
            about: document.getElementById("nav_about"),
            menu: document.getElementById("nav_menu"),
            gallery: document.getElementById("nav_gallery")
        }
        const activeColor = () => {
            if (pageYOffset >= sections.about.offsetTop && pageYOffset < sections.menu.offsetTop) {
                navItems.about.classList.add("activeColor")
                navItems.menu.classList.remove("activeColor")
                navItems.gallery.classList.remove("activeColor")
            } else if (pageYOffset >= sections.menu.offsetTop && pageYOffset < sections.gallery.offsetTop) {
                navItems.menu.classList.add("activeColor")
                navItems.about.classList.remove("activeColor")
                navItems.gallery.classList.remove("activeColor")
            } else if (pageYOffset >= sections.gallery.offsetTop) {
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
            if (window.pageYOffset > header.clientHeight) {
                nav.classList.add("stickyHeader");
            } else {
                nav.classList.remove("stickyHeader");
            }
        }

        const scrollOnClick = () => {
            ut.onClick(navItems.home, sections.home);
            ut.onClick(navItems.about, sections.about);
            ut.onClick(navItems.menu, sections.menu);
            ut.onClick(navItems.gallery, sections.gallery);
        }

        const fnc = () => {
            stickyHeaderAppear();
            activeColor();
            scrollOnClick();
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
            ut.bodyOverflowHiddenToggle();
        }

        const hideOverlayMenu = () => {
            overlayNav.classList.add("translateToRight");
            ut.bodyOverflowHiddenToggle();
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
                ut.bodyOverflowHiddenToggle();
            });
            ut.onClickMobileNav(navItems.about, sections.about, () => {
                hideOverlayMenu();
                hamToggleStates();
                ut.bodyOverflowHiddenToggle();
            });
            ut.onClickMobileNav(navItems.menu, sections.menu, () => {
                hideOverlayMenu();
                hamToggleStates();
                ut.bodyOverflowHiddenToggle();
            });
            ut.onClickMobileNav(navItems.gallery, sections.gallery, () => {
                hideOverlayMenu();
                hamToggleStates();
                ut.bodyOverflowHiddenToggle();
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

    const discountDay = (() => {
        const d = new Date;
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const drinks = ["Beers", "Cocktails", "Juices", "Tequilas", "Whiskeys", "Wine"];
        const dayAndDrinkPosition = d.getDay();
        const day = days[dayAndDrinkPosition];
        const drink = drinks[dayAndDrinkPosition];
        document.getElementById("day").textContent = day;
        document.getElementById("drinkDay").textContent = drink;
    })();

    const galleryMobile = (() => {

    })();

    const modalContact = (() => {
        const modal = document.getElementById("overlayContact");
        const btns = document.getElementsByClassName("btn");
        const close = document.getElementById("overlayContact__close");

        const showModal = (e) => {
            modal.classList.remove("d-none");
            modal.classList.remove("opacity-none");
        }

        const hideModal = (e) => {
            modal.classList.add("opacity-none");
            setTimeout(() => {
                modal.classList.add("d-none");
            }, 500);
        }

        btns[0].addEventListener("click", e => {
            e.preventDefault()
            showModal()
            ut.bodyOverflowHiddenToggle();
        });
        btns[1].addEventListener("click", e => {
            e.preventDefault()
            showModal()
            ut.bodyOverflowHiddenToggle();
        });
        close.addEventListener("click", e => {
            e.preventDefault();
            hideModal();
            ut.bodyOverflowHiddenOff();
        });
        modal.addEventListener("click", e => {
            if (e.target === modal) {
                hideModal();
                ut.bodyOverflowHiddenOff();
            }
        });

    })();

    const disableScrollbar = (e) => {
        if (document.body.classList.contains("overflowHidden")) {
            e.preventDefault();
        }
    }

    window.addEventListener("resize", e => {
        stickyHeader();
        let viewport = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']) * .625;
        if (viewport < 43.75) {

        }
    })

    window.addEventListener("scroll", e => {
        e.preventDefault();
        menuParallax();
        stickyHeader();
        hamburgerAndMobileMenu();
    })

    document.body.addEventListener("touchmove", disableScrollbar);
    document.body.addEventListener("wheel", disableScrollbar);
})