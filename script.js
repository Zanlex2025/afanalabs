// Enhanced Afana Labs Website Script - Performance Optimized

// Loading Screen Management
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('loaded');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Enhanced Intersection Observer for Scroll Reveals
const observerOptions = {
    threshold: 0.15, // Better threshold for smoother reveals
    rootMargin: '0px 0px -80px 0px', // Trigger earlier for better UX
    passive: true // Performance optimization
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add active class with slight delay for staggered effect
            setTimeout(() => {
                entry.target.classList.add('active');
            }, 50);

            // Stop observing after reveal for performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Enhanced element observation with multiple selectors
function observeElements() {
    const selectors = [
        '.reveal',
        '.reveal-fade',
        '.reveal-left',
        '.reveal-right',
        '.reveal-up',
        '.reveal-scale'
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
}

// Smooth scrolling with enhanced offset calculation
function smoothScrollToElement(targetSelector, offset = 80) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
        easing: 'ease-in-out'
    });
}

function showPopupMessage(message, button) {
    let toast = document.getElementById('popup-message');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'popup-message';
        toast.className = 'popup-message';
        document.body.appendChild(toast);
    }

    toast.textContent = message;

    // Position the popup above the button
    const rect = button.getBoundingClientRect();
    toast.style.left = (rect.left + rect.width / 2) + 'px';
    toast.style.top = (rect.top - 10) + 'px'; // 10px above the button

    toast.classList.add('visible');

    window.popupTimeout && clearTimeout(window.popupTimeout);
    window.popupTimeout = setTimeout(() => {
        toast.classList.remove('visible');
    }, 5000);
}

function initializeUnavailableLinks() {
    document.querySelectorAll('a.unavailable-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const message = link.dataset.message || 'Not yet available';
            showPopupMessage(message, link);
        });
    });
}

// Enhanced CTA button handlers with ripple effect
function initializeCTAButtons() {
    const primaryBtn = document.querySelector('.cta-primary');
    const secondaryBtn = document.querySelector('.cta-secondary');

    console.log('Primary button found:', primaryBtn);
    console.log('Secondary button found:', secondaryBtn);

    // Ripple effect function
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    if (primaryBtn) {
        primaryBtn.addEventListener('click', (e) => {
            console.log('Primary button clicked');
            createRipple(e);
            e.preventDefault();
            setTimeout(() => smoothScrollToElement('#about'), 300);
        });
    }

    if (secondaryBtn) {
        console.log('Adding click listener to secondary button');
        secondaryBtn.addEventListener('click', (e) => {
            console.log('Secondary button clicked - Learn More');
            createRipple(e);
            e.preventDefault();
            // Navigate to the studio page after ripple effect
            setTimeout(() => {
                console.log('Navigating to studio.html');
                window.location.href = 'studio.html';
            }, 300);
        });
    }
}

// Optimized parallax with performance considerations
let ticking = false;
let lastScrollY = 0;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const deltaY = scrolled - lastScrollY;

    // Only update if significant scroll change
    if (Math.abs(deltaY) > 5) {
        // Hero background parallax - subtle and smooth
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            const rate = scrolled * -0.15;
            heroBg.style.transform = `translateY(${rate}px)`;
        }

        // Minimal section parallax for depth
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index < 3) { // Only apply to first few sections for performance
                const sectionRate = scrolled * -0.03 * (index + 1);
                section.style.transform = `translateY(${sectionRate}px)`;
            }
        });

        lastScrollY = scrolled;
    }

    ticking = false;
}

function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Enhanced navigation with mobile support
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollToElement(targetId);
        });
    });

    // Update active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
}

