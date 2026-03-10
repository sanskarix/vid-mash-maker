"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState("all");

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

    const categories = [
        { id: "all", label: "All" },
        { id: "classic-sada", label: "Classic Sada" },
        { id: "masala", label: "Masala Dosa" },
        { id: "children", label: "Children's" },
        { id: "chefs-choice", label: "Chef's Choice" },
        { id: "new-in-town", label: "New in Town" },
        { id: "jain", label: "Jain Specials" },
        { id: "uttapam", label: "Uttapam" },
    ];

    const menuItems = [
        { category: "classic-sada", name: "Butter Sada Dosa", price: "₹50", image: "/assets/images/masala-dosa.png" },
        { category: "classic-sada", name: "Onion Sada Dosa", price: "₹70", image: "/assets/images/masala-dosa.png" },
        { category: "classic-sada", name: "Schezwan Sada Dosa", price: "₹80", image: "/assets/images/masala-dosa.png" },
        { category: "masala", name: "Masala Dosa", price: "₹100", image: "/assets/images/mysore-dosa.png", tag: "Popular" },
        { category: "masala", name: "Schezwan Masala Dosa", price: "₹120", image: "/assets/images/mysore-dosa.png" },
        { category: "masala", name: "Mysore Masala Dosa", price: "₹180", image: "/assets/images/mysore-dosa.png" },
        { category: "masala", name: "Paneer Masala Dosa", price: "₹200", image: "/assets/images/mysore-dosa.png" },
        { category: "children", name: "Chocolate Dosa", price: "₹250", image: "/assets/images/chocolate-dosa.png", tag: "Kids Fav" },
        { category: "chefs-choice", name: "Spring Roll Dosa", price: "₹240", image: "/assets/images/spring-roll-dosa.png", tag: "Signature" },
        { category: "chefs-choice", name: "Cheese Volcano", price: "₹300", image: "/assets/images/cheese-volcano.png", tag: "Must Try" },
        { category: "new-in-town", name: "Burj Khalifa", price: "₹450", image: "/assets/images/cheese-volcano.png", tag: "Premium" },
        { category: "jain", name: "Jain Paneer Jinny Dosa", price: "₹160", image: "/assets/images/paneer-dosa.png" },
        { category: "uttapam", name: "Pizza Uttapam with Cheese", price: "₹250", image: "/assets/images/uttapam.png" },
    ];

    return (
        <main className="inner-page">
            <section className="page-hero">
                <div className="container fade-up">
                    <h1 className="page-hero-title">Crafted with <span className="highlight">Tradition</span></h1>
                    <p className="page-hero-subtitle">Every dosa tells a story of flavour, texture, and technique — from time-honoured classics to bold signature creations.</p>
                </div>
            </section>

            <section className="menu-filter-section" style={{ paddingTop: "3.5rem" }}>
                <div className="container">
                    <div className="category-filters">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="menu-section fade-up">
                <div className="container menu-container">
                    {/* Simplified for now, showing only filtered items */}
                    {categories.filter(c => c.id !== "all").map((cat) => (
                        (activeCategory === "all" || activeCategory === cat.id) && (
                            <div key={cat.id} className="menu-category">
                                <div className="category-header">
                                    <h2 className="category-title">{cat.label}</h2>
                                </div>
                                <ul className="menu-list">
                                    {menuItems.filter(item => item.category === cat.id).map((item, idx) => (
                                        <li key={idx} className="menu-item">
                                            <div className="menu-item-info">
                                                <h3 className="menu-item-name">{item.name} {item.tag && <span className="tag">{item.tag}</span>}</h3>
                                            </div>
                                            <span className="menu-item-price">{item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
                </div>
            </section>
        </main>
    );
}
