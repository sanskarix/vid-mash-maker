"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function PageLoader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to({}, {
            duration: 2,
            onUpdate: function () {
                const p = Math.round(this.progress() * 100);
                setProgress(p);
                const bar = document.getElementById("loader-bar");
                if (bar) bar.style.width = p + "%";
            },
            onComplete: () => {
                gsap.to(".page-loader", {
                    opacity: 0,
                    duration: 0.5,
                    display: "none"
                });
            }
        });
    }, []);

    return (
        <div className="page-loader" id="page-loader">
            <div className="loader-logo">Dosa Craft</div>
            <div className="loader-progress">
                <div className="loader-bar" id="loader-bar" style={{ width: "0%" }}></div>
            </div>
        </div>
    );
}
