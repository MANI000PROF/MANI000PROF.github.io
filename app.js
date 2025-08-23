// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initScrollEffects();
    initProjectFilters();
    initContactForm();
    initSkillAnimations();
    initSmoothScrolling();
    initInteractiveAbout();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    // Check for saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add visual feedback
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (!navToggle || !navClose || !navMenu) return;
    
    // Open menu
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        navToggle.setAttribute('aria-expanded', 'true');
    });
    
    // Close menu
    navClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });
    
    function closeMenu() {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// Scroll Effects and Navigation
function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
        
        // Header background on scroll
        const header = document.querySelector('.header');
        if (scrollY > 50) {
            header.style.background = 'rgba(var(--color-slate-900-rgb), 0.98)';
        } else {
            header.style.background = 'rgba(var(--color-slate-900-rgb), 0.95)';
        }
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.skill, .project-card, .stat');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Interactive About Me Section - Complete JavaScript Code
function initInteractiveAbout() {
    // Tooltip data configuration - THIS IS WHAT YOU WERE LOOKING FOR
    const tooltipData = {
        'ai-solutions': {
            title: 'AI Solutions Vision',
            icon: '🎯',
            content: 'My goal is to develop AI systems that solve real-world problems and improve people\'s daily lives. I\'m particularly interested in applications that combine technical innovation with genuine human benefit.',
            color: '#3b82f6'
        },
        'current-skills': {
            title: 'Current Technical Skills',
            icon: '⚡',
            content: 'I have hands-on experience with Python (PyQt, YOLOv9, OpenCV), Android development (Kotlin, Firebase), and have built projects like STRIVE (accident detection system) and Samarpan mobile app.',
            color: '#10b981'
        },
        'generative-ai': {
            title: 'Generative AI Research Interest', 
            icon: '🧠',
            content: 'I\'m fascinated by the potential of integrating large language models and generative AI into real-time monitoring systems. This could create AI that not only processes data but provides contextual, human-like insights.',
            color: '#8b5cf6'
        },
        'emotional-ai': {
            title: 'Emotional Intelligence in AI',
            icon: '💝',
            content: 'I want to research how AI can understand and respond to human emotional states through behavioral analysis, creating more empathetic and contextually aware systems.',
            color: '#f59e0b'
        },
        'financial-research': {
            title: 'Financial AI Research Vision',
            icon: '💰',
            content: 'Research focus: Developing AI that can analyze spending patterns, predict financial stress, and provide personalized advice. Goal is to create systems that genuinely help people improve their financial wellness.',
            color: '#059669'
        },
        'health-research': {
            title: 'Health Monitoring Research Goals',
            icon: '🏥', 
            content: 'I aim to research AI systems that can monitor daily activities and predict health issues before they become serious. This could revolutionize preventive healthcare through behavioral analysis.',
            color: '#dc2626'
        },
        'social-research': {
            title: 'Digital Wellness Research',
            icon: '📱',
            content: 'Research interest: How AI can detect unhealthy social media patterns and suggest interventions to improve mental health and reduce digital overconsumption.',
            color: '#7c3aed'
        },
        'lifestyle-research': {
            title: 'Personalized Coaching Research',
            icon: '🎯',
            content: 'I want to develop AI that adapts to individual preferences and emotional states to provide truly personalized lifestyle recommendations for exercise, productivity, and well-being.',
            color: '#ea580c'
        },
        'interdisciplinary': {
            title: 'Interdisciplinary Approach',
            icon: '🔬',
            content: 'I believe the future of AI requires combining computer science with psychology and human-centered design. This interdisciplinary approach ensures technology serves human needs effectively.',
            color: '#0891b2'
        },
        'ml-ai-interest': {
            title: 'Machine Learning & AI',
            icon: '🤖',
            content: 'Studying deep learning, neural networks, and modern AI frameworks. Particularly interested in applications that can understand and predict human behavior patterns.',
            color: '#6366f1'
        },
        'app-dev-interest': {
            title: 'Application Development', 
            icon: '📱',
            content: 'Experience in Android development with Kotlin and Firebase. Interested in creating cross-platform applications that integrate AI capabilities seamlessly.',
            color: '#059669'
        },
        'cloud-interest': {
            title: 'Cloud Computing',
            icon: '☁️',
            content: 'Learning cloud platforms for scalable AI deployment. Understanding how to build systems that can handle real-time data processing and machine learning at scale.',
            color: '#0891b2'
        },
        'system-design-interest': {
            title: 'System Design',
            icon: '🏗️', 
            content: 'Studying how to architect large-scale systems that are reliable, scalable, and maintainable. Essential for building AI systems that work in real-world environments.',
            color: '#dc2626'
        },
        'data-science-interest': {
            title: 'Data Science',
            icon: '📊',
            content: 'Learning statistical analysis, data visualization, and how to extract meaningful insights from large datasets. Foundation for understanding human behavior patterns.',
            color: '#f59e0b'
        }
    };

    // Get DOM elements
    const tooltip = document.getElementById('tooltip');
    const interactiveElements = document.querySelectorAll('.interactive-text');

    // Check if elements exist
    if (!tooltip || !interactiveElements.length) {
        console.log('Tooltip elements not found. Make sure HTML is properly structured.');
        return;
    }

    let currentTooltip = null;
    let tooltipTimeout = null;

    // Initialize tooltip functionality
    interactiveElements.forEach(element => {
        // Mouse enter event
        element.addEventListener('mouseenter', function(e) {
            const tooltipKey = this.getAttribute('data-tooltip');
            const data = tooltipData[tooltipKey];

            if (!data) return;

            clearTimeout(tooltipTimeout);
            this.classList.add('highlight');
            setTooltipContent(data);
            positionTooltip(e.currentTarget);
            showTooltip();
            currentTooltip = tooltipKey;
        });

        // Mouse leave event
        element.addEventListener('mouseleave', function() {
            this.classList.remove('highlight');
            tooltipTimeout = setTimeout(() => {
                hideTooltip();
                currentTooltip = null;
            }, 100);
        });

        // Click event for mobile
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const tooltipKey = this.getAttribute('data-tooltip');
            const data = tooltipData[tooltipKey];

            if (!data) return;

            if (currentTooltip === tooltipKey && tooltip.classList.contains('show')) {
                hideTooltip();
                currentTooltip = null;
            } else {
                setTooltipContent(data);
                positionTooltip(this);
                showTooltip();
                currentTooltip = tooltipKey;

                setTimeout(() => {
                    if (currentTooltip === tooltipKey) {
                        hideTooltip();
                        currentTooltip = null;
                    }
                }, 5000);
            }
        });
    });

    // Tooltip hover events
    tooltip.addEventListener('mouseenter', function() {
        clearTimeout(tooltipTimeout);
    });

    tooltip.addEventListener('mouseleave', function() {
        hideTooltip();
        currentTooltip = null;
    });

    // Hide on outside click and scroll
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.interactive-text') && !e.target.closest('.tooltip')) {
            hideTooltip();
            currentTooltip = null;
        }
    });

    window.addEventListener('scroll', function() {
        if (currentTooltip) {
            hideTooltip();
            currentTooltip = null;
        }
    }, { passive: true });

    // Helper functions
    function setTooltipContent(data) {
        const icon = tooltip.querySelector('.tooltip__icon');
        const title = tooltip.querySelector('.tooltip__title');
        const text = tooltip.querySelector('.tooltip__text');

        icon.textContent = data.icon;
        icon.style.color = data.color;
        title.textContent = data.title;
        title.style.color = data.color;
        text.textContent = data.content;
    }

    function positionTooltip(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 15;

        if (left < 10) left = 10;
        if (left + tooltipRect.width > viewportWidth - 10) {
            left = viewportWidth - tooltipRect.width - 10;
        }

        if (top < 10) {
            top = rect.bottom + 15;
            tooltip.querySelector('.tooltip__arrow').style.cssText = `
                top: -6px; bottom: auto; transform: translateX(-50%) rotate(-135deg);
            `;
        } else {
            tooltip.querySelector('.tooltip__arrow').style.cssText = `
                bottom: -6px; top: auto; transform: translateX(-50%) rotate(45deg);
            `;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }

    function showTooltip() {
        tooltip.classList.add('show');
        tooltip.style.transform = 'translateY(10px) scale(0.95)';
        tooltip.style.opacity = '0';
        
        requestAnimationFrame(() => {
            tooltip.style.transform = 'translateY(0) scale(1)';
            tooltip.style.opacity = '1';
        });
    }

    function hideTooltip() {
        tooltip.classList.remove('show');
        interactiveElements.forEach(el => el.classList.remove('highlight'));
    }

    // Keyboard accessibility
    interactiveElements.forEach(element => {
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'Escape') {
                hideTooltip();
                currentTooltip = null;
            }
        });
    });

    console.log('Interactive About Me section initialized successfully!');
}

