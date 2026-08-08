/* ==========================================================================
   Royal Aura Events — JavaScript Engine
   Mobile Navigation, Service Filters, FAQ Accordion, WhatsApp Form & Fireworks
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Hamburger Menu Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Services Category Filter Tabs
    const tabButtons = document.querySelectorAll('.service-tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => {
                b.classList.remove('active', 'bg-gold-500', 'text-black');
                b.classList.add('bg-dark-800', 'text-slate-300');
            });
            btn.classList.add('active', 'bg-gold-500', 'text-black');
            btn.classList.remove('bg-dark-800', 'text-slate-300');

            const filter = btn.getAttribute('data-filter');

            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. FAQ Accordion Open/Close Animation
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('i');

        if (toggle && content && icon) {
            toggle.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');
                faqItems.forEach(i => {
                    i.querySelector('.faq-content').classList.add('hidden');
                    i.querySelector('i').style.transform = 'rotate(0deg)';
                });
                if (!isOpen) {
                    content.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // 4. Instant WhatsApp Inquiry Form Handler (Mobile & Desktop Safe)
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const date = document.getElementById('form-date').value;
            const location = document.getElementById('form-location').value;
            const message = document.getElementById('form-message').value.trim();

            const selectedServices = [];
            document.querySelectorAll('.service-checkbox:checked').forEach(cb => {
                selectedServices.push(cb.value);
            });

            const servicesStr = selectedServices.length > 0 ? selectedServices.join(', ') : 'General Inquiry';

            let waText = `*New Royal Booking Request*%0A%0A`;
            waText += `*Name:* ${encodeURIComponent(name)}%0A`;
            waText += `*Phone:* ${encodeURIComponent(phone)}%0A`;
            waText += `*Event Date:* ${encodeURIComponent(date)}%0A`;
            waText += `*Location:* ${encodeURIComponent(location)}%0A`;
            waText += `*Selected Services:* ${encodeURIComponent(servicesStr)}%0A`;
            if (message) {
                waText += `*Details:* ${encodeURIComponent(message)}%0A`;
            }
            waText += `%0A_Sent via Royal Aura Events website_`;

            const waUrl = `https://wa.me/917020729676?text=${waText}`;

            // Check if user is on mobile phone or desktop
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                window.location.href = waUrl;
            } else {
                window.open(waUrl, '_blank');
            }
        });
    }

    // ================= 5. LIVE GOLD FIREWORKS & SPARKLER CANVAS =================
    const canvas = document.getElementById('fireworks-canvas');
    if (canvas && canvas.parentElement) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        window.addEventListener('resize', () => {
            if (canvas.parentElement) {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
            }
        });

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.radius = Math.random() * 2.5 + 1;
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 1.5;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.alpha = 1;
                this.decay = Math.random() * 0.02 + 0.015;
                this.gravity = 0.06;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += this.gravity;
                this.alpha -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.restore();
            }
        }

        let particles = [];
        const goldColors = ['#FFD700', '#D4AF37', '#FFF5D0', '#E5A93C', '#FFA500'];

        function createFirework(x, y) {
            const count = 35;
            for (let i = 0; i < count; i++) {
                const color = goldColors[Math.floor(Math.random() * goldColors.length)];
                particles.push(new Particle(x, y, color));
            }
        }

        // Periodic random background fireworks launch
        setInterval(() => {
            if (Math.random() < 0.7) {
                const rx = Math.random() * (width * 0.8) + (width * 0.1);
                const ry = Math.random() * (height * 0.5) + (height * 0.1);
                createFirework(rx, ry);
            }
        }, 1400);

        // Click on Home section to launch fireworks
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.addEventListener('click', (e) => {
                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                createFirework(x, y);
                createFirework(x + (Math.random() * 40 - 20), y + (Math.random() * 40 - 20));
            });
        }

        // Fireworks action button trigger
        const triggerBtn = document.getElementById('trigger-fireworks-btn');
        if (triggerBtn) {
            triggerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createFirework(Math.random() * width, Math.random() * (height * 0.6));
                    }, i * 150);
                }
            });
        }

        function loop() {
            ctx.clearRect(0, 0, width, height);
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                }
            }
            requestAnimationFrame(loop);
        }
        loop();
    }

});
