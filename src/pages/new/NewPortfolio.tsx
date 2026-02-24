import {
    Mail,
    MapPin,
    ExternalLink,
    Github,
    Linkedin,
    Instagram,
    FileText,
    Calendar,
    Dot,
} from "lucide-react";
import { CheckBadgeIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { techStack, TECH_PREVIEW_COUNT } from "@/data/techStack";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";
import { ProfilePicture } from "@/components/ProfilePicture";

// ─── Assets ──────────────────────────────────────────────────────────────────
import profilePicLightDefault from "@/assets/v2/images/profile-pic/light/default.jpg";
import profilePicLightHover from "@/assets/v2/images/profile-pic/light/hover.jpg";
import profilePicLightClicked from "@/assets/v2/images/profile-pic/light/clicked.jpg";

import profilePicDarkDefault from "@/assets/v2/images/profile-pic/dark/default.jpg";
import profilePicDarkHover from "@/assets/v2/images/profile-pic/dark/hover.jpg";
import profilePicDarkClicked from "@/assets/v2/images/profile-pic/dark/clicked.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

const profile = {
    name: "Jan Bautista",
    initials: "JB",
    title: "Full-Stack Developer",
    location: "Nueva Ecija, Philippines",
    email: "yjaphzs@gmail.com",
    resumeUrl: "/JBautista-Resume.pdf",
    avatarImages: {
      light: {
        default: profilePicLightDefault,
        hover: profilePicLightHover,
        clicked: profilePicLightClicked,
      },
      dark: {
        default: profilePicDarkDefault,
        hover: profilePicDarkHover,
        clicked: profilePicDarkClicked,
      },
    },
    bio: [
        "I'm a full-stack software engineer who enjoys building web applications with Laravel, React, and modern JavaScript/TypeScript. I've worked on university systems, creative web ads, and IT support — always looking for ways to make things simpler and more useful.",
        "During my time at Central Luzon State University, I built multiple institution-wide systems from the ground up while also teaching programming courses. I love bridging the gap between technical solutions and real user needs.",
        "I'm currently exploring new opportunities where I can apply my full-stack skills, contribute to meaningful products, and keep growing as an engineer.",
    ],
    socials: [
        { name: "GitHub", url: "https://github.com/yjaphzs", icon: Github },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/yjaphzs/",
            icon: Linkedin,
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/yjaphzs/",
            icon: Instagram,
        },
    ],
};



export const experience = [
    {
        company: "Central Luzon State University",
        shortName: "CLSU",
        url: "https://clsu.edu.ph/",
        roles: [
            {
                title: "Full-Stack Developer",
                period: "Aug 2022 – Jun 2025",
                description:
                    "Built and maintained full-stack web applications using Laravel, Livewire, Bootstrap, JavaScript, SASS, and MySQL to support the university's research, extension, and administrative processes.",
            },
            {
                title: "Instructor I",
                period: "Aug 2022 – Jun 2025",
                description:
                    "Delivered lectures and lab classes on programming subjects. Advised capstone projects and OJT students. Maintained Outstanding Faculty Performance Ratings throughout employment.",
            },
        ],
    },
    {
        company: "Philippine Rice Research Institute",
        shortName: "PhilRice",
        url: "https://www.philrice.gov.ph/",
        roles: [
            {
                title: "Information System Analyst I",
                period: "Oct 2021 – Aug 2022",
                description:
                    "Provided IT support, created training materials, documented activities, and supported online learning sessions including international training programs.",
            },
        ],
    },
    {
        company: "Wideout (AQA)",
        shortName: "Wideout",
        url: "https://www.aqa.work/",
        roles: [
            {
                title: "Quality Assurance Specialist",
                period: "Nov 2020 – Sep 2021",
                description:
                    "Ensured pixel-perfect creative web advertisements, tested cross-browser compatibility, and followed standardized QA processes.",
            },
            {
                title: "Creative Developer",
                period: "Aug 2020 – Nov 2020",
                description:
                    "Converted designs into animated and static web ads using HTML, CSS, and vanilla JavaScript across multiple banner sizes.",
            },
        ],
    },
    {
        company: "Central Luzon State University",
        shortName: "CLSU",
        url: "https://clsu.edu.ph/",
        roles: [
            {
                title: "Part-time Instructor",
                period: "Aug 2019 – Apr 2020",
                description:
                    "Lectured programming courses, prepared instructional materials, and served as capstone and OJT advisor.",
            },
        ],
    },
    {
        company: "TechnoDream Outsourcing",
        shortName: "TechnoDream",
        url: "https://technodreamoutsourcing.com/",
        roles: [
            {
                title: "Programmer",
                period: "Feb 2019 – May 2019",
                description:
                    "Converted web designs into responsive static pages. Successfully delivered 34+ responsive pages and assisted in WordPress migrations.",
            },
        ],
    },
];

