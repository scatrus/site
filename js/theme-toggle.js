// Theme Toggle System
// Handles dark/light mode switching with smooth transitions

class ThemeController {
    constructor() {
        this.currentTheme = 'light';
        this.systemPreference = 'light';
        this.transitionDuration = 300;
        this.storageKey = 'portfolio-theme';
        
        this.init();
    }
    
    init() {
        this.detectSystemPreference();
        this.loadSavedTheme();
        this.setupEventListeners();
        this.setupTransitions();
        this.updateThemeElements();
    }
    
    detectSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.systemPreference = 'dark';
        } else {
            this.systemPreference = 'light';
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                this.systemPreference = e.matches ? 'dark' : 'light';
                
                // Auto-switch if user hasn't manually set a preference
                const savedTheme = localStorage.getItem(this.storageKey);
                if (!savedTheme || savedTheme === 'auto') {
                    this.setTheme(this.systemPreference, false);
                }
            });
        }
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.storageKey);
        
        if (savedTheme && savedTheme !== 'auto') {
            this.currentTheme = savedTheme;
        } else {
            this.currentTheme = this.systemPreference;
        }
        
        this.applyTheme(this.currentTheme, false);
    }
    
    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        // Double-click on logo to toggle theme
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('dblclick', () => this.toggleTheme());
        }
    }
    
    setupTransitions() {
        // Add transition styles for smooth theme switching
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: 
                    background-color ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
                    border-color ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
                    color ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
                    box-shadow ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
                    fill ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
                    stroke ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .theme-transition-disable * {
                transition: none !important;
            }
            
            .theme-toggle {
                position: relative;
                overflow: hidden;
            }
            
            .theme-toggle::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.5s ease;
            }
            
            .theme-toggle:hover::before {
                left: 100%;
            }
            
            .theme-icon {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .sun-icon {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }
            
            .moon-icon {
                opacity: 0;
                transform: rotate(180deg) scale(0.8);
            }
            
            .dark .sun-icon {
                opacity: 0;
                transform: rotate(180deg) scale(0.8);
            }
            
            .dark .moon-icon {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }
            
            @media (prefers-reduced-motion: reduce) {
                * {
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    setTheme(theme, animate = true) {
        if (theme === this.currentTheme) return;
        
        this.currentTheme = theme;
        this.applyTheme(theme, animate);
        this.saveTheme(theme);
        this.updateThemeElements();
        this.triggerThemeChangeEvent();
    }
    
    applyTheme(theme, animate = true) {
        const html = document.documentElement;
        
        if (!animate) {
            html.classList.add('theme-transition-disable');
        }
        
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        
        // Update meta theme-color
        this.updateMetaThemeColor(theme);
        
        // Update particles color if available
        this.updateParticlesColor(theme);
        
        // Update charts color if available
        this.updateChartsColor(theme);
        
        if (!animate) {
            // Force reflow
            html.offsetHeight;
            html.classList.remove('theme-transition-disable');
        }
    }
    
    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        const colors = {
            light: '#ffffff',
            dark: '#0f172a'
        };
        
        metaThemeColor.content = colors[theme];
    }
    
    updateParticlesColor(theme) {
        if (window.pJSDom && window.pJSDom[0]) {
            const particles = window.pJSDom[0].pJS.particles;
            const colors = {
                light: '#3b82f6',
                dark: '#60a5fa'
            };
            
            particles.color.value = colors[theme];
            particles.line_linked.color = colors[theme];
            
            // Refresh particles
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
    
    updateChartsColor(theme) {
        // Update any charts or data visualizations
        const charts = document.querySelectorAll('.chart, .graph');
        charts.forEach(chart => {
            chart.setAttribute('data-theme', theme);
        });
    }
    
    updateThemeElements() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 
                this.currentTheme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
            );
            themeToggle.setAttribute('title', 
                this.currentTheme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
            );
        }
        
        // Update any theme-dependent elements
        this.updateThemeSpecificElements();
    }
    
    updateThemeSpecificElements() {
        // Update images that have theme variants
        const themeImages = document.querySelectorAll('[data-light-src], [data-dark-src]');
        themeImages.forEach(img => {
            const lightSrc = img.getAttribute('data-light-src');
            const darkSrc = img.getAttribute('data-dark-src');
            
            if (this.currentTheme === 'dark' && darkSrc) {
                img.src = darkSrc;
            } else if (this.currentTheme === 'light' && lightSrc) {
                img.src = lightSrc;
            }
        });
        
        // Update theme-dependent text content
        const themeTexts = document.querySelectorAll('[data-light-text], [data-dark-text]');
        themeTexts.forEach(element => {
            const lightText = element.getAttribute('data-light-text');
            const darkText = element.getAttribute('data-dark-text');
            
            if (this.currentTheme === 'dark' && darkText) {
                element.textContent = darkText;
            } else if (this.currentTheme === 'light' && lightText) {
                element.textContent = lightText;
            }
        });
    }
    
    saveTheme(theme) {
        localStorage.setItem(this.storageKey, theme);
    }
    
    triggerThemeChangeEvent() {
        const event = new CustomEvent('themechange', {
            detail: {
                theme: this.currentTheme,
                previousTheme: this.currentTheme === 'light' ? 'dark' : 'light'
            }
        });
        
        document.dispatchEvent(event);
    }
    
    // Animation for theme toggle button
    animateThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        // Add click animation
        themeToggle.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        // Add ripple effect
        this.createRippleEffect(themeToggle);
    }
    
    createRippleEffect(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${rect.width / 2 - size / 2}px;
            top: ${rect.height / 2 - size / 2}px;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Theme-aware color utilities
    getThemeColor(colorName) {
        const colors = {
            light: {
                primary: '#3b82f6',
                secondary: '#8b5cf6',
                accent: '#06b6d4',
                background: '#ffffff',
                surface: '#f8fafc',
                text: '#1f2937',
                textSecondary: '#6b7280',
                border: '#e5e7eb'
            },
            dark: {
                primary: '#60a5fa',
                secondary: '#a78bfa',
                accent: '#22d3ee',
                background: '#0f172a',
                surface: '#1e293b',
                text: '#f1f5f9',
                textSecondary: '#cbd5e1',
                border: '#475569'
            }
        };
        
        return colors[this.currentTheme][colorName] || colors.light[colorName];
    }
    
    // Check if current theme is dark
    isDark() {
        return this.currentTheme === 'dark';
    }
    
    // Check if current theme is light
    isLight() {
        return this.currentTheme === 'light';
    }
    
    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    // Set theme to auto (follow system preference)
    setAutoTheme() {
        this.setTheme(this.systemPreference);
        localStorage.setItem(this.storageKey, 'auto');
    }
    
    // Theme-aware media query
    matchesTheme(theme) {
        return this.currentTheme === theme;
    }
    
    // Add theme change listener
    onThemeChange(callback) {
        document.addEventListener('themechange', callback);
    }
    
    // Remove theme change listener
    offThemeChange(callback) {
        document.removeEventListener('themechange', callback);
    }
    
    // Cleanup
    destroy() {
        // Remove event listeners
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.removeEventListener('click', this.toggleTheme);
        }
        
        // Remove system preference listener
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.handleSystemThemeChange);
        }
    }
}

// Initialize theme controller
const themeController = new ThemeController();

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Export for external use
window.ThemeController = ThemeController;
window.themeController = themeController;

// Listen for theme changes and update animations accordingly
document.addEventListener('themechange', (e) => {
    console.log(`Theme changed to: ${e.detail.theme}`);
    
    // Update any theme-dependent animations
    if (window.animationController) {
        window.animationController.updateThemeAnimations?.(e.detail.theme);
    }
});

