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

// Active Navigation Link based on current page URL
(function() {
    const path = window.location.pathname;
    const pageMap = {
        'index.html': 'index.html',
        '': 'index.html',
        '/': 'index.html',
        'services.html': 'services.html',
        'about.html': 'about.html',
        'approach.html': 'approach.html',
        'pricing.html': 'pricing.html',
        'contact.html': 'contact.html',
    };
    const currentFile = path.split('/').pop() || 'index.html';
    const activePage = pageMap[currentFile] || currentFile;
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === activePage || (activePage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
})();

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

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;

    // Gather form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Add loading state with magic
    submitBtn.textContent = 'Sending Magic... ✨';
    submitBtn.style.background = 'linear-gradient(135deg, #10B981, #34D399)';
    submitBtn.disabled = true;

    try {
        // Send form data via Netlify built-in form handling
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'form-name': 'contact',
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message
            }).toString()
        });

        if (response.ok) {
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
}

// Easy Stripe sign-up form
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    const signupStatus = document.getElementById('signupStatus');
    const signupPlanNote = document.getElementById('signupPlanNote');
    const signupSubmitBtn = signupForm.querySelector('.btn-submit');
    const signupPlanInputs = document.querySelectorAll('input[name="signup-plan"]');
    const signupPlanContent = {
        'pay-as-you-go': {
            planName: 'Pay As You Go',
            label: 'Pay As You Go:',
            body: 'Stripe will charge your first $75 hour today. No contract or membership — future sessions stay at $75/hr.'
        },
        'four-hour-package': {
            planName: '4-Hour Package',
            label: '4-Hour Package:',
            body: 'Stripe will charge $260 today for four hours of tutoring at $65/hr. Save $10/hr vs. single sessions.'
        },
        'annual-member': {
            planName: 'Annual Member Rate',
            label: 'Annual Member Rate:',
            body: 'Stripe will charge the $100 annual membership registration today. Your tutoring rate is $50/hr for the next 12 months.'
        }
    };

    const updateSignupPlan = () => {
        const selectedPlan = document.querySelector('input[name="signup-plan"]:checked')?.value || 'pay-as-you-go';
        signupPlanInputs.forEach(input => {
            input.closest('.signup-plan-card')?.classList.toggle('signup-plan-card-active', input.checked);
        });
        if (signupPlanNote) {
            const noteLabel = signupPlanNote.querySelector('.signup-plan-note-label');
            const noteBody = signupPlanNote.querySelector('.signup-plan-note-body');
            if (noteLabel && signupPlanContent[selectedPlan]) {
                noteLabel.textContent = signupPlanContent[selectedPlan].label;
            }
            if (noteBody && signupPlanContent[selectedPlan]) {
                noteBody.textContent = signupPlanContent[selectedPlan].body;
            }
        }
    };

    const setSignupStatus = (message = '', type = '') => {
        if (!signupStatus) return;
        signupStatus.textContent = message;
        signupStatus.className = 'signup-form-status';
        if (type) {
            signupStatus.classList.add(`signup-form-status-${type}`);
        }
    };

    signupPlanInputs.forEach(input => {
        input.addEventListener('change', updateSignupPlan);
    });

    updateSignupPlan();

    // Rep code unlock row — reveals the hidden Annual Member Rate card
    const repCodeInput = document.getElementById('repCodeInput');
    const repCodeUnlockBtn = document.getElementById('repCodeUnlockBtn');
    const repCodeStatus = document.getElementById('repCodeStatus');
    const annualMemberCard = document.getElementById('annualMemberCard');
    const annualMemberRadio = document.getElementById('annualMemberRadio');
    const hiddenPromoCode = document.getElementById('signup-promo-code');

    const setRepCodeStatus = (message, type) => {
        if (!repCodeStatus) return;
        repCodeStatus.textContent = message;
        repCodeStatus.className = 'rep-code-unlock-status';
        if (type) repCodeStatus.classList.add('rep-code-unlock-status-' + type);
    };

    const unlockAnnualMember = () => {
        const code = repCodeInput ? repCodeInput.value.trim() : '';
        if (!code) {
            setRepCodeStatus('Please enter a rep code.', 'error');
            return;
        }
        if (annualMemberCard) {
            annualMemberCard.style.display = '';
            annualMemberCard.removeAttribute('aria-hidden');
            annualMemberCard.classList.add('signup-plan-card-unlocked');
        }
        if (annualMemberRadio) {
            annualMemberRadio.checked = true;
        }
        if (hiddenPromoCode) {
            hiddenPromoCode.value = code;
        }
        updateSignupPlan();
        setRepCodeStatus('✅ Annual Member Rate unlocked! Select it above and continue.', 'success');
        if (repCodeUnlockBtn) repCodeUnlockBtn.disabled = true;
        if (repCodeInput) repCodeInput.disabled = true;
    };

    if (repCodeUnlockBtn) {
        repCodeUnlockBtn.addEventListener('click', unlockAnnualMember);
    }
    if (repCodeInput) {
        repCodeInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                unlockAnnualMember();
            }
        });
    }

    const signupParams = new URLSearchParams(window.location.search);
    const signupResult = signupParams.get('signup');
    if (signupResult === 'success') {
        const completedPlan = signupParams.get('plan') || 'pay-as-you-go';
        const planLabel = signupPlanContent[completedPlan]?.planName || signupPlanContent['pay-as-you-go'].planName;
        setSignupStatus(`Stripe checkout completed for the ${planLabel}. We will follow up shortly with your next steps.`, 'success');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        signupForm.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    } else if (signupResult === 'canceled') {
        setSignupStatus('Stripe checkout was canceled. You can update your info or choose a different plan below.', 'error');
    }

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = signupForm.elements['name'].value.trim();
        const email = signupForm.email.value.trim();
        const subject = signupForm.subject.value.trim();
        const goals = signupForm.goals.value.trim();
        const phone = signupForm.phone.value.trim();
        const plan = document.querySelector('input[name="signup-plan"]:checked')?.value;
        const promoCode = (document.getElementById('signup-promo-code')?.value || '').trim();

        if (!name || !email || !subject || !plan) {
            setSignupStatus('Please complete your name, email, study focus, and plan before continuing.', 'error');
            return;
        }

        if (plan === 'annual-member' && !promoCode) {
            setSignupStatus('Please enter the rep code to unlock the Annual Member rate.', 'error');
            return;
        }

        setSignupStatus('Redirecting you to secure Stripe checkout...', 'pending');
        signupSubmitBtn.disabled = true;
        signupSubmitBtn.textContent = 'Opening Stripe...';

        try {
            const response = await fetch('/.netlify/functions/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, subject, goals, plan, promoCode })
            });

            const result = await response.json();

            if (!response.ok || !result.url) {
                throw new Error(result.error || 'Unable to start checkout right now.');
            }

            if (!isStripeCheckoutUrl(result.url)) {
                throw new Error('Received an unexpected checkout URL. Please contact us directly.');
            }

            window.location.href = result.url;
        } catch (error) {
            console.error('Stripe sign-up error:', error);
            setSignupStatus(error.message || 'Unable to start checkout right now. Please try again or contact us directly.', 'error');
            signupSubmitBtn.disabled = false;
            signupSubmitBtn.textContent = 'Continue to Stripe Checkout';
        }
    });
}


function isStripeCheckoutUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' && (parsed.hostname === 'checkout.stripe.com' || parsed.hostname.endsWith('.stripe.com'));
    } catch (error) {
        return false;
    }
}

// Smooth Scroll for same-page anchor links only
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
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
        // Otherwise, navigate to contact page
        const isCalendlyLink = btn.tagName === 'A' && btn.href && btn.href.includes('calendly');
        if (!isCalendlyLink) {
            e.preventDefault();
            window.location.href = 'contact.html';
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
        
        window.location.href = 'services.html';
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
