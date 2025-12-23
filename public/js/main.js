                                             // Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close nav on link click (mobile only)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth <= 768) {
            setTimeout(() => navLinks.classList.remove('open'), 150); // allow for transition
        }
    });
});

// Hide nav-links if resizing to desktop
window.addEventListener('resize', () => {
    if(window.innerWidth > 768) {
        navLinks.classList.remove('open');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.facility-card, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Add fade-in class for animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Rotating facility texts
function rotateFacilityTexts() {
    const facilityTexts = document.querySelectorAll('.facility-text');
    let currentIndex = 0;

    function showNext() {
        // Remove active class from current text
        facilityTexts[currentIndex].classList.remove('active');
        
        // Move to next text
        currentIndex = (currentIndex + 1) % facilityTexts.length;
        
        // Add active class to next text
        facilityTexts[currentIndex].classList.add('active');
    }

    // Set interval for rotation (8 seconds)
    setInterval(showNext, 8000);
}

// Initialize rotating texts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    rotateFacilityTexts();
    const form = document.getElementById('contactForm');
    const successDiv = document.getElementById('form-success');
    if (form && successDiv) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    form.style.display = 'none';
                    successDiv.style.display = 'block';
                } else {
                    response.json().then(data => {
                        alert(data.error || 'Failed to send message.');
                    });
                }
            })
            .catch(() => {
                alert('Failed to send message. Please try again later.');
            });
        });
    }
}); 