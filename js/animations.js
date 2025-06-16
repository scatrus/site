// Advanced Animations Controller
// Handles complex animations and transitions

class AnimationController {
    constructor() {
        this.animations = new Map();
        this.timeline = null;
        this.isGSAPAvailable = typeof gsap !== 'undefined';
        
        this.init();
    }
    
    init() {
        if (this.isGSAPAvailable) {
            this.setupGSAPAnimations();
        }
        this.setupCSSAnimations();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
    }
    
    setupGSAPAnimations() {
        // Master timeline
        this.timeline = gsap.timeline();
        
        // Hero entrance animation
        this.createHeroAnimation();
        
        // Section reveal animations
        this.createSectionAnimations();
        
        // Project cards animation
        this.createProjectsAnimation();
        
        // Skills animation
        this.createSkillsAnimation();
        
        // Floating elements
        this.createFloatingAnimations();
        
        // Parallax effects
        this.createParallaxEffects();
    }
    
    createHeroAnimation() {
        const tl = gsap.timeline({ delay: 1 });
        
        tl.from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-buttons .btn', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-avatar', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.8');
        
        this.animations.set('hero', tl);
    }
    
    createSectionAnimations() {
        // About section
        gsap.from('.about-content > *', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Stats animation
        gsap.from('.stat-item', {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.about-stats',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Contact section
        gsap.from('.contact-content > *', {
            x: (index) => index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }
    
    createProjectsAnimation() {
        // Project cards entrance
        gsap.from('.project-card', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Project card hover animations
        document.querySelectorAll('.project-card').forEach(card => {
            const overlay = card.querySelector('.project-overlay');
            const image = card.querySelector('.project-image');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(image, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    createSkillsAnimation() {
        // Skills categories entrance
        gsap.from('.skill-category', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Progress bars animation
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            
            gsap.fromTo(bar, {
                width: '0%'
            }, {
                width: progress + '%',
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
    
    createFloatingAnimations() {
        // Hero avatar floating
        gsap.to('.hero-avatar', {
            y: -20,
            duration: 3,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true
        });
        
        // Floating icons
        document.querySelectorAll('.section-icon').forEach((icon, index) => {
            gsap.to(icon, {
                y: -10,
                duration: 2 + (index * 0.2),
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
                delay: index * 0.3
            });
        });
        
        // Floating particles effect
        this.createFloatingParticles();
    }
    
    createFloatingParticles() {
        const particleCount = 20;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
            `;
            
            document.body.appendChild(particle);
            particles.push(particle);
            
            // Random initial position
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5
            });
            
            // Floating animation
            gsap.to(particle, {
                y: '-=100',
                duration: Math.random() * 10 + 10,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    y: (y) => {
                        return parseFloat(y) < -100 ? window.innerHeight + 100 : y;
                    }
                }
            });
            
            // Horizontal drift
            gsap.to(particle, {
                x: '+=50',
                duration: Math.random() * 5 + 5,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });
        }
    }
    
    createParallaxEffects() {
        // Hero parallax
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
        
        // Section backgrounds parallax
        document.querySelectorAll('.section').forEach((section, index) => {
            if (index % 2 === 0) {
                gsap.to(section, {
                    yPercent: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        });
    }
    
    setupCSSAnimations() {
        // Intersection Observer for CSS animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animation || 'fadeInUp';
                    const delay = element.dataset.delay || 0;
                    
                    setTimeout(() => {
                        element.classList.add(`animate-${animationType}`);
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements with data-animation attribute
        document.querySelectorAll('[data-animation]').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupScrollAnimations() {
        // Scroll-triggered animations
        const scrollElements = document.querySelectorAll('.scroll-reveal');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1
        });
        
        scrollElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }
    
    setupHoverAnimations() {
        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (this.isGSAPAvailable) {
                    gsap.to(btn, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                if (this.isGSAPAvailable) {
                    gsap.to(btn, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
        
        // Card hover effects
        document.querySelectorAll('.hover-lift').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (this.isGSAPAvailable) {
                    gsap.to(card, {
                        y: -10,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (this.isGSAPAvailable) {
                    gsap.to(card, {
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
    
    // Page transition animations
    animatePageTransition(direction = 'in') {
        const tl = gsap.timeline();
        
        if (direction === 'out') {
            tl.to('main', {
                opacity: 0,
                y: -50,
                duration: 0.5,
                ease: 'power2.in'
            });
        } else {
            tl.from('main', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
        
        return tl;
    }
    
    // Text reveal animation
    animateTextReveal(element, options = {}) {
        const defaults = {
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out'
        };
        
        const settings = { ...defaults, ...options };
        
        // Split text into spans
        const text = element.textContent;
        element.innerHTML = text.split('').map(char => 
            `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        // Animate each character
        gsap.from(element.children, {
            y: 50,
            opacity: 0,
            duration: settings.duration,
            stagger: settings.stagger,
            ease: settings.ease
        });
    }
    
    // Morphing animation
    animateMorph(element, targetShape) {
        const shapes = {
            circle: '50%',
            square: '0%',
            rounded: '20%'
        };
        
        gsap.to(element, {
            borderRadius: shapes[targetShape] || targetShape,
            duration: 0.5,
            ease: 'power2.inOut'
        });
    }
    
    // Loading animation
    createLoadingAnimation() {
        const tl = gsap.timeline({ repeat: -1 });
        
        tl.to('.loading-spinner', {
            rotation: 360,
            duration: 1,
            ease: 'none'
        });
        
        return tl;
    }
    
    // Success animation
    animateSuccess(element) {
        const tl = gsap.timeline();
        
        tl.to(element, {
            scale: 1.2,
            duration: 0.2,
            ease: 'power2.out'
        })
        .to(element, {
            scale: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
        });
        
        return tl;
    }
    
    // Error animation
    animateError(element) {
        const tl = gsap.timeline();
        
        tl.to(element, {
            x: -10,
            duration: 0.1,
            ease: 'power2.out'
        })
        .to(element, {
            x: 10,
            duration: 0.1,
            ease: 'power2.out'
        })
        .to(element, {
            x: -5,
            duration: 0.1,
            ease: 'power2.out'
        })
        .to(element, {
            x: 0,
            duration: 0.1,
            ease: 'power2.out'
        });
        
        return tl;
    }
    
    // Cleanup
    destroy() {
        if (this.timeline) {
            this.timeline.kill();
        }
        
        this.animations.forEach(animation => {
            animation.kill();
        });
        
        this.animations.clear();
        
        // Remove floating particles
        document.querySelectorAll('.floating-particle').forEach(particle => {
            particle.remove();
        });
    }
}

// Initialize animation controller
const animationController = new AnimationController();

// Export for external use
window.AnimationController = AnimationController;
window.animationController = animationController;