export const projects = [
    {
        title: "RADIIS",
        fullTitle: "Research & Development Integrated Information System",
        description:
            "A web app to manage and organize CLSU's research programs, projects, and studies with built-in analytics.",
        url: "https://radiis.clsu.edu.ph",
        tech: ["Laravel", "Livewire", "MySQL", "Bootstrap"],
    },
    {
        title: "BASIS",
        fullTitle: "Business Affairs Strategic Integrated System",
        description:
            "A centralized platform to modernize and streamline CLSU's business operations across multiple programs.",
        url: "https://basis.clsu.edu.ph",
        tech: ["Laravel", "Livewire", "MySQL", "Bootstrap"],
    },
    {
        title: "CLSU Virtual Explorer",
        fullTitle: "Interactive 360° Virtual Campus Tour",
        description:
            "An interactive web app that lets anyone explore CLSU's campuses through immersive 360-degree panoramic images.",
        url: "https://360.clsu.edu.ph",
        tech: ["JavaScript", "Laravel", "MySQL", "CSS"],
    },
];

const education = [
    {
        degree: "BS Information Technology",
        school: "Central Luzon State University",
        period: "2015 – 2019",
    },
];

const RELEVANT_TITLES = [
    "Full-Stack Developer",
    "Quality Assurance Specialist",
    "Creative Developer",
    "Programmer",
];

const relevantExperience = experience
    .map((exp) => ({
        ...exp,
        roles: exp.roles.filter((role) => RELEVANT_TITLES.includes(role.title)),
    }))
    .filter((exp) => exp.roles.length > 0);

// ─── Animation helpers ───────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" as const, delay },
});

// ─── Component ───────────────────────────────────────────────────────────────

