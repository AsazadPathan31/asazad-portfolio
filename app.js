// Global variables
let currentTestimonial = 0;
let testimonials = [];
let particles = [];
let animationFrame;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeTheme();
    initializeNavigation(); 
    initializeParticles();
    initializeTypingAnimation();
    initializeCounterAnimation();
    initializeSkillsTabs();
    initializeProjectFilters();
    initializeTestimonials();
    initializeFAB();
    initializeScrollAnimations();
    initializeContactForm();
    initializeProgressBars();
    initializeSmoothScrolling();
    
    // Load testimonials data
    testimonials = [
        {
            text: "Asazad is an exceptional Python developer who consistently delivers high-quality, scalable solutions. His FastAPI expertise and problem-solving skills are outstanding.",
            author: "Rahul Sharma",
            role: "Senior Technical Lead, IntegraConnect"
        },
        {
            text: "Working with Asazad has been fantastic. His ability to integrate ML models with production APIs and mentor junior developers makes him invaluable to our team.",
            author: "Priya Singh",
            role: "Project Manager, IntegraConnect"
        }
    ];
}

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Navigation
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(var(--color-surface-rgb), 0.98)';
        } else {
            navbar.style.background = 'rgba(var(--color-surface-rgb), 0.95)';
        }
    });
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Particle System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const duration = Math.random() * 15 + 10;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            animation-duration: ${duration}s;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 200);
    }
    
    // Continue creating particles
    setInterval(createParticle, 800);
}

// Typing Animation
function initializeTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const texts = [
        'Python Developer',
        'FastAPI Expert',
        'Angular Developer',
        'Machine Learning Engineer',
        'Azure Cloud Developer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeAnimation() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeAnimation, typeSpeed);
    }
    
    typeAnimation();
}

// Counter Animation
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

// Skills Tabs
function initializeSkillsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            skillCategories.forEach(category => category.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            this.classList.add('active');
            document.querySelector(`[data-category="${targetCategory}"]`).classList.add('active');
            
            // Animate progress bars in the active category
            setTimeout(() => {
                animateProgressBars(targetCategory);
            }, 100);
        });
    });
    
    // Initialize first tab
    animateProgressBars('backend');
}

function initializeProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeCategory = document.querySelector('.skill-category.active');
                if (activeCategory) {
                    const categoryName = activeCategory.getAttribute('data-category');
                    animateProgressBars(categoryName);
                }
                observer.unobserve(entry.target);
            }
        });
    });
    
    const skillsSection = document.getElementById('skills');
    observer.observe(skillsSection);
}

function animateProgressBars(category) {
    const activeCategory = document.querySelector(`[data-category="${category}"]`);
    const progressBars = activeCategory.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });
}

// Project Filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Project Modal - Make sure this function is globally accessible
window.openProjectModal = function(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    const projects = {
        1: {
            title: 'Disease Risk Prediction System',
            category: 'Machine Learning',
            description: 'Developed a comprehensive disease risk prediction system using machine learning algorithms to analyze patient data and predict the likelihood of various diseases including diabetes and heart disease.',
            technologies: ['Python', 'Scikit-learn', 'FastAPI', 'Angular', 'Pandas', 'Seaborn'],
            features: [
                'Data preprocessing and feature engineering',
                'Multiple ML classifiers (Logistic Regression, Random Forest, SVM)',
                'Achieved up to 92% accuracy',
                'REST API deployment using FastAPI',
                'Interactive Angular dashboard',
                'Real-time prediction visualization'
            ],
            achievements: [
                '92% prediction accuracy',
                'Integration with hospital systems',
                'Real-time data processing',
                'Comprehensive data visualization'
            ]
        },
        2: {
            title: 'Hospital Management System',
            category: 'Full Stack',
            description: 'A comprehensive full-stack application designed to streamline hospital operations including patient management, appointment scheduling, and staff allocation with secure role-based access control.',
            technologies: ['Angular', 'FastAPI', 'SQL Server', 'Azure DevOps', 'JWT Authentication'],
            features: [
                'Patient records management',
                'Appointment scheduling system',
                'Staff allocation and management',
                'Role-based access control (Admin, Doctor, Patient)',
                'Patient history tracking',
                'Secure authentication system'
            ],
            achievements: [
                'Deployed on Azure App Service',
                'CI/CD pipeline implementation',
                'Optimized database queries',
                'Enhanced security measures'
            ]
        },
        3: {
            title: 'Healthcare Automation Suite',
            category: 'Automation',
            description: 'Built a comprehensive automation suite using Python and Azure Functions to streamline healthcare processes and reduce manual overhead by 30% for high-volume platforms.',
            technologies: ['Python', 'Azure Functions', 'FastAPI', 'SQL Server', 'Azure DevOps'],
            features: [
                'Automated data processing workflows',
                'Report generation automation',
                'Patient data synchronization',
                'Automated notification systems',
                'Error handling and logging',
                'Scalable serverless architecture'
            ],
            achievements: [
                '30% reduction in manual overhead',
                'Improved process efficiency',
                'Automated error detection',
                'Real-time monitoring and alerts'
            ]
        },
        4: {
            title: 'Data Analytics Dashboard',
            category: 'Data Analytics',
            description: 'Created a comprehensive analytics dashboard providing real-time insights for business decision-makers with advanced data visualization and processing capabilities.',
            technologies: ['Angular', 'Python', 'Pandas', 'SQL Server', 'Chart.js'],
            features: [
                'Real-time data processing',
                'Interactive charts and graphs',
                'Custom report generation',
                'Data export functionality',
                'Advanced filtering options',
                'Mobile-responsive design'
            ],
            achievements: [
                'Real-time data insights',
                'Improved decision making',
                'Enhanced data visualization',
                'Streamlined reporting process'
            ]
        }
    };
    
    const project = projects[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="project-modal-content">
            <div class="project-modal-header">
                <h2>${project.title}</h2>
                <span class="project-badge">${project.category}</span>
            </div>
            <p class="project-modal-description">${project.description}</p>
            
            <div class="project-modal-section">
                <h3>Technologies Used</h3>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="project-modal-section">
                <h3>Key Features</h3>
                <ul class="feature-list">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-modal-section">
                <h3>Achievements</h3>
                <ul class="achievement-list">
                    ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-modal-actions">
                <button class="btn btn--primary" onclick="window.open('https://github.com/asazadpathan', '_blank')">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </button>
                <button class="btn btn--outline" onclick="window.open('https://github.com/asazadpathan', '_blank')">
                    <i class="fab fa-github"></i> View Code
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Make closeProjectModal globally accessible
window.closeProjectModal = function() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Testimonials Carousel
function initializeTestimonials() {
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => changeTestimonial(-1));
        nextBtn.addEventListener('click', () => changeTestimonial(1));
        
        // Auto-play testimonials
        setInterval(() => changeTestimonial(1), 5000);
    }
}

