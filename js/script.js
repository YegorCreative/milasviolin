const fallbackHeaderMarkup = `
<div class="container header-content">
    <div class="logo">
        <a href="index.html" aria-label="Go to home page">
            <img src="img/Mila Violin-1.png" alt="Mila's Violin Logo" loading="lazy">
        </a>
    </div>

    <nav class="main-nav" aria-label="Primary">
        <a href="index.html" class="nav-item"><span class="nav-label">Home</span></a>
        <a href="about.html" class="nav-item"><span class="nav-label">About</span></a>
        <a href="pricing.html" class="nav-item"><span class="nav-label">Pricing</span></a>
        <a href="stories.html" class="nav-item"><span class="nav-label">Stories</span></a>
        <a href="contact.html" class="nav-item"><span class="nav-label">Contact</span></a>
    </nav>
</div>
`;

const fallbackFooterMarkup = `
<p>
    &copy; 2026 Mila Violin. All Rights Reserved.
</p>

<p class="footer-credit">
    Website designed by
    <a href="https://www.yegorcreative.com" target="_blank" rel="noopener noreferrer">
        YegorCreative
    </a>
</p>

<div class="social-links">
    <a href="#">Facebook</a>
    <span>|</span>
    <a href="#">Instagram</a>
    <span>|</span>
    <a href="#">X</a>
</div>
`;

function initializeSmoothScrolling() {
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
}

function initializeActiveNavigation() {
    const navItems = document.querySelectorAll('.main-nav .nav-item');

    if (!navItems.length) {
        return;
    }

    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentPath = rawPath === '' || rawPath === '/' ? 'index.html' : rawPath;

    navItems.forEach(function (item) {
        const href = item.getAttribute('href') || '';
        const normalizedHref = href.replace(/^\//, '') || 'index.html';

        if (normalizedHref === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function initializeLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

function initializeContactForm() {
    const bookingForm = document.querySelector('#booking-form');
    const payloadField = document.querySelector('#google-form-payload');

    if (!bookingForm || !payloadField) {
        return;
    }

    bookingForm.addEventListener('submit', function () {
        const fullName = bookingForm.querySelector('#full-name')?.value?.trim() || '';
        const email = bookingForm.querySelector('#email-address')?.value?.trim() || '';
        const phone = bookingForm.querySelector('#phone-number')?.value?.trim() || '';
        const eventType = bookingForm.querySelector('#event-type')?.value?.trim() || '';
        const eventDate = bookingForm.querySelector('#event-date')?.value?.trim() || '';
        const eventLocation = bookingForm.querySelector('#event-location')?.value?.trim() || '';
        const duration = bookingForm.querySelector('#performance-duration')?.value?.trim() || '';
        const notes = bookingForm.querySelector('#additional-notes')?.value?.trim() || '';

        payloadField.value = [
            `Full Name: ${fullName}`,
            `Email Address: ${email}`,
            `Phone Number: ${phone}`,
            `Event Type: ${eventType}`,
            `Event Date: ${eventDate}`,
            `Event Location: ${eventLocation}`,
            `Performance Duration: ${duration}`,
            `Additional Notes: ${notes}`
        ].join('\n');
    });
}


function initializeBackToTopButton() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    // --- Smooth scroll using requestAnimationFrame (works on file:// and all browsers) ---
    function smoothScrollToTop(container, duration) {
        const start = container.scrollTop;
        if (start === 0) return;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            container.scrollTop = start * (1 - ease);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // --- Show/hide via IntersectionObserver on the hero section ---
    const hero = document.querySelector('.hero, .page-hero, main > section:first-child');
    if (hero) {
        const io = new IntersectionObserver((entries) => {
            backToTop.classList.toggle('at-top', entries[0].isIntersecting);
        }, { threshold: 0 });
        io.observe(hero);
    }

    // --- Click: smooth scroll back to top ---
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        const scrollArea = document.querySelector('.scroll-area');
        if (scrollArea && scrollArea.scrollTop > 0) {
            smoothScrollToTop(scrollArea, 700);
        } else if (window.scrollY > 0) {
            // Fallback: animate window scroll
            smoothScrollToTop(document.documentElement, 700);
        }
    });
}

function initializeAutoHideNavbar() {

    const header = document.querySelector('.site-header');
    const scrollArea = document.querySelector('.scroll-area');

    if (!header) return;

    let lastScroll = 0;
    const revealPoint = 120;

    function getScroll() {
        return scrollArea ? scrollArea.scrollTop : window.scrollY;
    }

    function handleScroll() {

        const current = getScroll();

        if (current > lastScroll) {
            header.classList.add('navbar-hidden');
        }

        if (current < revealPoint) {
            header.classList.remove('navbar-hidden');
        }

        lastScroll = current;
    }

    if (scrollArea) {
        scrollArea.addEventListener('scroll', handleScroll);
    } else {
        window.addEventListener('scroll', handleScroll);
    }

}

async function loadSharedComponents() {
    const headerMount = document.querySelector('#header');
    const footerMount = document.querySelector('#footer');

    if (headerMount) {
        try {
            const response = await fetch('components/header.html');

            if (!response.ok) {
                throw new Error('Header request failed');
            }

            headerMount.innerHTML = await response.text();
        } catch (_error) {
            headerMount.innerHTML = fallbackHeaderMarkup;
        }
    }

    if (footerMount) {
        try {
            const response = await fetch('components/footer.html');

            if (!response.ok) {
                throw new Error('Footer request failed');
            }

            footerMount.innerHTML = await response.text();
        } catch (_error) {
            footerMount.innerHTML = fallbackFooterMarkup;
        }
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadSharedComponents();
    initializeLucideIcons();
    initializeActiveNavigation();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeBackToTopButton();
    initializeAutoHideNavbar();
});
