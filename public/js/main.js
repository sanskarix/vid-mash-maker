/**
 * Dosa Craft - Main JavaScript
 * Handles Lenis smooth scrolling, GSAP animations, mobile navigation, and menu filters.
 */

class SiteAnimations {
    constructor() {
        this.initLenis();
        this.initGSAP();
        this.initFrameAnimation();
        this.initMobileNav();
        this.initScrollHeader();
        this.initMenuFilter();
        this.initContactOutlets();
    }

    /**
     * Initialize Lenis for smooth scrolling
     */
    initLenis() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Sync GSAP ScrollTrigger with Lenis
        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Handle smooth scroll for anchor links
        document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    this.lenis.scrollTo(targetId, {
                        offset: -100 // adjust for header
                    });
                }
            });
        });
    }

    /**
     * Initialize GSAP and ScrollTrigger animations
     */
    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Initial Hero Load Animation (Curtain Loader + Staggered Text Reveal)
        const pageLoader = document.getElementById('page-loader');
        const loaderBar = document.getElementById('loader-bar');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        const dosaVector = document.getElementById('dosa-vector');
        const floaters = document.querySelectorAll('.floating-decor');

        const hasLoadedBefore = sessionStorage.getItem('dc_loaded');

        if (!hasLoadedBefore && loaderBar && pageLoader) {
            // First visit in this browser session — show the full loader
            sessionStorage.setItem('dc_loaded', '1');
            document.body.style.overflow = 'hidden';

            const initTl = gsap.timeline({
                defaults: { ease: "power4.out" },
                onComplete: () => {
                    document.body.style.overflow = '';
                }
            });

            // 1a. Loader Progress Bar
            initTl.to(loaderBar, { width: '100%', duration: 1, ease: "power2.inOut" })
                .to(pageLoader, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut"
                }, "+=0.2");

            // 1b. Reveal Hero Elements
            const heroElements = [heroTitle, heroSubtitle, heroCta].filter(Boolean);
            if (heroElements.length > 0) {
                initTl.to(heroElements, {
                    y: 0, opacity: 1, duration: 1.2, stagger: 0.15,
                }, "-=0.5");
            }
            if (dosaVector) {
                initTl.fromTo(dosaVector,
                    { y: 150, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.2)" },
                    "-=1.2"
                );
            }
            if (floaters.length > 0) {
                initTl.to(floaters, {
                    opacity: 1, y: -20, duration: 1, stagger: 0.2, ease: "power2.out"
                }, "-=1");
            }
        } else {
            // Subsequent visits — instantly hide loader and show hero
            if (pageLoader) pageLoader.style.display = 'none';
            document.body.style.overflow = '';

            const heroElements = [heroTitle, heroSubtitle, heroCta].filter(Boolean);
            gsap.set(heroElements, { y: 0, opacity: 1 });
            if (dosaVector) gsap.set(dosaVector, { y: 0, opacity: 1, scale: 1 });
            if (floaters.length > 0) gsap.set(floaters, { opacity: 1, y: -20 });
        }

        const parallaxElements = document.querySelectorAll('.gs-parallax');
        const pinnedWrapper = document.querySelector('.hero-pinned-wrapper');

        if (pinnedWrapper) {
            // Loop through each element and apply a vertical parallax based on its data-speed attribute
            parallaxElements.forEach((el) => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;

                gsap.to(el, {
                    y: () => -1 * window.innerHeight * speed, // using viewport height for predictable scrub distance
                    ease: "none",
                    scrollTrigger: {
                        trigger: pinnedWrapper,
                        start: "top top",
                        end: "+=400%", // Match the duration of the sticky wrapper
                        scrub: 1.5, // Super smooth scrubbing
                        invalidateOnRefresh: true
                    }
                });
            });
        }

        // 2. Fade Up Elements on Scroll
        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach((el) => {
            gsap.fromTo(el,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Trigger when element is 85% down the viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();
    }

    /**
     * Initialize Scroll-driven Frame Animation on Canvas
     */
    initFrameAnimation() {
        const canvas = document.getElementById('dosa-canvas');
        if (!canvas) return;

        const context = canvas.getContext('2d', { alpha: false }); // alpha: false for slight optimization since BG is solid
        const frameCount = 150;
        const currentFrame = index => (`./assets/images/scroller/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`);

        const images = [];
        const dosaFrameObj = { frame: 0 };
        let renderRequested = false;

        // --- Render Function ---
        const render = () => {
            renderRequested = false;
            // Clear canvas completely
            context.clearRect(0, 0, canvas.width, canvas.height);

            const img = images[dosaFrameObj.frame];
            if (img && img.complete) {
                // We want to "contain" the image so it doesn't get cut
                // We also scale it down a bit to make it "smaller" as requested
                const scaleFactor = 0.85;
                const canvasW = canvas.width;
                const canvasH = canvas.height;

                let drawW = img.width;
                let drawH = img.height;

                // Calculate contain scale
                const scale = Math.min(canvasW / drawW, canvasH / drawH) * scaleFactor;

                drawW *= scale;
                drawH *= scale;

                const x = (canvasW - drawW) / 2;
                const y = (canvasH - drawH) / 2;

                context.drawImage(img, x, y, drawW, drawH);
            }
        };

        const scheduleRender = () => {
            if (!renderRequested) {
                renderRequested = true;
                requestAnimationFrame(render);
            }
        };

        // --- Canvas Sizing with HiDPI support ---
        const resizeCanvas = () => {
            const wrapper = document.getElementById('hero-frame-wrapper');
            if (!wrapper) return;

            const rect = wrapper.getBoundingClientRect();
            // We use devicePixelRatio for sharp rendering on retina displays
            const dpr = window.devicePixelRatio || 1;

            // Set actual internal dimensions
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Set CSS dimensions
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            // Normalize coordinate system to use css pixels
            // context.scale(dpr, dpr);  <-- Removed because our drawImageProp relies on full pixel dimensions

            scheduleRender();
            ScrollTrigger.refresh();
        };

        // --- Preload frames & Init ---
        let loadedCount = 0;
        let firstFrameLoaded = false;

        const onFirstFrameLoaded = () => {
            if (firstFrameLoaded) return;
            firstFrameLoaded = true;
            resizeCanvas(); // Initial setup

            // Force first frame render
            dosaFrameObj.frame = 0;
            setTimeout(() => {
                scheduleRender();
                canvas.classList.add('ready'); // Fade in
            }, 50);
        };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (i === 0) {
                    onFirstFrameLoaded();
                }
                // (Optional) hide a loader or do something when all load
                // if (loadedCount === frameCount) { ... }
            };
            img.onerror = () => {
                console.warn(`Failed to load frame ${i}`);
                loadedCount++; // Avoid breaking the count totally
                if (i === 0) onFirstFrameLoaded(); // Try not to stuck on frame 0 error
            };
            img.src = currentFrame(i);
            images.push(img);
        }

        // Timeout fallback string just in case frame 0 takes too long but others loaded
        setTimeout(() => {
            if (images[0].complete || images[1]?.complete) {
                onFirstFrameLoaded();
            }
        }, 1000);

        // ResizeObserver is more reliable than window.onresize
        const ro = new ResizeObserver(() => {
            requestAnimationFrame(resizeCanvas);
        });
        const domWrapper = document.getElementById('hero-frame-wrapper');
        if (domWrapper) ro.observe(domWrapper);

        // --- GSAP Scroll Interaction ---
        gsap.to(dosaFrameObj, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-pinned-wrapper", // Use wrapper as trigger
                start: "top top",
                end: "+=400%", // Map through the 400vh space (approx 100vh = 1 sec feel)
                scrub: 0.5, // 0.5s smooth catching up
            },
            onUpdate: scheduleRender
        });
    }

    /**
     * Handle header background on scroll
     */
    initScrollHeader() {
        const header = document.querySelector('.header');
        // If it's not the scrolled header natively 
        // (like on inner pages where we use header-scrolled by default)
        if (!header.classList.contains('header-scrolled')) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            });
        }
    }

    /**
     * Initialize Mobile Navigation Burger Menu
     */
    initMobileNav() {
        const burger = document.getElementById('burger-menu');
        const nav = document.getElementById('nav-links');

        if (burger && nav) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');

                // Add staggered fade in for links if needed
                const navLinksItems = nav.querySelectorAll('a');
                navLinksItems.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });
            });

            // Close nav when clicking a link
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                });
            });
        }
    }

    /**
     * Initialize Menu Category Filter
     */
    initMenuFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const menuCategories = document.querySelectorAll('.menu-category[data-category]');

        if (filterButtons.length === 0 || menuCategories.length === 0) return;

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                menuCategories.forEach(cat => {
                    if (category === 'all' || cat.getAttribute('data-category') === category) {
                        cat.classList.remove('hidden');
                        cat.style.opacity = '0';
                        cat.style.transform = 'translateY(20px)';
                        // Animate in
                        setTimeout(() => {
                            cat.style.opacity = '1';
                            cat.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        cat.classList.add('hidden');
                    }
                });

                // Refresh ScrollTrigger after filter
                ScrollTrigger.refresh();
            });
        });
    }

    /**
     * Initialize Contact Page Outlet Selector
     */
    initContactOutlets() {
        const outletBtns = document.querySelectorAll('.outlet-btn');
        if (outletBtns.length === 0) return;

        const outlets = {
            palasia: {
                name: "Indore - Palasia",
                address: "Near Palasia Square, AB Road<br>Indore, Madhya Pradesh 452001",
                hours: "Monday - Sunday<br>11:00 AM - 11:00 PM",
                phone: "+91 731 250 1234",
                phoneLink: "+917312501234",
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.1766741959!2d75.8655!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd001f4d0001%3A0x0!2sPalasia%20Square%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            },
            vijaynagar: {
                name: "Indore - Vijay Nagar",
                address: "Scheme No 54, Vijay Nagar<br>Indore, Madhya Pradesh 452010",
                hours: "Monday - Sunday<br>10:00 AM - 11:30 PM",
                phone: "+91 731 250 5678",
                phoneLink: "+917312505678",
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5!2d75.895!3d22.755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVijay%20Nagar%2C%20Indore!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin"
            },
            bhanwarkuan: {
                name: "Indore - Bhanwarkuan",
                address: "Bhanwarkuan Main Road<br>Indore, Madhya Pradesh 452001",
                hours: "Tuesday - Sunday<br>11:00 AM - 10:30 PM",
                phone: "+91 731 250 9012",
                phoneLink: "+917312509012",
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.5!2d75.865!3d22.695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhanwarkuan%2C%20Indore!5e0!3m2!1sen!2sin!4v1700000000002!5m2!1sen!2sin"
            }
        };

        const addressEl = document.getElementById('contact-address');
        const hoursEl = document.getElementById('contact-hours');
        const phoneEl = document.getElementById('contact-phone');
        const phoneLinkEl = document.getElementById('contact-phone-link');
        const waLinkEl = document.getElementById('contact-wa-link');
        const mapEl = document.getElementById('contact-map');
        const nameEl = document.getElementById('contact-outlet-name');

        outletBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                outletBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const data = outlets[btn.getAttribute('data-outlet')];

                // Animate content change
                gsap.to([addressEl, hoursEl, phoneEl, nameEl], {
                    opacity: 0,
                    y: 10,
                    duration: 0.2,
                    onComplete: () => {
                        if (nameEl) nameEl.textContent = data.name;
                        if (addressEl) addressEl.innerHTML = data.address;
                        if (hoursEl) hoursEl.innerHTML = data.hours;
                        const phoneSpan = document.getElementById('contact-phone');
                        if (phoneSpan) phoneSpan.textContent = data.phone;
                        if (phoneLinkEl) phoneLinkEl.href = `tel:${data.phoneLink}`;
                        if (waLinkEl) waLinkEl.href = `https://wa.me/${data.phoneLink.replace('+', '')}`;

                        gsap.to([addressEl, hoursEl, phoneSpan, nameEl].filter(Boolean), {
                            opacity: 1,
                            y: 0,
                            duration: 0.3
                        });
                    }
                });

                // Update map instantly if exists
                if (mapEl) mapEl.src = data.mapSrc;
            });
        });
    }
}

// Add CSS keyframes for nav links dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Global Modal Functions
window.openDirectionsPopup = function (e) {
    if (e) e.preventDefault();
    const popup = document.getElementById('directions-popup');
    if (popup) {
        popup.classList.add('active');
    }
};

window.closeDirectionsPopup = function (e) {
    const popup = document.getElementById('directions-popup');
    if (popup) {
        popup.classList.remove('active');
    }
};

// Close modal when clicking outside
document.addEventListener('click', function (event) {
    const popup = document.getElementById('directions-popup');
    if (popup && event.target === popup) {
        closeDirectionsPopup();
    }
});

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new SiteAnimations();
});
