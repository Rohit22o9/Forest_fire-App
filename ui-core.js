document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen
    const splash = document.getElementById('splash-screen');
    if (splash) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                splash.style.opacity = '0';
                splash.style.visibility = 'hidden';
                setTimeout(() => splash.remove(), 600);
            }, 800);
        });
        // Fallback for long loads
        setTimeout(() => { if(splash) splash.remove(); }, 5000);
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-init-animate]').forEach(el => {
        el.classList.add('data-animate');
        observer.observe(el);
    });

    // Mobile Sidebar Toggle
    window.toggleSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.toggle('active');
    };

    // Close sidebar on click outside (mobile)
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !e.target.closest('.mobile-menu-toggle')) {
            sidebar.classList.remove('active');
        }
    });

    // Global Tab Switcher
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const container = trigger.closest('.main-content') || document.body;
            const targetId = trigger.getAttribute('data-tab');
            
            // Siblings of trigger
            const parent = trigger.parentElement;
            parent.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
            trigger.classList.add('active');

            // Find matching content
            document.querySelectorAll('.tab-content').forEach(content => {
                if (content.id === targetId) {
                    content.classList.add('active');
                } else {
                    const group = trigger.closest('.tab-container')?.getAttribute('data-tab-group');
                    // If tabs are grouped, only hide within group
                    if (group) {
                         // group logic can be added here if needed
                    } else {
                        content.classList.remove('active');
                    }
                }
            });

            // Trigger window resize for Leaflet/Charts
            window.dispatchEvent(new Event('resize'));
        });
    });

    // Active Navigation Highlighting
    const updateActiveNav = () => {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link, .bottom-nav-link').forEach(link => {
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    updateActiveNav();

    // Global Toast Notifier
    window.notify = (msg, type = 'info') => {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icon = type === 'error' ? 'circle-exclamation' : type === 'success' ? 'circle-check' : 'circle-info';
        
        toast.innerHTML = `
            <div class="toast-content" style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${icon}"></i>
                <span>${msg}</span>
            </div>
        `;
        
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    };

    // System Status Updates
    setInterval(() => {
        const updateSpan = document.getElementById('header-update-time');
        if (updateSpan) {
            // Simulated logic
            updateSpan.innerText = 'Live';
        }
    }, 30000);
});
