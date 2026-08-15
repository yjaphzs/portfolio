"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface ProfilePictureProps {
    /** Image shown at rest */
    defaultSrc: StaticImageData;
    /** Image shown on hover (falls back to defaultSrc) */
    hoverSrc?: StaticImageData;
    /** Image shown after click — stays until page reload (falls back to defaultSrc) */
    clickedSrc?: StaticImageData;
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
                // role="button" + tabIndex made this focusable but there was no
                // visible focus state, so keyboard users had no idea where they were.
                hasInteraction &&
                    "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-300/80 focus-visible:ring-offset-2",
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
            {/* Default image.
                `fill` resolves to position:absolute + inset:0 + 100% box — the
                same thing the old utility classes spelled out — measured
                against this element's padding box, which the spacer below
                makes square. Do not pass width/height here: they would fight
                the spacer. `priority` because this is the LCP element. */}
            <Image
                src={defaultSrc}
                alt={alt}
                fill
                priority
                className="object-cover transition-opacity duration-300 ease-in-out"
                style={{ opacity: activeSrc === defaultSrc ? 1 : 0 }}
                draggable={false}
            />

            {/* Hover and clicked images are crossfade layers, not separate
                content — alt="" keeps screen readers from announcing the same
                name three times. */}
            {hoverSrc && (
                <Image
                    src={hoverSrc}
                    alt=""
                    aria-hidden
                    fill
                    className="object-cover transition-opacity duration-300 ease-in-out"
                    style={{ opacity: activeSrc === hoverSrc ? 1 : 0 }}
                    draggable={false}
                />
            )}

            {clickedSrc && (
                <Image
                    src={clickedSrc}
                    alt=""
                    aria-hidden
                    fill
                    className="object-cover transition-opacity duration-300 ease-in-out"
                    style={{ opacity: activeSrc === clickedSrc ? 1 : 0 }}
                    draggable={false}
                />
            )}

            {/* Invisible spacer to maintain aspect ratio */}
            <div className="w-full" style={{ paddingBottom: "100%" }} />
        </div>
    );
}