// clickable skill cards
function openSkillWebsite(url, skillName) {
    const skillCard = event.currentTarget;
    
    // Add ripple effect
    createSkillRipple(event, skillCard);
    
    // Add success feedback
    skillCard.classList.add('skill-card--success');
    setTimeout(() => {
        skillCard.classList.remove('skill-card--success');
    }, 400);
    
    // Open website in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Show feedback notification
    showSkillFeedback(`Opening ${skillName} website...`, skillName);
    
    // Optional: Track the click for analytics
    trackSkillClick(skillName, url);
}

function createSkillRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('skill-card-ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function showSkillFeedback(message, skillName) {
    const feedback = document.createElement('div');
    feedback.className = 'skill-feedback';
    feedback.innerHTML = `
        <div class="skill-feedback__content">
            🔗 ${message}
        </div>
    `;
    
    // Add styles
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        z-index: 9999;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
        pointer-events: none;
        max-width: 280px;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 3000);
}

function trackSkillClick(skillName, url) {
    // Optional: Add analytics tracking
    console.log(`Skill clicked: ${skillName} -> ${url}`);
    
    // If you have Google Analytics:
    // gtag('event', 'skill_click', {
    //     'skill_name': skillName,
    //     'destination_url': url
    // });
}

// Optional: Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('skill-card--clickable')) {
            event.preventDefault();
            focusedElement.click();
        }
    }
});

