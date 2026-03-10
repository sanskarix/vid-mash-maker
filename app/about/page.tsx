"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

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
    }, []);

    return (
        <main className="inner-page">
            <section className="page-hero">
                <div className="container fade-up">
                    <h1 className="page-hero-title">A Fusion of <span className="highlight">Authenticity</span><br />&amp; Innovation</h1>
                    <p className="page-hero-subtitle">Reinventing a South Indian staple — combining time-honoured flavours with modern culinary craft to create something truly memorable.</p>
                </div>
            </section>

            <section className="about-concept-section py-100">
                <div className="container">
                    <div className="about-dual-grid">
                        <div className="about-block fade-up">
                            <span className="subtitle-label">How It Started</span>
                            <h2 className="about-section-title">Our Story</h2>
                            <p>Dosa Craft was created with the idea of transforming a traditional South Indian staple into a modern food experience. Dosa has always been loved for its taste, versatility, and nutritional value.</p>
                            <p>The idea behind Dosa Craft was to take this traditional dish and expand its possibilities — introducing new flavours, ingredients, and presentation styles while honouring its roots.</p>
                            <p>By blending tradition with creativity, Dosa Craft offers a new perspective on South Indian cuisine. We reimagine the classic dosa with fusion-style recipes that are visually compelling and genuinely exciting to eat.</p>
                            <div className="philosophy-tags" style={{ justifyContent: "flex-start", marginTop: "2rem" }}>
                                <span className="p-tag">Authentic</span>
                                <span className="p-tag">Creative</span>
                                <span className="p-tag">Crafted With Care</span>
                            </div>
                        </div>
                        <div className="about-image-block fade-up" style={{ transitionDelay: "0.15s" }}>
                            <div className="cinematic-image-wrapper shadow-gold">
                                <img src="/assets/images/about-story.png" alt="The story behind Dosa Craft" />
                                <div className="image-overlay-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-unique-section py-100">
                <div className="container">
                    <div className="text-center mb-4">
                        <span className="subtitle-label">What Drives Us</span>
                        <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>Vision &amp; Mission</h2>
                        <p className="section-intro">Every great brand starts with a clear sense of purpose. Here's ours.</p>
                    </div>

                    <div className="vision-mission-grid" style={{ marginTop: "3rem" }}>
                        <div className="vm-card fade-up">
                            <h3 className="vm-title">Our Vision</h3>
                            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--clr-text)" }}>To build a globally recognised dosa brand that delivers exceptional taste, quality, and customer experience — setting new standards in South Indian fusion cuisine.</p>
                        </div>
                        <div className="vm-divider"></div>
                        <div className="vm-card fade-up" style={{ transitionDelay: "0.1s" }}>
                            <h3 className="vm-title">Our Mission</h3>
                            <ul className="about-list highlight-list" style={{ marginTop: "0.5rem" }}>
                                <li>Serve innovative South Indian fusion dishes</li>
                                <li>Provide healthier, better-tasting alternatives</li>
                                <li>Maintain the highest standards of food quality</li>
                                <li>Deliver a consistently memorable dining experience</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
