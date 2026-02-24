import "./FloatingLogos.scss";

import { useRef, useLayoutEffect, useState } from "react";

import laravelLogo from "../../../../../assets/v1/images/technologies/laravel.jpg";
import livewireLogo from "../../../../../assets/v1/images/technologies/livewire.jpg";
import phpLogo from "../../../../../assets/v1/images/technologies/php.jpg";
import sassLogo from "../../../../../assets/v1/images/technologies/sass.jpg";

const logos = [
    { src: laravelLogo, alt: "Laravel", priority: 1 },
    { src: livewireLogo, alt: "Livewire", priority: 2 },
    { src: phpLogo, alt: "PHP", priority: 2 },
    { src: sassLogo, alt: "SASS", priority: 2 },
];

function getSizeByPriority(priority: number) {
    switch (priority) {
        case 1:
            return 80; // largest
        case 2:
            return 60;
        case 3:
            return 50;
        default:
            return 40; // smallest/default
    }
}

function FloatingLogos() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        function updateSize() {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        }
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const { width, height } = dimensions;
    // Use 40% of the smallest dimension as radius, minus max logo size for padding
    const maxLogoSize = Math.max(
        ...logos.map((l) => getSizeByPriority(l.priority))
    );
    const radius = Math.max(0, Math.min(width, height) * 1 - maxLogoSize / 2);

    return (
        <div
            ref={containerRef}
            className="floating-logos"
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                pointerEvents: "none",
            }}
        >
            {width > 0 &&
                height > 0 &&
                logos.map((logo, i) => {
                    const angle = (2 * Math.PI * i) / logos.length;
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const size = getSizeByPriority(logo.priority);
                    const x = centerX + radius * Math.cos(angle) - size / 2;
                    const y = centerY + radius * Math.sin(angle) - size / 2;
                    return (
                        <img
                            key={i}
                            src={logo.src}
                            alt={logo.alt}
                            style={{
                                position: "absolute",
                                left: x,
                                top: y,
                                width: size,
                                height: size,
                                borderRadius: "50%",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                pointerEvents: "none",
                                zIndex: 0,
                                animation: `float${
                                    i % 3
                                } 12s ease-in-out infinite alternate`,
                                transition: "left 0.3s, top 0.3s",
                            }}
                        />
                    );
                })}
        </div>
    );
}

export default FloatingLogos;
