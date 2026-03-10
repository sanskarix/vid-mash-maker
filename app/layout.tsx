import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
});

const interTight = Inter_Tight({
    subsets: ["latin"],
    variable: "--font-heading",
});

export const metadata: Metadata = {
    title: "Dosa Craft | The Best South Indian Fusion Dosa in Indore",
    description: "Craving the best dosa in Indore? Dosa Craft serves crispy, authentic South Indian dosas with a delicious modern fusion twist.",
    openGraph: {
        title: "Dosa Craft | Discover Indore's Favorite Fusion Dosas",
        description: "Experience the perfect blend of traditional South Indian crispness and bold global flavors.",
        images: ["https://asellus.in/assets/images/asellus_social_preview.png"],
        url: "https://asellus.in",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${interTight.variable} antialiased`}>
                <SmoothScroll>
                    <Navbar />
                    {children}
                    <Footer />
                </SmoothScroll>
            </body>
        </html>
    );
}
