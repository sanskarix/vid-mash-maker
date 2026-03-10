"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
    const [activeOutlet, setActiveOutlet] = useState("palasia");

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

    const outlets = {
        palasia: {
            address: "Near Palasia Square, AB Road, Indore, Madhya Pradesh 452001",
            phone: "+91 731 250 1234",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.1766741959!2d75.8655!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd001f4d0001%3A0x0!2sPalasia%20Square%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        },
        vijaynagar: {
            address: "Vijay Nagar Square, Indore, Madhya Pradesh 452010",
            phone: "+91 731 400 5678",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.524853229618!2d75.8913!3d22.7533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd3904944519%3A0x2897034c568f619e!2sVijay%20Nagar%2C%20Indore!5e0!3m2!1sen!2sin"
        },
        bhanwarkuan: {
            address: "Bhanwarkuan Main Road, Indore, Madhya Pradesh 452001",
            phone: "+91 731 320 9012",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14725.26307379768!2d75.8679!3d22.6848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fceeb9031c5b%3A0xf65b219001384074!2sBhanwarkuan%2C%20Indore!5e0!3m2!1sen!2sin"
        }
    };

    return (
        <main className="inner-page">
            <section className="page-hero">
                <div className="container fade-up">
                    <h1 className="page-hero-title">Get in <span className="highlight">Touch</span></h1>
                    <p className="page-hero-subtitle">Reach out for reservations, catering enquiries, or just to say hello. We're always happy to hear from you.</p>
                </div>
            </section>

            <section className="contact-section py-100">
                <div className="container">
                    <div className="outlet-selector fade-up mb-5">
                        <button className={`outlet-btn ${activeOutlet === "palasia" ? "active" : ""}`} onClick={() => setActiveOutlet("palasia")}>Indore - Palasia</button>
                        <button className={`outlet-btn ${activeOutlet === "vijaynagar" ? "active" : ""}`} onClick={() => setActiveOutlet("vijaynagar")}>Indore - Vijay Nagar</button>
                        <button className={`outlet-btn ${activeOutlet === "bhanwarkuan" ? "active" : ""}`} onClick={() => setActiveOutlet("bhanwarkuan")}>Indore - Bhanwarkuan</button>
                    </div>

                    <div className="contact-premium-grid mt-5">
                        <div className="contact-info-panel fade-up">
                            <div className="info-group">
                                <h3>Visit Us</h3>
                                <p>{(outlets as any)[activeOutlet].address}</p>
                            </div>
                            <div className="info-group">
                                <h3>Opening Hours</h3>
                                <p>Monday - Sunday<br />11:00 AM - 11:00 PM</p>
                            </div>
                            <div className="info-group">
                                <h3>Contact</h3>
                                <p>{(outlets as any)[activeOutlet].phone}</p>
                                <a href="mailto:hello@dosacraft.in">hello@dosacraft.in</a>
                            </div>
                        </div>

                        <div className="contact-form-panel fade-up" style={{ transitionDelay: "0.2s" }}>
                            <form action="#" className="premium-form">
                                <h3 className="section-title" style={{ fontSize: "1.8rem", marginBottom: "2rem" }}>Send a Message</h3>
                                <div className="form-row">
                                    <div className="form-group"><input type="text" placeholder="Your Full Name" required /></div>
                                    <div className="form-group"><input type="tel" placeholder="Phone Number" required /></div>
                                </div>
                                <div className="form-group"><input type="email" placeholder="Email Address" required /></div>
                                <div className="form-group"><textarea rows={5} placeholder="How can we help you?" required></textarea></div>
                                <button type="submit" className="btn btn-primary w-100 mt-2" style={{ padding: "1.2rem", fontSize: "1.1rem", borderRadius: "12px" }}>Submit Request</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-section pb-100">
                <div className="container fade-up">
                    <div className="premium-map-container" style={{ height: "500px", borderRadius: "24px", overflow: "hidden" }}>
                        <iframe src={(outlets as any)[activeOutlet].map} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                    </div>
                </div>
            </section>
        </main>
    );
}
