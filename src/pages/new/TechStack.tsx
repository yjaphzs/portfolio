import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { techStack } from "@/data/techStack";

export default function TechStackPage() {
    return (
        <div className="min-h-screen bg-muted/30 font-[Inter,system-ui,sans-serif] text-[13px] leading-relaxed text-foreground antialiased">
            <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors no-underline"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Back to Home
                        </Link>
                        <ThemeToggle />
                    </div>
                    <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                        Tech Stack
                    </h1>
                </motion.div>

                {/* Categories */}
                <div className="space-y-6">
                    {Object.entries(techStack).map(([category, techs], idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + idx * 0.08 }}
                        >
                            <h2 className="text-sm font-semibold text-foreground mb-2.5">
                                {category}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {techs.map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant="outline"
                                        className="text-[11.5px] font-normal px-3 py-1 rounded-md"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
