import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { ArrowLeft, ArrowRight, XIcon, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ── Hook: manages lightbox state ──────────────────────────────────────────── */

export function useLightbox(total: number) {
  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const openAt = React.useCallback((index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  }, []);

  const close = React.useCallback(() => setOpen(false), []);

  const goNext = React.useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % total),
    [total]
  );

  const goPrev = React.useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + total) % total),
    [total]
  );

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      else if (e.key === "Escape") { e.preventDefault(); close(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, goNext, goPrev, close]);

  return { open, currentIndex, setCurrentIndex, openAt, close, goNext, goPrev };
}

/* ── LightboxDialog: the fullscreen overlay ────────────────────────────────── */

interface LightboxDialogProps {
  images: string[];
  alt?: string;
  open: boolean;
  currentIndex: number;
  onOpenChange: (open: boolean) => void;
  setCurrentIndex: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  close: () => void;
}

export function LightboxDialog({
  images,
  alt = "Image",
  open,
  currentIndex,
  onOpenChange,
  setCurrentIndex,
  goNext,
  goPrev,
  close,
}: LightboxDialogProps) {
  const [zoomed, setZoomed] = React.useState(false);
  const total = images.length;

  // Reset zoom when navigating
  React.useEffect(() => setZoomed(false), [currentIndex]);

  return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-10001 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            className="fixed inset-0 z-10001 flex items-center justify-center outline-none"
            aria-describedby={undefined}
            onPointerDownOutside={close}
          >
            <DialogPrimitive.Title className="sr-only">
              Image viewer — {alt}
            </DialogPrimitive.Title>

            {/* Top bar: counter + zoom + close */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3">
              <span className="text-sm font-medium text-white/90 select-none tabular-nums">
                {currentIndex + 1} / {total}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/80 hover:text-white hover:bg-white/15 size-9"
                  onClick={() => setZoomed((z) => !z)}
                  aria-label={zoomed ? "Zoom out" : "Zoom in"}
                >
                  {zoomed ? (
                    <ZoomOut className="h-5 w-5" />
                  ) : (
                    <ZoomIn className="h-5 w-5" />
                  )}
                </Button>
                <DialogPrimitive.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/80 hover:text-white hover:bg-white/15 size-9"
                    aria-label="Close"
                  >
                    <XIcon className="h-5 w-5" />
                  </Button>
                </DialogPrimitive.Close>
              </div>
            </div>

            {/* Previous button */}
            {total > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full text-white/80 hover:text-white hover:bg-white/15"
                onClick={goPrev}
                aria-label="Previous image"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            )}

            {/* Next button */}
            {total > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full text-white/80 hover:text-white hover:bg-white/15"
                onClick={goNext}
                aria-label="Next image"
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            )}

            {/* Main image */}
            <div
              className={cn(
                "flex items-center justify-center w-full h-full px-14 py-14 sm:px-20",
                zoomed ? "overflow-auto cursor-zoom-out" : "cursor-zoom-in"
              )}
              onClick={(e) => {
                if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "IMG") {
                  setZoomed((z) => !z);
                }
              }}
            >
              <img
                src={images[currentIndex]}
                alt={`${alt} ${currentIndex + 1}`}
                className={cn(
                  "max-h-full rounded-lg shadow-2xl select-none transition-transform duration-200",
                  zoomed
                    ? "max-w-none scale-150 cursor-zoom-out"
                    : "max-w-full object-contain cursor-zoom-in"
                )}
                draggable={false}
              />
            </div>

            {/* Bottom dots */}
            {total > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setZoomed(false);
                      setCurrentIndex(idx);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-200",
                      idx === currentIndex
                        ? "w-4 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    )}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
  );
}
