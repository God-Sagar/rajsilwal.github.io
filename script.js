document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    const icon = mobileBtn.querySelector("i");

    mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        if(navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars-staggered");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars-staggered");
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".navitem").forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars-staggered");
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Trigger counter animation if it's a stat card
                if(entry.target.classList.contains('stat-card')) {
                    const counter = entry.target.querySelector('.counter');
                    if(counter && !counter.classList.contains('counted')) {
                        animateCounter(counter);
                        counter.classList.add('counted');
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((elem) => {
        observer.observe(elem);
    });

    // 4. Number Counter Animation
    function animateCounter(element) {
        const target = +element.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 10); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.innerText = Math.ceil(current) + "+";
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = target + "+";
            }
        };
        updateCounter();
    }

    // 5. Update Copyright Year dynamically
    const yearSpan = document.getElementById("year");
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// 6. EmailJS Form Handling
function sendmail(event) {
    event.preventDefault(); // STOP page reload

    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_a4w3p7p", "template_b49j11c", params)
        .then(
            function () {
                alert("✅ Message sent successfully! We will get back to you soon.");
                document.getElementById("contactForm").reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            },
            function (error) {
                alert("❌ Failed to send message. Please try again.");
                console.log(error);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        );
}


document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll('[data-reveal]');

    const revealOnScroll = () => {
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If the item is 150px into the view
            if (itemTop < windowHeight - 150) {
                // Add a small delay if specified in HTML
                const delay = item.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    item.classList.add('is-revealed');
                }, delay);
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run once on load
});

