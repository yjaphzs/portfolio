import { useEffect, useRef } from "react";
import Logo from "../../../../assets/v1/images/global/logo.svg";

/*
 * `.src`, not the import itself. A static image import resolves to an object
 * ({src, width, height}), and an SVG one is typed `any` — so passing it
 * straight to an <img> type-checks and then renders src="[object Object]".
 * Kept a plain <img>: logo.svg declares only a viewBox, so next/image has no
 * intrinsic size to work with and buys nothing here.
 */

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

            // @ts-expect-error resizedFinished is an ad-hoc property on window
            clearTimeout(window.resizedFinished);
            // @ts-expect-error resizedFinished is an ad-hoc property on window
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
    }, [isVisible]);

    return (
        <div id="cover-overlay" className={isVisible ? "" : "fadeOut"}  ref={overlayRef}>
            <img
                id="cover-logo"
                className="fadeOutFaster"
                src={Logo.src}
                alt="Logo"
            />
        </div>
    );
}

export default Cover;
