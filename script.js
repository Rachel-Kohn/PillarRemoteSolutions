document.addEventListener("DOMContentLoaded", () => {

    /* HAMBURGER MENU*/

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    let menuOpen = false;

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();

            if (!menuOpen) {
                navMenu.style.right = "0";
                menuOpen = true;
            } else {
                navMenu.style.right = "-250px";
                menuOpen = false;
            }
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (
                menuOpen &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                navMenu.style.right = "-250px";
                menuOpen = false;
            }
        });
    }

    /* ACCORDION*/

    const headers = document.querySelectorAll(".accordion-header");
    const items = document.querySelectorAll(".accordion-item");
    const servicesSection = document.querySelector(".services");

    if (headers.length > 0 && servicesSection) {

        headers.forEach(header => {
            header.addEventListener("click", (e) => {
                e.stopPropagation();

                const item = header.parentElement;
                const content = header.nextElementSibling;

                // Close other items
                items.forEach(i => {
                    if (i !== item) {
                        i.classList.remove("active");
                        const c = i.querySelector(".accordion-content");
                        if (c) c.style.maxHeight = null;
                    }
                });

                // Toggle current
                item.classList.toggle("active");

                if (item.classList.contains("active")) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        });

        // Close accordion items when clicking outside
        document.addEventListener("click", (e) => {
            if (!servicesSection.contains(e.target)) {
                items.forEach(item => {
                    item.classList.remove("active");
                    const content = item.querySelector(".accordion-content");
                    if (content) content.style.maxHeight = null;
                });
            }
        });
    }

    /* NAV SMOOTH SCROLL*/

    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {

            e.preventDefault();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (!target) return;

            // Close all accordions
            items.forEach(item => {
                item.classList.remove("active");
                const content = item.querySelector(".accordion-content");
                if (content) content.style.maxHeight = null;
            });

            // Close nav menu
            if (navMenu) {
                navMenu.style.right = "-250px";
                menuOpen = false;
            }

            // Wait for layout to stabilize
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {

                    const headerHeight = parseInt(
                        getComputedStyle(document.documentElement)
                            .getPropertyValue('--header-height')
                    );

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        headerHeight -
                        20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                });
            });

        });
    });

});
