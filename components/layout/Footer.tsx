import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-container">
                    <div className="footer-brand">
                        <h3 className="footer-logo">Dosa Craft</h3>
                        <p className="footer-tagline">Reinventing traditional dosa by combining authentic South Indian flavors with modern culinary craft.</p>
                    </div>
                    <div className="footer-links">
                        <h4 className="footer-column-title">Explore</h4>
                        <div className="footer-nav">
                            <Link href="/">Home</Link>
                            <Link href="/menu">Menu</Link>
                            <Link href="/about">About Us</Link>
                            <Link href="/contact">Contact Us</Link>
                        </div>
                    </div>
                    <div className="footer-social-column">
                        <h4 className="footer-column-title">Follow Us</h4>
                        <div className="footer-socials">
                            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://linkedin.com/company/asellus" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                    <div className="footer-directions">
                        <a
                            href="https://maps.google.com/?q=50,+Bada+Sarafa+Chaupati,+Indore"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ padding: "0.8rem 1.5rem", fontSize: "0.95rem", marginTop: "2rem", display: "inline-flex", justifyContent: "center", alignItems: "center" }}
                        >
                            Get Directions
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-copy">&copy; 2026 Dosa Craft. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
