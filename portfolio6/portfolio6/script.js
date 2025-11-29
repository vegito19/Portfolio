// Elements
const menu = document.getElementById("menu");
const closeButton = document.getElementById("close-mobile");
const nav = document.getElementById("nav-mobile");
const navLinks = document.querySelectorAll(".nav-link");

// Open mobile menu
menu.addEventListener("click", () => {
    nav.classList.add("show");
    document.body.style.overflow = "hidden"; // منع scroll الخلفية
});

// Close mobile menu
closeButton.addEventListener("click", () => {
    nav.classList.remove("show");
    document.body.style.overflow = "auto";
});

// Close menu on link click
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
        document.body.style.overflow = "auto";
    });
});

// Optional: close menu on click outside links
nav.addEventListener("click", (e) => {
    if (e.target === nav) {
        nav.classList.remove("show");
        document.body.style.overflow = "auto";
    }
});

// Header hide/show on scroll with content adjustment
const header = document.querySelector('header');
const video = document.getElementById('background-video');
// Support both old ".about" and new ".about-section" class names
const aboutSection = document.querySelector('.about-section') || document.querySelector('.about');
const skillSection = document.querySelector('.skill');
const projectSection = document.querySelector('.project');
const contactSection = document.querySelector('.contact');
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide header and move all content up
        header.style.transform = 'translateY(-100%)';
        if (video) {
            video.style.top = '0';
            video.style.height = '100vh';
        }
        if (aboutSection) {
            // Pull About section upward by header height (10vh) to occupy freed space
            aboutSection.style.marginTop = '80vh';
            aboutSection.style.paddingTop = '10vh';
        }
        // Move all other sections up by 10vh
        [skillSection, projectSection, contactSection].forEach(section => {
            if (section) {
                section.style.paddingTop = '2rem';
            }
        });
    } else {
        // Scrolling up or at top - show header and restore content position
        header.style.transform = 'translateY(0)';
        if (video) {
            video.style.top = '10vh';
            video.style.height = '90vh';
        }
        if (aboutSection) {
            aboutSection.style.marginTop = '90vh';
            aboutSection.style.paddingTop = '15vh';
        }
        // Restore all other sections to original padding
        [skillSection, projectSection, contactSection].forEach(section => {
            if (section) {
                section.style.paddingTop = '3rem';
            }
        });
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Show header when approaching sections
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '-10% 0px -80% 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.style.transform = 'translateY(0)';
            if (video) {
                video.style.top = '10vh';
                video.style.height = '90vh';
            }
            if (aboutSection) {
                aboutSection.style.marginTop = '90vh';
                aboutSection.style.paddingTop = '15vh';
            }
            [skillSection, projectSection, contactSection].forEach(section => {
                if (section) {
                    section.style.paddingTop = '3rem';
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});