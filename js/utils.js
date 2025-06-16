// Utility Functions and Helpers
// Collection of useful functions for the portfolio

class Utils {
    constructor() {
        this.debounceTimers = new Map();
        this.throttleTimers = new Map();
    }
    
    // Debounce function
    debounce(func, delay, key = 'default') {
        return (...args) => {
            if (this.debounceTimers.has(key)) {
                clearTimeout(this.debounceTimers.get(key));
            }
            
            const timer = setTimeout(() => {
                func.apply(this, args);
                this.debounceTimers.delete(key);
            }, delay);
            
            this.debounceTimers.set(key, timer);
        };
    }
    
    // Throttle function
    throttle(func, limit, key = 'default') {
        return (...args) => {
            if (!this.throttleTimers.has(key)) {
                func.apply(this, args);
                this.throttleTimers.set(key, true);
                
                setTimeout(() => {
                    this.throttleTimers.delete(key);
                }, limit);
            }
        };
    }
    
    // Check if element is in viewport
    isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -threshold &&
            rect.left >= -threshold &&
            rect.bottom <= windowHeight + threshold &&
            rect.right <= windowWidth + threshold
        );
    }
    
    // Get element offset from top of document
    getOffset(element) {
        let offsetTop = 0;
        let offsetLeft = 0;
        
        while (element) {
            offsetTop += element.offsetTop;
            offsetLeft += element.offsetLeft;
            element = element.offsetParent;
        }
        
        return { top: offsetTop, left: offsetLeft };
    }
    
    // Smooth scroll to element
    scrollToElement(element, offset = 0, duration = 800) {
        const targetPosition = this.getOffset(element).top - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    // Easing function for smooth animations
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    // Generate unique ID
    generateId(prefix = 'id') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Format date
    formatDate(date, format = 'dd/mm/yyyy') {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        const formats = {
            'dd/mm/yyyy': `${day}/${month}/${year}`,
            'mm/dd/yyyy': `${month}/${day}/${year}`,
            'yyyy-mm-dd': `${year}-${month}-${day}`,
            'dd-mm-yyyy': `${day}-${month}-${year}`
        };
        
        return formats[format] || formats['dd/mm/yyyy'];
    }
    
    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validate phone number (Brazilian format)
    isValidPhone(phone) {
        const phoneRegex = /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
        return phoneRegex.test(phone);
    }
    
    // Sanitize HTML
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
    
    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (err) {
                textArea.remove();
                return false;
            }
        }
    }
    
    // Get device info
    getDeviceInfo() {
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);
        const isDesktop = !isMobile && !isTablet;
        
        return {
            isMobile,
            isTablet,
            isDesktop,
            userAgent,
            platform: navigator.platform,
            language: navigator.language
        };
    }
    
    // Get browser info
    getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browserName = 'Unknown';
        let browserVersion = 'Unknown';
        
        if (userAgent.indexOf('Chrome') > -1) {
            browserName = 'Chrome';
            browserVersion = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
        } else if (userAgent.indexOf('Firefox') > -1) {
            browserName = 'Firefox';
            browserVersion = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
        } else if (userAgent.indexOf('Safari') > -1) {
            browserName = 'Safari';
            browserVersion = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
        } else if (userAgent.indexOf('Edge') > -1) {
            browserName = 'Edge';
            browserVersion = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
        }
        
        return {
            name: browserName,
            version: browserVersion,
            userAgent
        };
    }
    
    // Check if browser supports feature
    supportsFeature(feature) {
        const features = {
            webp: () => {
                const canvas = document.createElement('canvas');
                return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
            },
            webgl: () => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
                } catch (e) {
                    return false;
                }
            },
            localStorage: () => {
                try {
                    localStorage.setItem('test', 'test');
                    localStorage.removeItem('test');
                    return true;
                } catch (e) {
                    return false;
                }
            },
            serviceWorker: () => 'serviceWorker' in navigator,
            intersectionObserver: () => 'IntersectionObserver' in window,
            customProperties: () => window.CSS && CSS.supports('color', 'var(--fake-var)')
        };
        
        return features[feature] ? features[feature]() : false;
    }
    
    // Load script dynamically
    loadScript(src, async = true) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = async;
            
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            
            document.head.appendChild(script);
        });
    }
    
    // Load CSS dynamically
    loadCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            
            link.onload = () => resolve(link);
            link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
            
            document.head.appendChild(link);
        });
    }
    
    // Preload image
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    }
    
    // Preload multiple images
    preloadImages(sources) {
        return Promise.all(sources.map(src => this.preloadImage(src)));
    }
    
    // Get random number between min and max
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Get random item from array
    randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Shuffle array
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // Deep clone object
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }
    
    // Merge objects deeply
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(result[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }
    
    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Format number with thousands separator
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    // Calculate reading time
    calculateReadingTime(text, wordsPerMinute = 200) {
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    }
    
    // Get contrast color (black or white) for given background color
    getContrastColor(hexColor) {
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#ffffff';
    }
    
    // Convert hex to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    // Convert RGB to hex
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
    
    // Create notification
    createNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${this.sanitizeHTML(message)}</span>
                <button class="notification-close" aria-label="Fechar notificação">×</button>
            </div>
        `;
        
        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    padding: 16px;
                    max-width: 400px;
                    z-index: 10000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification-info {
                    border-left: 4px solid #3b82f6;
                }
                
                .notification-success {
                    border-left: 4px solid #10b981;
                }
                
                .notification-warning {
                    border-left: 4px solid #f59e0b;
                }
                
                .notification-error {
                    border-left: 4px solid #ef4444;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                
                .notification-message {
                    flex: 1;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: #6b7280;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .notification-close:hover {
                    color: #374151;
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, duration);
        
        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });
        
        return notification;
    }
    
    // Remove notification
    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Performance monitoring
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`${name} took ${end - start} milliseconds`);
        return result;
    }
    
    // Cleanup
    destroy() {
        // Clear all timers
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.throttleTimers.clear();
        this.debounceTimers.clear();
    }
}

// Performance observer for monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.init();
    }
    
    init() {
        if ('PerformanceObserver' in window) {
            this.observeNavigationTiming();
            this.observePaintTiming();
            this.observeResourceTiming();
        }
    }
    
    observeNavigationTiming() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.metrics.set('navigation', {
                    domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
                    loadComplete: entry.loadEventEnd - entry.loadEventStart,
                    totalTime: entry.loadEventEnd - entry.navigationStart
                });
            }
        });
        
        observer.observe({ entryTypes: ['navigation'] });
    }
    
    observePaintTiming() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.metrics.set(entry.name, entry.startTime);
            }
        });
        
        observer.observe({ entryTypes: ['paint'] });
    }
    
    observeResourceTiming() {
        const observer = new PerformanceObserver((list) => {
            const resources = [];
            for (const entry of list.getEntries()) {
                resources.push({
                    name: entry.name,
                    duration: entry.duration,
                    size: entry.transferSize
                });
            }
            this.metrics.set('resources', resources);
        });
        
        observer.observe({ entryTypes: ['resource'] });
    }
    
    getMetrics() {
        return Object.fromEntries(this.metrics);
    }
    
    logMetrics() {
        console.table(this.getMetrics());
    }
}

// Initialize utilities
const utils = new Utils();
const performanceMonitor = new PerformanceMonitor();

// Export for external use
window.Utils = Utils;
window.utils = utils;
window.PerformanceMonitor = PerformanceMonitor;
window.performanceMonitor = performanceMonitor;

// Log performance metrics after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('Performance Metrics:');
        performanceMonitor.logMetrics();
    }, 1000);
});

