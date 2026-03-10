"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Fade up animations
        const fadeUpElements = document.querySelectorAll(".fade-up");
        fadeUpElements.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Hero Parallax
        const parallaxElements = document.querySelectorAll(".gs-parallax");
        parallaxElements.forEach((el) => {
            const speed = (el as HTMLElement).dataset.speed || "0.5";
            gsap.to(el, {
                y: () => (1 - parseFloat(speed)) * 200,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Text Reveal
        const textReveals = document.querySelectorAll(".text-reveal-mask > *");
        gsap.to(textReveals, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            delay: 0.5
        });

    }, []);

    return (
        <main>
            {/* Pinned Hero Section */}
            <section className="hero-pinned-wrapper">
                <div className="hero" id="hero">
                    <div className="ambient-glow glow-1 gs-parallax" data-speed="0.2"></div>
                    <div className="ambient-glow glow-2 gs-parallax" data-speed="0.1"></div>
                    <div className="ambient-glow glow-3 gs-parallax" data-speed="0.15"></div>

                    <div className="hero-content gs-parallax" data-speed="0.4">
                        <div className="text-reveal-mask">
                            <h1 className="hero-title">The Best <span className="highlight">Dosa Experience</span> in Indore.</h1>
                        </div>
                        <div className="text-reveal-mask mt-1">
                            <p className="hero-subtitle">Crispy, golden, and packed with flavor. We’re taking authentic South
                                Indian traditions and giving them a delicious modern twist.</p>
                        </div>
                        <div className="hero-cta text-reveal-mask mt-2">
                            <Link href="/menu" className="btn btn-primary">View Our Menu</Link>
                            <a href="#visit-us" className="btn btn-secondary">Find Our Outlet</a>
                        </div>
                    </div>

                    <div className="hero-visual gs-parallax" data-speed="0.9">
                        <img src="/assets/images/dosa1.svg" alt="Dosa Craft Illustration" className="dosa-vector" id="dosa-vector" />
                    </div>
                </div>
            </section>

            <div className="traditional-divider"></div>

            {/* Features Section */}
            <section className="features-section py-100">
                <div className="container text-center fade-up">
                    <h2 className="section-title">Not Your Average Dosa</h2>
                    <p className="section-intro">We aren’t just serving food; we’re serving creativity on a plate.</p>
                </div>
                <div className="container features-grid mt-4">
                    <div className="feature-card fade-up">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Mind-Blowing Flavors</h3>
                        <p className="feature-desc">From our explosive Cheese Volcano to the zesty Chinese Choupsey Dosa, we’ve reimagined what a dosa can be.</p>
                    </div>
                    {/* More features... abbreviated for now */}
                </div>
            </section>

            {/* Visit Us */}
            <section id="visit-us" className="visit-us" style={{ position: "relative", overflow: "hidden" }}>
                <div className="container relative z-10">
                    <div className="visit-grid" style={{ alignItems: "center", gap: "5rem" }}>
                        <div className="visit-map fade-up" style={{ position: "relative" }}>
                            <div className="premium-map-container" style={{ height: "400px", borderRadius: "16px", overflow: "hidden" }}>
                                <iframe id="contact-map"
                                    src="https://www.google.com/maps?q=50,+Bada+Sarafa+Chaupati,+Indore,+Madhya+Pradesh+452001&output=embed"
                                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        <div className="visit-details fade-up text-left">
                            <span style={{ color: "var(--clr-gold)", fontFamily: "var(--font-heading)", letterSpacing: "4px", fontSize: "1rem", textTransform: "uppercase", marginBottom: "1.5rem", display: "block" }}>Visit Us in Indore</span>
                            <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--clr-white)", fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 1.1, marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>Find Your<br />Nearest<br />Dosa Craft</h2>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
