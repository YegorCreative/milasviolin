// Smooth scrolling for internal navigation links
(function () {
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
})();
