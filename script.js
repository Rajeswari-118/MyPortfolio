// Typing Effect
const typingText = document.getElementById('typing-text');
const texts = [
    "Full Stack Developer | UI Designer | Innovator",
    "Creating Beautiful Digital Experiences",
    "Turning Ideas into Interactive Reality"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, Math.max(0, charIndex - 1));
        charIndex = Math.max(0, charIndex - 1);
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect after page loads
window.addEventListener('load', () => {
    setTimeout(type, 1000);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = `${width}%`;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    observer.observe(bar);
});

// Header Shadow on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navLinks) {
            navLinks.style.display = 'none';
        }
    });
});

// Simple Visitor Analytics System
class SimpleAnalytics {
    constructor() {
        this.storageKey = 'portfolio_stats';
        this.sessionKey = 'current_session';
        this.stats = this.loadStats();
        this.sessionStart = Date.now();
        this.initAnalytics();
    }

    loadStats() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Ensure onlineUsers is rebuilt as a Set
                parsed.onlineUsers = new Set(parsed.onlineUsers || []);
                return parsed;
            } catch (err) {
                console.warn('Failed to parse stored analytics, initializing new stats.', err);
            }
        }
        
        // Initialize default stats
        return {
            totalVisitors: 0,
            resumeDownloads: 0,
            dailyViews: {},
            onlineUsers: new Set(),
            lastReset: new Date().toDateString()
        };
    }

    saveStats() {
        // Convert Set to Array for storage
        const statsToSave = {
            ...this.stats,
            onlineUsers: Array.from(this.stats.onlineUsers || [])
        };
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(statsToSave));
        } catch (err) {
            console.warn('Could not save analytics to localStorage:', err);
        }
    }

    initAnalytics() {
        this.trackVisit();
        this.setupResumeTracking();
        this.updateOnlineUsers();
        this.startTimers();
        this.displayStats();
    }

    trackVisit() {
        const today = new Date().toDateString();
        const visitorId = this.getVisitorId();
        
        // Track total visitors (only count once per session)
        if (!sessionStorage.getItem('visited')) {
            this.stats.totalVisitors = (this.stats.totalVisitors || 0) + 1;
            sessionStorage.setItem('visited', 'true');
        }
        
        // Track daily views
        this.stats.dailyViews[today] = (this.stats.dailyViews[today] || 0) + 1;
        
        // Track online users
        if (!this.stats.onlineUsers) this.stats.onlineUsers = new Set();
        this.stats.onlineUsers.add(visitorId);
        
        // Clean up old online users (remove this visitor after 5 minutes)
        setTimeout(() => {
            if (this.stats.onlineUsers) {
                this.stats.onlineUsers.delete(visitorId);
                this.saveStats();
                this.displayStats();
            }
        }, 5 * 60 * 1000);
        
        this.saveStats();
    }

    getVisitorId() {
        let visitorId = localStorage.getItem('visitor_id');
        if (!visitorId) {
            visitorId = 'visitor_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('visitor_id', visitorId);
        }
        return visitorId;
    }

    setupResumeTracking() {
        // Use the explicit ID (added in HTML) so it is reliable
        const resumeBtn = document.getElementById('download-resume');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => {
                this.stats.resumeDownloads = (this.stats.resumeDownloads || 0) + 1;
                this.saveStats();
                this.displayStats();
                // DO NOT preventDefault so the browser can download the file
            });
        }
    }

    updateOnlineUsers() {
        // Simulate online users (in real app, this would come from server)
        if (!this.stats.onlineUsers) this.stats.onlineUsers = new Set();
        this.stats.onlineUsers = new Set([
            ...Array.from(this.stats.onlineUsers || []),
            `user_${Date.now()}`,
            `user_${Date.now() + 1}`
        ]);
        
        // Clean up old entries periodically
        setInterval(() => {
            const now = Date.now();
            this.stats.onlineUsers = new Set(
                Array.from(this.stats.onlineUsers).filter(user => {
                    // Keep persistent visitor ids (visitor_xxx) and recent simulated user_ timestamps
                    if (!user.startsWith('user_')) return true;
                    const ts = parseInt(user.split('_')[1], 10) || 0;
                    return (now - ts) < 300000; // 5 minutes
                })
            );
            this.saveStats();
            this.displayStats();
        }, 60000);
    }

    startTimers() {
        // Update current time (if element exists)
        const currentTimeEl = document.getElementById('current-time');
        if (currentTimeEl) {
            setInterval(() => {
                const now = new Date();
                currentTimeEl.textContent = now.toLocaleTimeString();
            }, 1000);
        }

        // Update visit duration
        setInterval(() => {
            const duration = Math.floor((Date.now() - this.sessionStart) / 1000);
            const el = document.getElementById('visit-duration');
            if (el) el.textContent = duration + 's';
        }, 1000);

        // Update page views for this session
        let sessionViews = 1;
        const pageViewsEl = document.getElementById('page-views');
        if (pageViewsEl) pageViewsEl.textContent = sessionViews;

        // Track page changes
        let lastHash = window.location.hash;
        setInterval(() => {
            if (window.location.hash !== lastHash) {
                sessionViews++;
                if (pageViewsEl) pageViewsEl.textContent = sessionViews;
                lastHash = window.location.hash;
            }
        }, 500);
    }

    displayStats() {
        // Update total visitors
        const totalEl = document.getElementById('total-visitors');
        if (totalEl) totalEl.textContent = (this.stats.totalVisitors || 0).toLocaleString();

        // Update online users (show actual count + simulated)
        const onlineEl = document.getElementById('online-users');
        const onlineCount = (this.stats.onlineUsers && this.stats.onlineUsers.size) ? this.stats.onlineUsers.size : 1;
        if (onlineEl) onlineEl.textContent = onlineCount > 0 ? onlineCount : '1';

        // Update resume downloads
        const resumeEl = document.getElementById('resume-downloads');
        if (resumeEl) resumeEl.textContent = (this.stats.resumeDownloads || 0).toLocaleString();

        // Update today's views
        const today = new Date().toDateString();
        const todayViews = this.stats.dailyViews ? (this.stats.dailyViews[today] || 0) : 0;
        const todayEl = document.getElementById('today-views');
        if (todayEl) todayEl.textContent = todayViews.toLocaleString();
    }

    // Simulate visitor increase (for demo purposes)
    simulateVisitorIncrease() {
        setInterval(() => {
            if (Math.random() > 0.8) { // 20% chance every interval
                this.stats.totalVisitors = (this.stats.totalVisitors || 0) + 1;
                this.saveStats();
                this.displayStats();
            }
        }, 30000); // Every 30 seconds
    }
}

// Initialize analytics when page loads
document.addEventListener('DOMContentLoaded', function() {
    const analytics = new SimpleAnalytics();
    
    // Simulate some visitor activity for demo
    analytics.simulateVisitorIncrease();
    
    // Add online indicator to the online users counter
    const onlineUsersElement = document.getElementById('online-users');
    if (onlineUsersElement) {
        const indicator = document.createElement('span');
        indicator.className = 'online-indicator';
        onlineUsersElement.parentNode.insertBefore(indicator, onlineUsersElement);
    }
});

// Track when user leaves the page
window.addEventListener('beforeunload', function() {
    // In a real application, you'd send a signal to the server
    // that the user is leaving to update online count
    console.log('User is leaving the page');
});

// Track when user comes back to the page
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // User came back to the page
        console.log('User returned to the page');
    }
});