export default function NewPortfolio() {
    const { theme } = useTheme();
    const resolvedTheme =
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            : theme;
    const avatarImages = profile.avatarImages[resolvedTheme];

    return (
        <div className="min-h-screen bg-muted/30 font-[Inter,system-ui,sans-serif] text-[13px] leading-relaxed text-foreground antialiased">
            <div className="mx-auto max-w-6xl px-3 py-4 sm:px-6 lg:px-8">
                {/* ── Profile Header (full width) ──────────────────── */}
                <motion.header className="mb-4 sm:mb-6" {...fadeUp(0)}>
                    <Card className="shadow-sm">
                        <CardContent className="relative flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-5">
                            {/* Theme toggle */}
                            <div className="absolute top-3 right-3">
                                <ThemeToggle />
                            </div>

                            {/* Profile Picture */}
                            <ProfilePicture
                                defaultSrc={avatarImages.default}
                                hoverSrc={avatarImages.hover}
                                clickedSrc={avatarImages.clicked}
                                alt={profile.name}
                                fallbackInitials={profile.initials}
                                className="h-30 w-30 sm:h-27 sm:w-27 text-sm sm:text-lg"
                            />

                            {/* Info */}
                            <div className="flex-1 min-w-0 space-y-1.5 pr-8 sm:pr-0">
                                <div>
                                    <h1 className="text-lg sm:text-2xl font-bold tracking-tight leading-tight inline-flex items-center gap-1.5">
                                        {profile.name}
                                        <CheckBadgeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#1877F2]" />
                                    </h1>
                                    <p className="text-xs sm:text-[13px] text-muted-foreground">
                                        {profile.title}
                                    </p>
                                </div>

                                {/* Meta row */}
                                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-0.5 sm:gap-x-3 sm:gap-y-1 text-[11px] sm:text-xs text-muted-foreground">
                                    <span className="inline-flex items-center gap-1">
                                        <MapPin className="h-3 w-3 shrink-0" />
                                        {profile.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                        <Mail className="h-3 w-3 shrink-0" />
                                        <a
                                            href={`mailto:${profile.email}`}
                                            className="hover:text-foreground transition-colors no-underline truncate"
                                        >
                                            {profile.email}
                                        </a>
                                    </span>
                                </div>

                                {/* Actions row */}
                                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                    {profile.socials.map((social) => (
                                        <Button
                                            key={social.name}
                                            variant="outline"
                                            size="sm"
                                            className="h-7 px-2 sm:px-2.5 text-[11px] sm:text-xs"
                                            asChild
                                        >
                                            <a
                                                href={social.url}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className="no-underline"
                                            >
                                                <social.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                                <span className="hidden xs:inline sm:inline">{social.name}</span>
                                            </a>
                                        </Button>
                                    ))}
                                    <Button
                                        size="sm"
                                        className="h-7 px-2 sm:px-2.5 text-[11px] sm:text-xs"
                                        asChild
                                    >
                                        <a
                                            href={profile.resumeUrl}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="no-underline"
                                        >
                                            <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                            Resume
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.header>

                {/* ── Two-Column Layout (8 : 4) ───────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                    {/* ── LEFT COLUMN (8/12) ──────────────────────── */}
                    <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                        {/* About */}
                        <motion.div {...fadeUp(0.1)}>
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    About
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-[12px] sm:text-[13px] leading-relaxed text-muted-foreground">
                                    {profile.bio.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div {...fadeUp(0.2)}>
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Tech Stack
                                </CardTitle>
                                <Link
                                    to="/tech-stack"
                                    className="text-[11px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors no-underline"
                                >
                                  <div className="inline-flex items-center gap-1">
                                    View All
                                    <ArrowRightIcon className="h-4 w-4 inline-block ml-1" />
                                  </div>
                                </Link>
                            </CardHeader>
                            <CardContent className="px-4 sm:px-5 pb-3 sm:pb-4 space-y-3">
                                {Object.entries(techStack).map(
                                    ([category, techs]) => {
                                        const visible = techs.slice(0, TECH_PREVIEW_COUNT);
                                        const hiddenCount = techs.length - visible.length;
                                        return (
                                            <div key={category}>
                                                <p className="text-[11.5px] font-semibold text-foreground mb-1.5">
                                                    {category}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {visible.map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="secondary"
                                                            className="text-[11px] font-normal px-2.5 py-0.5 rounded-full"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                    {hiddenCount > 0 && (
                                                        <Link to="/tech-stack">
                                                            <Badge
                                                                variant="outline"
                                                                className="text-[11px] font-normal px-2.5 py-0.5 rounded-full cursor-pointer"
                                                            >
                                                                +{hiddenCount}
                                                            </Badge>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </CardContent>
                        </Card>
                        </motion.div>

                        {/* Projects */}
                        <motion.div {...fadeUp(0.3)}>
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Recent Projects
                                </CardTitle>
                                <Link
                                    to="/projects"
                                    className="text-[11px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors no-underline"
                                >
                                  <div className="inline-flex items-center gap-1">
                                    View All
                                    <ArrowRightIcon className="h-4 w-4 inline-block ml-1" />
                                  </div>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {projects.map((project, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-lg border border-border bg-background p-3.5 flex flex-col"
                                        >
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
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        </motion.div>

                        {/* Education */}
                        <motion.div {...fadeUp(0.4)}>
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Education
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {education.map((edu, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2"
                                    >
                                        <div>
                                            <p className="text-[13px] font-medium">
                                                {edu.degree}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {edu.school}
                                            </p>
                                        </div>
                                        <span className="shrink-0 inline-flex items-center gap-1 text-[11px] text-muted-foreground pt-0.5">
                                            <Calendar className="h-3 w-3" />
                                            {edu.period}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        </motion.div>
                    </div>

                    {/* ── RIGHT COLUMN (4/12) ─────────────────────── */}
                    <div className="lg:col-span-4 space-y-4 sm:space-y-6">
                        {/* Relevant Experience */}
                        <motion.div {...fadeUp(0.15)}>
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Relevant Experience
                                </CardTitle>
                                <Link
                                    to="/experience"
                                    className="text-[11px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors no-underline"
                                >
                                  <div className="inline-flex items-center gap-1">
                                    View All
                                    <ArrowRightIcon className="h-4 w-4 inline-block ml-1" />
                                  </div>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="relative space-y-0">
                                    {/* Timeline line */}
                                    <div className="absolute left-1.25 top-1.5 bottom-1.5 w-px bg-border" />

                                    {relevantExperience.map((exp, idx) => (
                                        <div key={idx}>
                                            {exp.roles.map((role, rIdx) => {
                                                const isLast =
                                                    idx ===
                                                        relevantExperience.length -
                                                            1 &&
                                                    rIdx ===
                                                        exp.roles.length - 1;
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
                                                        <a
                                                            href={exp.url}
                                                            target="_blank"
                                                            rel="noreferrer noopener"
                                                            className="text-[11.5px] text-muted-foreground hover:text-foreground transition-colors no-underline"
                                                        >
                                                            {exp.company}
                                                        </a>
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
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        </motion.div>

                        {/* Contact & Links */}
                        <motion.div {...fadeUp(0.3)}>
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Contact & Links
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2.5">
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors no-underline"
                                >
                                    <Mail className="h-3.5 w-3.5 shrink-0" />
                                    {profile.email}
                                </a>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                                    {profile.location}
                                </div>
                                <Separator className="my-2" />
                                {profile.socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors no-underline"
                                    >
                                        <social.icon className="h-3.5 w-3.5 shrink-0" />
                                        {social.name}
                                    </a>
                                ))}
                                <Separator className="my-2" />
                                <a
                                    href={profile.resumeUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="flex items-center gap-2 text-xs font-medium text-foreground hover:underline no-underline"
                                >
                                    <FileText className="h-3.5 w-3.5 shrink-0" />
                                    Download Resume
                                </a>
                            </CardContent>
                        </Card>
                        </motion.div>
                    </div>
                </div>

                {/* ── Footer (full width) ─────────────────────────── */}
                <motion.div {...fadeUp(0.5)}>
                <Separator className="mt-4 sm:mt-6 mb-3 sm:mb-4" />
                <footer className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 pb-4 sm:pb-6 text-[10px] sm:text-[11px] text-muted-foreground">
                    <p>
                        &copy; {new Date().getFullYear()} {profile.name}
                        <Dot className="inline h-4 w-4" />
                        All rights reserved.
                    </p>
                </footer>
                </motion.div>
            </div>
        </div>
    );
}
