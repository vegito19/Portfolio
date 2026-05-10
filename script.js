document.addEventListener("DOMContentLoaded", () => {
    // Custom Cursor
    const cursor = document.getElementById("custom-cursor");
    const links = document.querySelectorAll("a, .btn, .skill-item, .project-card, .major-panel, .info-panel");
    
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(2)";
            cursor.style.backgroundColor = "transparent";
            cursor.style.border = "1px solid rgb(var(--aura-color))";
        });
        link.addEventListener("mouseleave", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
            cursor.style.backgroundColor = "rgb(var(--aura-color))";
            cursor.style.border = "none";
        });
    });

    // Intersection Observer for Sections to change Aura Color
    const sections = document.querySelectorAll(".section");
    const navItems = document.querySelectorAll(".nav-item");
    const root = document.documentElement;
    const navProgress = document.querySelector(".nav-progress");

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0
    };

    let currentTheme = 'base';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const color = entry.target.getAttribute("data-color");
                currentTheme = entry.target.getAttribute("data-theme");
                const id = entry.target.getAttribute("id");
                
                // Update CSS Variable for Aura
                root.style.setProperty("--aura-color", color);
                
                // Increase intensity for higher forms
                let intensity = "0.05";
                if(currentTheme === 'ssj') intensity = "0.15";
                if(currentTheme === 'god') intensity = "0.18"; // cinematic glow
                if(currentTheme === 'blue') intensity = "0.25";
                if(currentTheme === 'ui') intensity = "0.15"; // Calm but present
                root.style.setProperty("--aura-intensity", intensity);

                let bgColor = "#030303";
                if(currentTheme === 'god') bgColor = "#120204"; // dark crimson hue shift
                root.style.setProperty("--bg-current", bgColor);

                // Update Navbar Active State
                navItems.forEach(nav => {
                    nav.classList.remove("active");
                    if (nav.getAttribute("data-target") === id) {
                        nav.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));

    // Scroll Progress
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        navProgress.style.width = scrolled + "%";
    });

    // Particle System on Canvas
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 2 + 1;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 1;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            
            // Modify behavior based on theme
            if (currentTheme === 'ssj') {
                this.speedY = Math.random() * 5 + 3; // Faster upward
                this.size = Math.random() * 3 + 1;
            } else if (currentTheme === 'god') {
                this.speedY = Math.random() * 0.6 + 0.2; // ambient, cinematic
                this.speedX = (Math.random() - 0.5) * 0.5; 
                this.size = Math.random() * 3 + 1;
                this.decay = 0.003;
            } else if (currentTheme === 'blue') {
                this.speedY = Math.random() * 3 + 2;
                this.decay = 0.005; // Longer life
            } else if (currentTheme === 'ui') {
                this.speedY = Math.random() * 1 + 0.5; // Very slow, calm
                this.speedX = (Math.random() - 0.5) * 2; // Floating around
                this.size = Math.random() * 1.5 + 0.5;
                this.decay = 0.002; // Very long life
            }
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.life -= this.decay;
            
            if (currentTheme === 'ui') {
                // UI particles float more organically
                this.x += Math.sin(this.y * 0.05) * 0.5;
            } else if (currentTheme === 'god') {
                // Subtle flame-like sway
                this.x += Math.sin(this.y * 0.02) * 0.3;
            }

            if (this.life <= 0 || this.y < 0) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Get current aura color
            const rootStyles = getComputedStyle(root);
            const rgb = rootStyles.getPropertyValue('--aura-color').trim();
            
            ctx.fillStyle = `rgba(${rgb}, ${this.life})`;
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Adjust particle count based on theme
        let targetParticles = 50;
        if (currentTheme === 'ssj') targetParticles = 100;
        if (currentTheme === 'god') targetParticles = 60; // elegant
        if (currentTheme === 'blue') targetParticles = 80;
        if (currentTheme === 'ui') targetParticles = 40; // Calm, fewer particles
        
        for (let i = 0; i < targetParticles; i++) {
            if (particles[i]) {
                particles[i].update();
                particles[i].draw();
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
});
