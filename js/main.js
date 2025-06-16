// Main JavaScript - Portfolio Moderno
// Ademar G. C. Jr.

class PortfolioApp {
    constructor() {
        this.isLoading = true;
        this.currentSection = 'home';
        this.scrollPosition = 0;
        this.isScrolling = false;
        this.observers = new Map();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupScrollEffects();
        this.setupAnimations();
        this.handleLoading();
    }
    
    setupEventListeners() {
        // DOM Content Loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
        
        // Window Events
        window.addEventListener('load', () => this.onWindowLoad());
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('resize', () => this.onResize());
        
        // Navigation
        document.addEventListener('click', (e) => this.handleNavigation(e));
        
        // Form Submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Scroll to Top
        const scrollTopBtn = document.getElementById('scroll-to-top');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => this.scrollToTop());
        }
        
        // Mobile Menu
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Keyboard Navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Mouse Events for Custom Cursor
        document.addEventListener('mousemove', (e) => this.updateCursor(e));
        document.addEventListener('mouseenter', () => this.showCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
    }
    
    onDOMReady() {
        console.log('DOM Ready - Initializing Portfolio');
        
        // Initialize Lucide Icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 100
            });
        }
        
        // Initialize Typed.js
        this.initTypedText();
        
        // Initialize Particles
        this.initParticles();
        
        // Setup Intersection Observers
        this.setupIntersectionObservers();
        
        // Initialize Skills Animation
        this.initSkillsAnimation();
        
        // Setup Smooth Scrolling
        this.setupSmoothScrolling();
    }
    
    onWindowLoad() {
        console.log('Window Loaded - Finalizing Setup');
        this.hideLoadingScreen();
        this.startMainAnimations();
    }
    
    onScroll() {
        if (!this.isScrolling) {
            requestAnimationFrame(() => {
                this.updateScrollEffects();
                this.updateActiveNavigation();
                this.updateScrollToTopButton();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
    }
    
    onResize() {
        // Update particles
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.fn.canvasSize();
        }
        
        // Update GSAP ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
        
        // Update AOS
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
    
    initializeComponents() {
        // Initialize Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.setTheme(savedTheme);
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Initialize Custom Cursor
        this.initCustomCursor();
        
        // Add Ripple Effect to Buttons
        this.addRippleEffect();
        
        // Initialize Magnetic Effect
        this.initMagneticEffect();
        
        // Setup Form Validation
        this.setupFormValidation();
    }
    
    initTypedText() {
        const typedElement = document.getElementById('typed-name');
        if (typedElement && typeof Typed !== 'undefined') {
            new Typed('#typed-name', {
                strings: ['Ademar G. C. Jr.', 'Desenvolvedor Full Stack', 'Criador de Soluções'],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }
    
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#3b82f6'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#3b82f6',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    setupIntersectionObservers() {
        // Section Observer for Navigation
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentSection = entry.target.id;
                    this.updateActiveNavigation();
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });
        
        // Observe all sections
        document.querySelectorAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Animation Observer
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements for scroll animations
        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
            animationObserver.observe(el);
        });
        
        this.observers.set('section', sectionObserver);
        this.observers.set('animation', animationObserver);
    }
    
    initSkillsAnimation() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    
                    // Animate progress bar
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                    }, 200);
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
        
        this.observers.set('skills', skillObserver);
    }
    
    setupSmoothScrolling() {
        // Enable smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupScrollEffects() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Parallax effect for hero section
            gsap.to('.hero-section', {
                yPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
            
            // Floating elements
            gsap.to('.hero-avatar', {
                y: -20,
                duration: 2,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });
            
            // Stagger animations for project cards
            gsap.from('.project-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
            
            // Text reveal animations
            gsap.from('.section-title', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.section-title',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    }
    
    setupAnimations() {
        // Add entrance animations to elements
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Add hover animations to interactive elements
        document.querySelectorAll('.hover-lift').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'translateY(-5px)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translateY(0)';
            });
        });
    }
    
    handleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Simulate loading progress
            const progressBar = loadingScreen.querySelector('.loading-bar');
            if (progressBar) {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                    }
                    progressBar.style.width = progress + '%';
                }, 100);
            }
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                    this.isLoading = false;
                }, 500);
            }, 1000);
        }
    }
    
    startMainAnimations() {
        // Start hero animations
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-fade-in-up');
            }, index * 200);
        });
        
        // Start floating animations
        document.querySelectorAll('.animate-float').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
    
    updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Update navbar background opacity
        const nav = document.querySelector('.nav-container');
        if (nav) {
            const opacity = Math.min(scrolled / 100, 0.95);
            nav.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            
            if (document.documentElement.classList.contains('dark')) {
                nav.style.backgroundColor = `rgba(15, 23, 42, ${opacity})`;
            }
        }
    }
    
    updateActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === this.currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    updateScrollToTopButton() {
        const scrollTopBtn = document.getElementById('scroll-to-top');
        if (scrollTopBtn) {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    }
    
    handleNavigation(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                this.closeMobileMenu();
            }
        }
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (this.validateForm(data)) {
            this.submitForm(data, form);
        }
    }
    
    validateForm(data) {
        let isValid = true;
        const errors = {};
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Nome deve ter pelo menos 2 caracteres';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Email inválido';
            isValid = false;
        }
        
        // Subject validation
        if (!data.subject || data.subject.trim().length < 5) {
            errors.subject = 'Assunto deve ter pelo menos 5 caracteres';
            isValid = false;
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
            isValid = false;
        }
        
        // Display errors
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) {
                errorElement.textContent = errors[field];
                errorElement.classList.add('show');
            }
        });
        
        // Clear errors for valid fields
        ['name', 'email', 'subject', 'message'].forEach(field => {
            if (!errors[field]) {
                const errorElement = document.getElementById(`${field}-error`);
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
        
        return isValid;
    }
    
    submitForm(data, form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            // Create mailto link
            const subject = encodeURIComponent(data.subject);
            const body = encodeURIComponent(
                `Nome: ${data.name}\nEmail: ${data.email}\n\nMensagem:\n${data.message}`
            );
            const mailtoLink = `mailto:ademarcandeias@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            form.reset();
            
            // Remove loading state
            submitBtn.classList.remove('loading');
            
            // Show success message
            this.showNotification('Mensagem enviada com sucesso!', 'success');
        }, 1000);
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        
        if (navMenu && mobileToggle) {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        }
    }
    
    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        
        if (navMenu && mobileToggle) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
    
    handleKeyboard(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            this.scrollToTop();
        }
    }
    
    initCustomCursor() {
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');
        
        if (cursor && cursorFollower) {
            // Hide default cursor on interactive elements
            document.querySelectorAll('a, button, [role="button"]').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    cursorFollower.style.transform = 'scale(1.5)';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursorFollower.style.transform = 'scale(1)';
                });
            });
        }
    }
    
    updateCursor(e) {
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');
        
        if (cursor && cursorFollower) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        }
    }
    
    showCursor() {
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');
        
        if (cursor && cursorFollower) {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        }
    }
    
    hideCursor() {
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');
        
        if (cursor && cursorFollower) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    }
    
    addRippleEffect() {
        document.querySelectorAll('.btn, .ripple').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple-effect');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    initMagneticEffect() {
        document.querySelectorAll('.magnetic').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    setupFormValidation() {
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let error = '';
        
        switch (fieldName) {
            case 'name':
                if (value.length < 2) error = 'Nome deve ter pelo menos 2 caracteres';
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) error = 'Email inválido';
                break;
            case 'subject':
                if (value.length < 5) error = 'Assunto deve ter pelo menos 5 caracteres';
                break;
            case 'message':
                if (value.length < 10) error = 'Mensagem deve ter pelo menos 10 caracteres';
                break;
        }
        
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = error;
            errorElement.classList.toggle('show', !!error);
        }
        
        field.classList.toggle('error', !!error);
        return !error;
    }
    
    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        field.classList.remove('error');
    }
    
    setTheme(theme) {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
        
        // Update particles color for dark theme
        if (window.pJSDom && window.pJSDom[0]) {
            const particles = window.pJSDom[0].pJS.particles;
            const color = theme === 'dark' ? '#60a5fa' : '#3b82f6';
            particles.color.value = color;
            particles.line_linked.color = color;
        }
    }
    
    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        this.setTheme(isDark ? 'light' : 'dark');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Utility Methods
    debounce(func, wait) {
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
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Cleanup
    destroy() {
        // Remove event listeners
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
        
        // Disconnect observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        // Clean up GSAP
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.killAll();
        }
        
        // Clean up particles
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
        }
    }
}

// Initialize the application
const portfolioApp = new PortfolioApp();

// Export for potential external use
window.PortfolioApp = PortfolioApp;
window.portfolioApp = portfolioApp;

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

