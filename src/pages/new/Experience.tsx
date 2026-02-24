import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { motion } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { experience } from "./NewPortfolio";

export default function ExperiencePage() {
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
                        Experience
                    </h1>
                </motion.div>

                {/* Timeline */}
                <div className="space-y-4">
                    {experience.map((exp, idx) => (
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
                            <Card className="shadow-sm">
                                <CardContent className="p-4 sm:p-5">
                                    <a
                                        href={exp.url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="text-sm font-semibold hover:underline no-underline text-foreground"
                                    >
                                        {exp.company}
                                    </a>

                                    <div className="relative mt-3 space-y-0">
                                        {/* Timeline line */}
                                        <div className="absolute left-1.25 top-1.5 bottom-1.5 w-px bg-border" />

                                        {exp.roles.map((role, rIdx) => {
                                            const isLast =
                                                rIdx === exp.roles.length - 1;
                                            return (
                                                <div
                                                    key={rIdx}
                                                    className={`relative pl-5 ${isLast ? "pb-0" : "pb-4"}`}
                                                >
                                                    {/* Dot */}
                                                    <div className="absolute left-0 top-1.25 h-2.75 w-2.75 rounded-full border-2 border-primary bg-background" />

                                                    <p className="text-[12.5px] font-semibold leading-tight">
                                                        {role.title}
                                                    </p>
                                                    <p className="text-[11px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                                                        <Calendar className="h-2.5 w-2.5" />
                                                        {role.period}
                                                    </p>
                                                    <p className="text-[11.5px] text-muted-foreground mt-1.5 leading-snug">
                                                        {role.description}
                                                    </p>
                                                </div>
                                            );
                                        })}
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
