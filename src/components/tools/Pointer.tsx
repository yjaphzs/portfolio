import React, { useEffect, useRef } from "react";

function Pointer() {
    const pointerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const coords = { x: 0, y: 0 };
        const pointerGradient = pointerRef.current;

        function gradientFollow() {
            if (!pointerGradient) return;
            let x = coords.x + "px";
            let y = coords.y + "px";
            pointerGradient.style.background = `radial-gradient(600px at ${x} ${y}, rgba(255, 179, 1, 0.10), transparent 80%)`;
        }

        function handleMouseMove(e: MouseEvent) {
            coords.x = e.clientX;
            coords.y = e.clientY;
            if (window.innerWidth > 768) {
                gradientFollow();
            }
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <div id="pointer-gradient" ref={pointerRef}></div>;
}

export default Pointer;
