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

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.05)';
            header.style.padding = '0';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
            header.style.borderBottom = '1px solid rgba(226, 232, 240, 0.6)';
        }
    });

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
});
