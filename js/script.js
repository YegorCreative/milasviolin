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
<div class="container">
    <p>COPYRIGHT &copy;2024, Mila Violin. ALL RIGHTS RESERVED.</p>
    <p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a> |
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a> |
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">X</a>
    </p>
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

function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    if (!elements.length || typeof window.IntersectionObserver !== 'function') {
        elements.forEach(function (el) {
            el.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    elements.forEach(el => observer.observe(el));
}

function initializeFeaturedStoryAnimation() {
    const featured = document.querySelector('.featured');

    if (!featured) {
        return;
    }

    if (typeof window.IntersectionObserver !== 'function') {
        featured.classList.add('visible');
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    observer.observe(featured);
}

function initializeParallaxSections() {
    const parallaxSections = document.querySelectorAll('.parallax-section');

    if (!parallaxSections.length) {
        return;
    }

    if (typeof window.IntersectionObserver !== 'function') {
        parallaxSections.forEach(function (section) {
            section.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    parallaxSections.forEach(section => {
        observer.observe(section);
    });
}

function initializeBackToTopButton() {
    const scrollArea = document.querySelector('.scroll-area');
    const backToTop = document.getElementById('backToTop');

    if (!scrollArea || !backToTop) {
        return;
    }

    scrollArea.addEventListener('scroll', () => {
        if (scrollArea.scrollTop > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        scrollArea.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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
    initializeScrollAnimations();
    initializeFeaturedStoryAnimation();
    initializeParallaxSections();
    initializeBackToTopButton();
});
