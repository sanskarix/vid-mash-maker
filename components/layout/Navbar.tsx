"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header className="header">
            <div className="header-container">
                <Link href="/" className="logo">Dosa Craft</Link>
                <div
                    className={`burger-menu ${isMenuOpen ? "active" : ""}`}
                    id="burger-menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav className={`nav-links ${isMenuOpen ? "active" : ""}`} id="nav-links">
                    <Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link>
                    <Link href="/menu" className={pathname === "/menu" ? "active" : ""}>Menu</Link>
                    <Link href="/about" className={pathname === "/about" ? "active" : ""}>About Us</Link>
                    <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>Contact Us</Link>
                </nav>
            </div>
        </header>
    );
}
