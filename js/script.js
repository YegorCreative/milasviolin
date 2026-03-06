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

async function loadSharedComponents() {
    const headerMount = document.querySelector('#header');
    const footerMount = document.querySelector('#footer');

    const requests = [];

    if (headerMount) {
        requests.push(
            fetch('components/header.html')
                .then(function (response) {
                    return response.text();
                })
                .then(function (html) {
                    headerMount.innerHTML = html;
                })
        );
    }

    if (footerMount) {
        requests.push(
            fetch('components/footer.html')
                .then(function (response) {
                    return response.text();
                })
                .then(function (html) {
                    footerMount.innerHTML = html;
                })
        );
    }

    await Promise.all(requests);
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadSharedComponents();
    initializeSmoothScrolling();
    initializeContactForm();
});
