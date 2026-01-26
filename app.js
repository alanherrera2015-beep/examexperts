// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced Navbar Scroll Effect with Color Change
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(139, 92, 246, 0.2)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(147, 51, 234, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Tab Switching for Detailed Services with Magic Effect
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const targetTab = button.getAttribute('data-tab');
        
        // Create sparkle effect on tab click
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createMagicSparkle(x + (Math.random() - 0.5) * 60, y + (Math.random() - 0.5) * 60);
            }, i * 20);
        }
        
        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact Form Submission with Magic Effect
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;

    // Gather form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Add loading state with magic
    submitBtn.textContent = 'Sending Magic... ✨';
    submitBtn.style.background = 'linear-gradient(135deg, #10B981, #34D399)';
    submitBtn.disabled = true;

    try {
        // Send form data to the Netlify function
        const response = await fetch('/.netlify/functions/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Show success with sparkles
            submitBtn.textContent = 'Message Sent! 🎉';

            // Create success sparkle burst
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const rect = submitBtn.getBoundingClientRect();
                    const x = rect.left + rect.width / 2 + window.scrollX;
                    const y = rect.top + rect.height / 2 + window.scrollY;
                    createMagicSparkle(x + (Math.random() - 0.5) * 100, y + (Math.random() - 0.5) * 100);
                }, i * 50);
            }

            // Reset form and button
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
                submitBtn.disabled = false;
            }, 2000);
        } else {
            // Show error
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #EF4444, #F87171)';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
                submitBtn.disabled = false;
            }, 3000);
        }
    } catch (error) {
        console.error('Contact form error:', error);

        // Show error
        submitBtn.textContent = 'Error - Try Again';
        submitBtn.style.background = 'linear-gradient(135deg, #EF4444, #F87171)';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
            submitBtn.disabled = false;
        }, 3000);
    }
});

// Smooth Scroll for All Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Book Session Button Actions with Magic Trail
const bookSessionBtns = document.querySelectorAll('.btn-book-session, .btn-primary');
bookSessionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Create sparkle burst on click
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createMagicSparkle(x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 80);
            }, i * 30);
        }
        
        // If button is a link to Calendly, let it open normally
        // Otherwise, scroll to contact section
        const isCalendlyLink = btn.tagName === 'A' && btn.href && btn.href.includes('calendly');
        if (!isCalendlyLink) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// View Services Button with Magic Trail
const viewServicesBtn = document.querySelector('.btn-outline');
if (viewServicesBtn) {
    viewServicesBtn.addEventListener('click', (e) => {
        // Create sparkle burst
        const rect = viewServicesBtn.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createMagicSparkle(x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 80);
            }, i * 30);
        }
        
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            const offsetTop = servicesSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Add interactive hover glow to all interactive elements
const interactiveElements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .pricing-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function(e) {
        this.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
});

// Initialize page load animations
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

document.body.style.opacity = '0';

// Enhanced Scroll Animations with Stagger Effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all cards and sections with enhanced animations
const animateElements = document.querySelectorAll(
    '.service-card, .feature-card, .subject-card, .test-card, .testimonial-card, .stat-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.95)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});

// Section Title Animations
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    titleObserver.observe(title);
});

// Enhanced Parallax Effect for Hero Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const decorationCircles = document.querySelectorAll('.decoration-circle');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const sparkles = document.querySelectorAll('.sparkle');
    
    decorationCircles.forEach((circle, index) => {
        const speed = (index + 1) * 0.1;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    floatingIcons.forEach((icon, index) => {
        const speed = (index + 1) * 0.05;
        const rotation = scrolled * speed * 0.1;
        icon.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });
    
    sparkles.forEach((sparkle, index) => {
        const speed = (index + 1) * 0.03;
        sparkle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add Magic Sparkle Effect on Mouse Move
let lastSparkleTime = 0;
const sparkleInterval = 500; // milliseconds

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    if (currentTime - lastSparkleTime > sparkleInterval) {
        createMagicSparkle(e.pageX, e.pageY);
        lastSparkleTime = currentTime;
    }
});

function createMagicSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = Math.random() > 0.5 ? '✨' : '⭐';
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'magicSparkleFloat 1.5s ease-out forwards';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

// Add CSS animation for magic sparkles
const style = document.createElement('style');
style.textContent = `
    @keyframes magicSparkleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: translate(0, -30px) scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: translate(0, -60px) scale(0.5) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add Glow Effect to Service Cards on Hover
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s ease';
    });
});

// Add Pulse Animation to CTA Buttons
const ctaButtons = document.querySelectorAll('.btn-primary');
setInterval(() => {
    ctaButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.animation = 'none';
            setTimeout(() => {
                btn.style.animation = 'subtlePulse 0.6s ease';
            }, 10);
        }, index * 200);
    });
}, 5000);

// Add subtle pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes subtlePulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(pulseStyle);

// ===================================
// PRODUCTS - PAYMENT HANDLING
// ===================================

// Check for purchase success/cancel on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    const productId = urlParams.get('product');
    
    if (success === 'true') {
        // Show success message
        showPurchaseMessage('success', 'Purchase Successful! 🎉', 
            'Thank you for your purchase! You will receive an email with download instructions shortly.');
        
        // Clear URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Create celebration sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createMagicSparkle(x, y);
            }, i * 100);
        }
    } else if (canceled === 'true') {
        // Show cancellation message
        showPurchaseMessage('info', 'Purchase Canceled', 
            'Your purchase was canceled. No charges were made to your account.');
        
        // Clear URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

function showPurchaseMessage(type, title, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `purchase-message purchase-message-${type}`;
    messageDiv.innerHTML = `
        <div class="purchase-message-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="btn-close-message" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 10000);
}

// Product Purchase Handler
const buyButtons = document.querySelectorAll('.btn-buy');

buyButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const productId = button.getAttribute('data-product');
        const productTitle = button.closest('.product-card').querySelector('.product-title').textContent;
        
        // Create sparkle burst on click
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + window.scrollX;
        const y = rect.top + rect.height / 2 + window.scrollY;
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createMagicSparkle(x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 80);
            }, i * 30);
        }
        
        // Update button state
        const originalText = button.textContent;
        button.textContent = 'Processing... ✨';
        button.disabled = true;
        
        try {
            // Send purchase request to Netlify function
            const response = await fetch('/.netlify/functions/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    productName: productTitle
                })
            });
            
            const result = await response.json();
            
            if (response.ok && result.url) {
                // Redirect to Stripe Checkout
                window.location.href = result.url;
            } else {
                // Show error
                button.textContent = 'Error - Try Again';
                button.style.background = 'linear-gradient(135deg, #EF4444, #F87171)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'linear-gradient(135deg, #8B5CF6, #EC4899)';
                    button.disabled = false;
                }, 3000);
            }
        } catch (error) {
            console.error('Purchase error:', error);
            
            // For now, show a message to contact for purchase
            // This allows the functionality to work even without Stripe setup
            if (confirm(`To purchase "${productTitle}", please contact us at examexpertscontact@gmail.com or book a call to discuss. Would you like to go to the contact section?`)) {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            
            button.textContent = originalText;
            button.disabled = false;
        }
    });
});
