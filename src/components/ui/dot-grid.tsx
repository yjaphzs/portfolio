import { useCallback, useRef, useState } from "react";

export function DotGrid() {
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setMouse({ x: e.clientX, y: e.clientY });
      rafRef.current = 0;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: -9999, y: -9999 });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      ref={(node) => {
        if (!node) return;
        const doc = node.ownerDocument;
        doc.addEventListener("mousemove", handleMouseMove);
        doc.addEventListener("mouseleave", handleMouseLeave);
      }}
    >
      {/* Dot grid – revealed by cursor */}
      <div
        className="absolute inset-0 transition-[mask-position,-webkit-mask-position] duration-75 ease-out"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage: `radial-gradient(circle 480px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 480px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