// Add accessibility attributes on page load
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card--clickable');
    skillCards.forEach(card => {
        const skillName = card.getAttribute('data-skill');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Visit ${skillName} official website`);
        card.title = `Click to visit ${skillName} official website`;
    });
});


// Project Filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            this.classList.add('filter-btn--active');
            
            // Filter projects
            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, 100);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animate-in');
                }
            });
        });
    });
}

// Contact Info Interaction - Add interactive functionality and effects
function openEmail() {
    const emailItem = document.getElementById('email-contact');
    
    // Add ripple effect
    createRippleEffect(event, emailItem);
    
    // Add success feedback
    emailItem.classList.add('contact__item--success');
    setTimeout(() => {
        emailItem.classList.remove('contact__item--success');
    }, 500);
    
    // Open email client with pre-filled subject and body
    const subject = encodeURIComponent("Portfolio Inquiry - Let's Connect!");
    const body = encodeURIComponent(`Hi Manikanta,

I visited your portfolio website and would like to get in touch with you.

Best regards,
[Your Name]`);
    
    const mailtoLink = `mailto:alapati.manikanta.off@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show user feedback
    showContactFeedback('Opening email client...', 'email');
}

function makeCall() {
    const phoneItem = document.getElementById('phone-contact');
    
    // Add ripple effect
    createRippleEffect(event, phoneItem);
    
    // Add success feedback
    phoneItem.classList.add('contact__item--success');
    setTimeout(() => {
        phoneItem.classList.remove('contact__item--success');
    }, 500);
    
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // On mobile: Open phone dialer
        window.location.href = 'tel:+918919698182';
        showContactFeedback('Opening phone dialer...', 'phone');
    } else {
        // On desktop: Show phone number and copy option
        showPhoneOptions();
    }
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function openMap() {
    const locationItem = document.getElementById('location-contact');
    
    // Add ripple effect
    createRippleEffect(event, locationItem);
    
    // Add success feedback
    locationItem.classList.add('contact__item--success');
    setTimeout(() => {
        locationItem.classList.remove('contact__item--success');
    }, 500);
    
    // Location details
    const location = "Hyderabad, India";
    const coordinates = "17.3850,78.4867"; // Hyderabad coordinates
    
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isMobile) {
        // Mobile: Try to open native map apps
        if (isIOS) {
            // iOS: Try Apple Maps first, fallback to Google Maps
            const appleMapsUrl = `maps://maps.apple.com/?q=${encodeURIComponent(location)}`;
            const googleMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}`;
            
            // Try Apple Maps, fallback to Google Maps
            window.location.href = appleMapsUrl;
            
            // Fallback after a delay
            setTimeout(() => {
                window.open(googleMapsUrl, '_blank');
            }, 500);
            
            showContactFeedback('Opening Maps app...', 'location');
            
        } else if (isAndroid) {
            // Android: Try Google Maps app first
            const googleMapsApp = `geo:${coordinates}?q=${encodeURIComponent(location)}`;
            const googleMapsWeb = `https://maps.google.com/maps?q=${encodeURIComponent(location)}`;
            
            try {
                window.location.href = googleMapsApp;
                showContactFeedback('Opening Google Maps...', 'location');
            } catch (error) {
                window.open(googleMapsWeb, '_blank');
                showContactFeedback('Opening Maps in browser...', 'location');
            }
            
        } else {
            // Other mobile: Open Google Maps web
            const googleMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}`;
            window.open(googleMapsUrl, '_blank');
            showContactFeedback('Opening Google Maps...', 'location');
        }
        
    } else {
        // Desktop: Show map options modal
        showMapOptions(location, coordinates);
    }
}

function showMapOptions(location, coordinates) {
    const modal = document.createElement('div');
    modal.className = 'map-modal';
    modal.innerHTML = `
        <div class="map-modal__backdrop" onclick="closeMapModal()"></div>
        <div class="map-modal__content">
            <h3>📍 View Location</h3>
            <p><strong>${location}</strong></p>
            <div class="map-modal__buttons">
                <button onclick="openGoogleMaps('${location}')" class="btn btn--primary">
                    🗺️ Google Maps
                </button>
                <button onclick="openBingMaps('${location}')" class="btn btn--secondary">
                    🌐 Bing Maps
                </button>
                <button onclick="copyLocation('${location}')" class="btn btn--secondary">
                    📋 Copy Location
                </button>
                <button onclick="closeMapModal()" class="btn btn--outline">
                    Close
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    `;
    
    document.body.appendChild(modal);
    
    // Add modal CSS if not already added
    if (!document.getElementById('map-modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'map-modal-styles';
        modalStyles.textContent = `
            .map-modal__backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                animation: fadeIn 0.3s ease;
            }
            .map-modal__content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
                min-width: 350px;
                animation: slideInUp 0.3s ease;
            }
            .map-modal__buttons {
                margin-top: 1.5rem;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.75rem;
                justify-content: center;
            }
            .map-modal__buttons .btn {
                padding: 0.75rem 1rem;
                font-size: 0.9rem;
            }
            @media (max-width: 480px) {
                .map-modal__content {
                    min-width: 300px;
                    margin: 1rem;
                }
                .map-modal__buttons {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

function openGoogleMaps(location) {
    const googleMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}`;
    window.open(googleMapsUrl, '_blank');
    showContactFeedback('Opening Google Maps...', 'location');
    closeMapModal();
}

function openBingMaps(location) {
    const bingMapsUrl = `https://www.bing.com/maps?q=${encodeURIComponent(location)}`;
    window.open(bingMapsUrl, '_blank');
    showContactFeedback('Opening Bing Maps...', 'location');
    closeMapModal();
}

function copyLocation(location) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(location).then(() => {
            showContactFeedback('Location copied!', 'location');
            closeMapModal();
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = location;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showContactFeedback('Location copied!', 'location');
        closeMapModal();
    }
}

function closeMapModal() {
    const modal = document.querySelector('.map-modal');
    if (modal) {
        modal.remove();
    }
}


// Updated showContactFeedback function to handle location
function showContactFeedback(message, type) {
    // Create feedback tooltip
    const feedback = document.createElement('div');
    feedback.className = 'contact-feedback';
    
    // Choose appropriate emoji
    let emoji = '✅';
    if (type === 'email') emoji = '📧';
    else if (type === 'phone') emoji = '📱';
    else if (type === 'location') emoji = '📍';
    
    feedback.innerHTML = `
        <div class="contact-feedback__content">
            ${emoji} ${message}
        </div>
    `;
    
    // Add styles
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 9999;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 3000);
}