// Enhanced Daily Quotes System with local storage
const dailyQuotes = [
    "Every game tells a story. Every app solves a problem.",
    "Innovation meets imagination in digital realms.",
    "From pixels to pages, we craft experiences.",
    "Gaming: a journey of self-discovery.",
    "Digital storytelling where code meets creativity.",
    "Apps that adapt, games that captivate.",
    "Pushing boundaries in interactive entertainment.",
    "Your next favorite game awaits discovery.",
    "From concept to console, worlds come alive.",
    "Empowering creators, one experience at a time.",
    "Technology meets artistry in harmony.",
    "Revolutionizing how we play and connect.",
    "Every line of code creates something extraordinary.",
    "From indie dreams to global experiences.",
    "Crafting the future of interactive entertainment.",
    "Innovation meets imagination digitally.",
    "Building bridges between tech and humanity.",
    "Gateway to extraordinary digital adventures.",
    "From app ideas to gaming legends.",
    "Elevating digital creativity.",
    "Every project becomes a masterpiece.",
    "Transforming ideas into immersive realities.",
    "Digital storytelling, redefined.",
    "Pioneering next-gen interactive experiences.",
    "From code to canvas, creating magic.",
    "Daily dose of digital inspiration.",
    "Games become memories, apps become essentials.",
    "Innovating at tech-creativity crossroads.",
    "Building captivating, inspiring worlds.",
    "Excellence in every pixel.",
    "Future of gaming, crafted with passion.",
    "Empowering minds through innovation."
];

function getDailyQuote() {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('afana-daily-quote');

    if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === today) {
            return parsed.quote;
        }
    }

    // Generate new quote for today
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const quote = dailyQuotes[dayOfYear % dailyQuotes.length];

    localStorage.setItem('afana-daily-quote', JSON.stringify({ date: today, quote }));
    return quote;
}

function displayDailyQuote() {
    const quoteElement = document.getElementById('daily-quote');
    if (quoteElement) {
        const quote = getDailyQuote();
        quoteElement.textContent = `"${quote}"`;

        // Add fade-in animation
        setTimeout(() => {
            quoteElement.style.opacity = '1';
            quoteElement.style.transform = 'translateY(0)';
        }, 500);
    }
}

// Enhanced Service Rotation with pause on hover
let currentServiceIndex = 0;
let serviceInterval;
let isRotationPaused = false;

function rotateServices() {
    if (isRotationPaused) return;

    const serviceSets = document.querySelectorAll('.service-set');
    if (serviceSets.length === 0) return;

    // Fade out current set
    serviceSets[currentServiceIndex].classList.remove('active');

    // Move to next set
    currentServiceIndex = (currentServiceIndex + 1) % serviceSets.length;

    // Fade in new set
    serviceSets[currentServiceIndex].classList.add('active');
}

function startServiceRotation() {
    const serviceSets = document.querySelectorAll('.service-set');
    if (serviceSets.length > 1) {
        // Start rotation every 4 seconds for better readability
        serviceInterval = setInterval(rotateServices, 4000);

        // Pause rotation on hover
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.addEventListener('mouseenter', () => {
                isRotationPaused = true;
            });

            aboutSection.addEventListener('mouseleave', () => {
                isRotationPaused = false;
            });
        }
    }
}

function stopServiceRotation() {
    if (serviceInterval) {
        clearInterval(serviceInterval);
    }
}

// Performance monitoring and optimization
function initializePerformanceOptimizations() {
    // Lazy load images when they come into view
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Debounce scroll events for better performance
    let scrollTimeout;
    function debouncedScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Any scroll-dependent logic can go here
        }, 16); // ~60fps
    }

    window.addEventListener('scroll', debouncedScroll, { passive: true });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    observeElements();
    initializeCTAButtons();
    initializeNavigation();
    initializeUnavailableLinks();
    displayDailyQuote();
    startServiceRotation();
    initializePerformanceOptimizations();

    // Start parallax after initial load
    setTimeout(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }, 1000);

    // Hide loading screen after everything is initialized
    setTimeout(hideLoadingScreen, 500);
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        stopServiceRotation();
    } else {
        // Resume when tab becomes visible
        startServiceRotation();
    }
});

// Error handling for better user experience
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics here
});

// Graceful degradation for older browsers
if (!window.IntersectionObserver) {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('active');
    });
}