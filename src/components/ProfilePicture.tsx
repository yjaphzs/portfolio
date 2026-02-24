import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProfilePictureProps {
    /** Image shown at rest */
    defaultSrc: string;
    /** Image shown on hover (falls back to defaultSrc) */
    hoverSrc?: string;
    /** Image shown after click — stays until page reload (falls back to defaultSrc) */
    clickedSrc?: string;
    alt?: string;
    fallbackInitials?: string;
    className?: string;
}

/**
 * Rectangular profile picture with rounded corners.
 * - Default: shows `defaultSrc`.
 * - Hover: crossfades to `hoverSrc`.
 * - Click (while hovering): shows `clickedSrc`, resets on hover-out.
 */
export function ProfilePicture({
    defaultSrc,
    hoverSrc,
    clickedSrc,
    alt = "Profile photo",
    fallbackInitials = "?",
    className,
}: ProfilePictureProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const hasImage = !!defaultSrc;
    const hasInteraction = !!hoverSrc || !!clickedSrc;

    if (!hasImage) {
        return (
            <div
                className={cn(
                    "shrink-0 rounded-xl border border-border bg-muted flex items-center justify-center text-muted-foreground font-semibold select-none",
                    className
                )}
            >
                {fallbackInitials}
            </div>
        );
    }

    // Determine which image is currently visible
    const activeSrc = isClicked && clickedSrc
        ? clickedSrc
        : isHovered && hoverSrc
            ? hoverSrc
            : defaultSrc;

    return (
        <div
            className={cn(
                "shrink-0 rounded-xl border border-border overflow-hidden relative select-none",
                hasInteraction && "cursor-pointer",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsClicked(false);
            }}
            onClick={() => {
                if (clickedSrc) setIsClicked(true);
            }}
            role={hasInteraction ? "button" : undefined}
            tabIndex={hasInteraction ? 0 : undefined}
            aria-label={hasInteraction ? "Click to change profile photo" : undefined}
            onKeyDown={(e) => {
                if (hasInteraction && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    if (clickedSrc) setIsClicked(true);
                }
            }}
        >
            {/* Default image */}
            <img
                src={defaultSrc}
                alt={alt}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
                style={{ opacity: activeSrc === defaultSrc ? 1 : 0 }}
                draggable={false}
            />

            {/* Hover image */}
            {hoverSrc && (
                <img
                    src={hoverSrc}
                    alt={alt}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
                    style={{ opacity: activeSrc === hoverSrc ? 1 : 0 }}
                    draggable={false}
                />
            )}

            {/* Clicked image */}
            {clickedSrc && (
                <img
                    src={clickedSrc}
                    alt={alt}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
                    style={{ opacity: activeSrc === clickedSrc ? 1 : 0 }}
                    draggable={false}
                />
            )}

            {/* Invisible spacer to maintain aspect ratio */}
            <div className="w-full" style={{ paddingBottom: "100%" }} />
        </div>
    );
}