function changeTestimonial(direction) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards[currentTestimonial].classList.remove('active');
    
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = testimonialCards.length - 1;
    }
    
    testimonialCards[currentTestimonial].classList.add('active');
}

// FAB Menu
function initializeFAB() {
    const fabMain = document.getElementById('fab-main');
    const fabMenu = document.getElementById('fab-menu');
    let isMenuOpen = false;
    
    if (fabMain && fabMenu) {
        fabMain.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            isMenuOpen = !isMenuOpen;
            fabMenu.classList.toggle('active', isMenuOpen);
            
            const icon = fabMain.querySelector('i');
            icon.className = isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
        });
        
        // Close menu when clicking on menu items
        const fabItems = document.querySelectorAll('.fab-item');
        fabItems.forEach(item => {
            item.addEventListener('click', function() {
                isMenuOpen = false;
                fabMenu.classList.remove('active');
                const icon = fabMain.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!fabMain.contains(e.target) && !fabMenu.contains(e.target)) {
                if (isMenuOpen) {
                    isMenuOpen = false;
                    fabMenu.classList.remove('active');
                    const icon = fabMain.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    
    // Add fade-up class to elements that should animate
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .education-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
}

// Contact Form with improved feedback
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Add loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate form submission with visible feedback
        setTimeout(() => {
            // Create and show success message
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
            
            // Remove loading state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 2000);
        
        console.log('Form submitted:', { name, email, message });
    });
}

// Notification system for form feedback
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles for notification
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            min-width: 300px;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification--success {
            border-left: 4px solid var(--color-success);
        }
        
        .notification--error {
            border-left: 4px solid var(--color-error);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: var(--space-12);
            color: var(--color-text);
        }
        
        .notification-content i {
            color: var(--color-success);
            font-size: var(--font-size-lg);
        }
        
        .notification--error .notification-content i {
            color: var(--color-error);
        }
        
        .notification-close {
            position: absolute;
            top: var(--space-8);
            right: var(--space-8);
            background: transparent;
            border: none;
            color: var(--color-text-secondary);
            cursor: pointer;
            padding: var(--space-4);
        }
        
        .notification-close:hover {
            color: var(--color-text);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Close modal on Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeProjectModal();
        }
        
        // Close FAB menu on Escape
        const fabMenu = document.getElementById('fab-menu');
        const fabMain = document.getElementById('fab-main');
        if (fabMenu && fabMenu.classList.contains('active')) {
            fabMenu.classList.remove('active');
            const icon = fabMain.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    }
});

// Handle window resize for particles
window.addEventListener('resize', function() {
    // Recreate particles on resize if needed
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        // Clear existing particles
        particlesContainer.innerHTML = '';
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Lazy loading for images (if any are added later)
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add additional styles for modal content
const modalStyles = `
    .project-modal-content {
        max-width: 100%;
    }
    
    .project-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-20);
    }
    
    .project-modal-header h2 {
        margin: 0;
        color: var(--color-text);
    }
    
    .project-modal-description {
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin-bottom: var(--space-24);
    }
    
    .project-modal-section {
        margin-bottom: var(--space-24);
    }
    
    .project-modal-section h3 {
        color: var(--color-text);
        margin-bottom: var(--space-16);
        font-size: var(--font-size-xl);
    }
    
    .feature-list, .achievement-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .feature-list li, .achievement-list li {
        color: var(--color-text-secondary);
        margin-bottom: var(--space-8);
        position: relative;
        padding-left: var(--space-20);
    }
    
    .feature-list li::before, .achievement-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
    }
    
    .project-modal-actions {
        display: flex;
        gap: var(--space-16);
        justify-content: center;
        margin-top: var(--space-32);
        flex-wrap: wrap;
    }
    
    .project-modal-actions .btn {
        display: inline-flex;
        align-items: center;
        gap: var(--space-8);
    }
`;

// Add modal styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

console.log('Portfolio app initialized successfully!');