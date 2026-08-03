import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { versions } from "@/data/versions";
import type { PortfolioVersion } from "@/data/versions";

/**
 * Accessible fallback for the 3D time machine.
 *
 * Rendered by TimeMachine when WebGL is unavailable or the canvas fails at
 * runtime. It no longer owns the version list (see `@/data/versions`), the
 * route visibility gate, or favicon swapping (see `useVersionFavicon`) — those
 * moved out so this component could be swapped without taking them along.
 */
export function VersionSwitcher() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSelect = (path: string) => {
        setOpen(false);
        navigate(path);
    };

    const latestVersions = versions.filter((v) => v.category === "latest");
    const archivedVersions = versions.filter((v) => v.category === "archived");

    return (
        <>
            {/* Floating button */}
            <motion.div
                className="fixed bottom-5 right-5 z-10001 print:hidden"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
            >
                <Button
                    size="icon"
                    className="h-11 w-11 rounded-full shadow-lg cursor-pointer"
                    onClick={() => setOpen(true)}
                    aria-label="Switch portfolio version"
                >
                    <History className="h-5 w-5" />
                </Button>
            </motion.div>

            {/* Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-base flex items-center gap-2">
                            <History className="h-4 w-4" />
                            Portfolio Versions
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Travel through time — pick a version to view.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 pt-1">
                        {latestVersions.map((version) => (
                            <VersionButton
                                key={version.id}
                                version={version}
                                isActive={location.pathname === version.path}
                                onSelect={handleSelect}
                            />
                        ))}

                        {archivedVersions.length > 0 && (
                            <>
                                <div className="flex items-center gap-2 pt-1">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                        Archived
                                    </span>
                                    <Separator className="flex-1" />
                                </div>
                                {archivedVersions.map((version) => (
                                    <VersionButton
                                        key={version.id}
                                        version={version}
                                        isActive={
                                            location.pathname === version.path
                                        }
                                        onSelect={handleSelect}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

// ─── Version button ──────────────────────────────────────────────────────────

function VersionButton({
    version,
    isActive,
    onSelect,
}: {
    version: PortfolioVersion;
    isActive: boolean;
    onSelect: (path: string) => void;
}) {
    return (
        <button
            onClick={() => onSelect(version.path)}
            className={`w-full flex items-start gap-3 rounded-lg border p-3 text-left transition-colors cursor-pointer ${
                isActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
            }`}
        >
            <div
                className={`mt-0.5 rounded-md p-1.5 ${
                    isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                }`}
            >
                <version.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                        {version.label}
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                        {version.year}
                    </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    {version.description}
                </p>
                <AnimatePresence>
                    {isActive && (
                        <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="inline-block text-[10px] font-medium text-primary mt-1"
                        >
                            Currently viewing
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </button>
    );
}
