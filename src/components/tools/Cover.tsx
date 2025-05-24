import React, { useEffect, useRef } from "react";
import Logo from "../../assets/images/global/logo.svg";

function Cover() {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const coverOverlay = overlayRef.current;
        if (!coverOverlay) return;

        function handleAnimationEnd() {
            if (!coverOverlay) return;
            coverOverlay.style.opacity = "0";
            coverOverlay.style.zIndex = "-1";
        }

        function handleResize() {
            if (!coverOverlay) return;
            coverOverlay.classList.remove("fadeOut");
            coverOverlay.style.opacity = "1";
            coverOverlay.style.zIndex = "999";

            // @ts-ignore
            clearTimeout(window.resizedFinished);
            // @ts-ignore
            window.resizedFinished = setTimeout(() => {
                if (!coverOverlay) return;
                coverOverlay.classList.add("fadeOut");
            }, 250);
        }

        coverOverlay.addEventListener("animationend", handleAnimationEnd);
        coverOverlay.addEventListener("webkitAnimationEnd", handleAnimationEnd);
        coverOverlay.addEventListener("oAnimationEnd", handleAnimationEnd);
        window.addEventListener("resize", handleResize);

        return () => {
            coverOverlay.removeEventListener(
                "animationend",
                handleAnimationEnd
            );
            coverOverlay.removeEventListener(
                "webkitAnimationEnd",
                handleAnimationEnd
            );
            coverOverlay.removeEventListener(
                "oAnimationEnd",
                handleAnimationEnd
            );
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div id="cover-overlay" className="fadeOut" ref={overlayRef}>
            <img
                id="cover-logo"
                className="fadeOutFaster"
                src={Logo}
                alt="Logo"
            />
        </div>
    );
}

export default Cover;
