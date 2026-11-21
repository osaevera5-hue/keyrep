
/* =========================================
   KEYREP & ASSOCIATES
   Website JavaScript
========================================= */

 
const BUSINESS_WHATSAPP = "233547854555";

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close the mobile menu after selecting a link.
    mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// AUTOMATIC FOOTER YEAR
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// PRESELECT A SERVICE WHEN A SERVICE LINK IS CLICKED
const serviceSelect = document.getElementById("service");

document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
        const selectedService = this.getAttribute("data-service");

        if (serviceSelect && selectedService) {
            serviceSelect.value = selectedService;
        }
    });
});

// WHATSAPP ENQUIRY FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !phone || !service || !message) {
            alert("Please complete all required fields.");
            return;
        }

        // Do not allow the placeholder number to be used.
        if (!/^\d{10,15}$/.test(BUSINESS_WHATSAPP)) {
            alert(
                "The business WhatsApp number has not been set up yet. " +
                "Please add the correct number in script.js."
            );
            return;
        }

        const whatsappMessage =
            "KEYREP & ASSOCIATES - CUSTOMER ENQUIRY\n\n" +
            "Name: " + name + "\n" +
            "Customer phone: " + phone + "\n" +
            "Service needed: " + service + "\n\n" +
            "Message:\n" + message;

        const whatsappURL =
            "https://wa.me/" +
            BUSINESS_WHATSAPP +
            "?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}

// HIGHLIGHT THE ACTIVE NAVIGATION LINK
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        const isActive =
                            link.getAttribute("href") === "#" + entry.target.id;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}
