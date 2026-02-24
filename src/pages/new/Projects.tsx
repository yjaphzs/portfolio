import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { projects } from "./NewPortfolio";

export default function ProjectsPage() {
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
                        Projects
                    </h1>
                </motion.div>

                {/* Project cards */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                                delay: 0.1 + idx * 0.08,
                            }}
                        >
                            <Card className="shadow-sm h-full">
                                <CardContent className="p-4 sm:p-5 flex flex-col h-full">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="text-[13px] font-semibold hover:underline no-underline text-foreground inline-flex items-center gap-1"
                                    >
                                        {project.title}
                                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                    </a>
                                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                                        {project.fullTitle}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2 flex-1">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2.5">
                                        {project.tech.map((t) => (
                                            <Badge
                                                key={t}
                                                variant="outline"
                                                className="text-[10px] px-1.5 py-0 font-normal"
                                            >
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
