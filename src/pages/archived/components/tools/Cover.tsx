import { useEffect, useRef } from "react";
import Logo from "../../../../assets/v1/images/global/logo.svg";

interface CoverProps {
    isVisible?: boolean;
}

function Cover({ isVisible = true }: CoverProps) {
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

        // Handle isVisible prop changes
        if (!isVisible && coverOverlay) {
            coverOverlay.classList.add("fadeOut");
        } else if (isVisible && coverOverlay) {
            coverOverlay.classList.remove("fadeOut");
            coverOverlay.style.opacity = "1";
            coverOverlay.style.zIndex = "999";
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
        <div id="cover-overlay" className={isVisible ? "" : "fadeOut"}  ref={overlayRef}>
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