function showPhoneOptions() {
    const modal = document.createElement('div');
    modal.className = 'phone-modal';
    modal.innerHTML = `
        <div class="phone-modal__backdrop" onclick="closePhoneModal()"></div>
        <div class="phone-modal__content">
            <h3>📱 Contact Options</h3>
            <p>Phone: <strong>+91-8919698182</strong></p>
            <div class="phone-modal__buttons">
                <button onclick="copyPhoneNumber()" class="btn btn--secondary">
                    📋 Copy Number
                </button>
                <button onclick="closePhoneModal()" class="btn btn--primary">
                    Close
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    `;
    
    document.body.appendChild(modal);
    
    // Add modal CSS if not already added
    if (!document.getElementById('phone-modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'phone-modal-styles';
        modalStyles.textContent = `
            .phone-modal__backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                animation: fadeIn 0.3s ease;
            }
            .phone-modal__content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
                min-width: 300px;
                animation: slideInUp 0.3s ease;
            }
            .phone-modal__buttons {
                margin-top: 1.5rem;
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideInUp {
                from { transform: translate(-50%, -40%); opacity: 0; }
                to { transform: translate(-50%, -50%); opacity: 1; }
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

function copyPhoneNumber() {
    const phoneNumber = '+91-8919698182';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
            showContactFeedback('Phone number copied!', 'phone');
            closePhoneModal();
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showContactFeedback('Phone number copied!', 'phone');
        closePhoneModal();
    }
}

function closePhoneModal() {
    const modal = document.querySelector('.phone-modal');
    if (modal) {
        modal.remove();
    }
}


// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (!contactForm || !formMessage) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // REAL SUBMISSION TO WEB3FORMS - Replace the setTimeout simulation
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showFormMessage('✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                contactForm.reset();
            } else {
                showFormMessage('❌ Oops! There was a problem sending your message. Please try again.', 'error');
            }
        } catch (error) {
            showFormMessage('❌ Network error. Please check your internet connection and try again.', 'error');
            console.error('Form submission error:', error);
        }
        
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
    
    function showFormMessage(message, type) {
        formMessage.innerHTML = message; // Changed to innerHTML for emojis
        formMessage.className = `form-message form-message--${type}`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}


// Skill Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const progressBar = skillBar.querySelector('.skill__progress');
                const level = skillBar.getAttribute('data-level');
                
                // Animate skill bar
                setTimeout(() => {
                    progressBar.style.width = level + '%';
                }, 200);
                
                // Animate number count
                const percentageElement = skillBar.querySelector('.skill__percentage');
                if (percentageElement) {
                    animateNumber(percentageElement, 0, parseInt(level), 1500);
                }
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(skill => {
        skillObserver.observe(skill);
    });
}

// Animate numbers
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const suffix = element.textContent.includes('%') ? '%' : '';
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutCubic(progress));
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Parallax effect for hero decorations
function initParallaxEffect() {
    const decorations = document.querySelectorAll('.hero__decoration');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        decorations.forEach((decoration, index) => {
            const speed = 0.3 + (index * 0.1);
            decoration.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Initialize parallax effect
initParallaxEffect();

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            const navToggle = document.getElementById('nav-toggle');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScrollHandler = debounce(function() {
    // Additional scroll optimizations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility improvements
function initAccessibilityFeatures() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = 'var(--color-primary)';
    skipLink.style.color = 'var(--color-btn-primary-text)';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.zIndex = '100000';
    skipLink.style.borderRadius = '4px';
    skipLink.style.transition = 'top 0.3s ease';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize accessibility features
initAccessibilityFeatures();

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio website error:', e.error);
});

// Track user interactions for analytics
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
}

// Track important interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .nav__link, .project-card, .social__link')) {
        trackEvent('click', {
            element: e.target.className,
            text: e.target.textContent.trim().substring(0, 50)
        });
    }
});

// Additional utility functions
const Utils = {
    // Get element position relative to viewport
    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset,
            bottom: rect.bottom + window.pageYOffset,
            right: rect.right + window.pageXOffset
        };
    },
    
    // Check if element is in viewport
    isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= 0 - threshold &&
            rect.left >= 0 - threshold &&
            rect.bottom <= windowHeight + threshold &&
            rect.right <= windowWidth + threshold
        );
    },
    
    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
};

// Make utils available globally
window.PortfolioUtils = Utils;

console.log('🚀 Portfolio website loaded successfully!');