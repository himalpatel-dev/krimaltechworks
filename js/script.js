document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect: toggle `scrolled` class for smooth transitions
    const header = document.querySelector('header');
    const handleHeaderScroll = () => {
        if (!header) return;
        if (window.scrollY > 24) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleHeaderScroll);
    // initialize on load
    handleHeaderScroll();

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    /* --- Particle Background for Hero --- */
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width = 0;
        let height = 0;
        const DPR = Math.min(window.devicePixelRatio || 1, 2);

        function resize() {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = Math.round(width * DPR);
            canvas.height = Math.round(height * DPR);
            ctx.scale(DPR, DPR);
        }

        function random(min, max) { return Math.random() * (max - min) + min; }

        function initParticles(count = 60) {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: random(0, width),
                    y: random(0, height),
                    vx: random(-0.3, 0.3),
                    vy: random(-0.2, 0.2),
                    r: random(1.5, 4.5),
                    alpha: random(0.08, 0.45),
                    hue: Math.floor(random(180, 280))
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            for (let p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20;
                if (p.y > height + 20) p.y = -20;

                ctx.beginPath();
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
                g.addColorStop(0, `hsla(${p.hue}, 85%, 65%, ${p.alpha})`);
                g.addColorStop(1, `hsla(${p.hue}, 85%, 60%, 0)`);
                ctx.fillStyle = g;
                ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let rafId;
        function loop() {
            draw();
            rafId = requestAnimationFrame(loop);
        }

        function start() {
            resize();
            initParticles(Math.max(40, Math.floor((canvas.clientWidth / 15))));
            if (rafId) cancelAnimationFrame(rafId);
            loop();
        }

        window.addEventListener('resize', () => {
            // debounce resize
            clearTimeout(window.__particlesResize);
            window.__particlesResize = setTimeout(start, 120);
        });

        // start when visible
        start();
    }

    /* Button ripple effect */
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height) * 0.9;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    });
});
