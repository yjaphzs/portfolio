import {
  Mail,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ImageZoom } from "@/components/ui/image-zoom";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";
import { ProfilePicture } from "@/components/ProfilePicture";

// ─── Assets ──────────────────────────────────────────────────────────────────

import carousel1 from "@/assets/v2/images/carousel/carousel-1.jpg";
import carousel2 from "@/assets/v2/images/carousel/carousel-2.jpg";
import carousel3 from "@/assets/v2/images/carousel/carousel-3.jpg";
import carousel4 from "@/assets/v2/images/carousel/carousel-4.jpg";
import carousel5 from "@/assets/v2/images/carousel/carousel-5.jpg";
import carousel6 from "@/assets/v2/images/carousel/carousel-6.jpg";
import carousel7 from "@/assets/v2/images/carousel/carousel-7.jpg";
import carousel8 from "@/assets/v2/images/carousel/carousel-8.jpg";
import carousel9 from "@/assets/v2/images/carousel/carousel-9.jpg";
import carousel10 from "@/assets/v2/images/carousel/carousel-10.jpg";
import carousel11 from "@/assets/v2/images/carousel/carousel-11.jpg";
import carousel12 from "@/assets/v2/images/carousel/carousel-12.jpg";
import carousel13 from "@/assets/v2/images/carousel/carousel-13.jpg";
import carousel14 from "@/assets/v2/images/carousel/carousel-14.jpg";
import carousel15 from "@/assets/v2/images/carousel/carousel-15.jpg";

const CAROUSEL_IMAGES = [
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel6,
  carousel7,
  carousel8,
  carousel9,
  carousel10,
  carousel11,
  carousel12,
  carousel13,
  carousel14,
  carousel15
];

import global2025co1 from "@/assets/v2/images/experience/globalco2025/carousel/carousel-1.jpg";
import global2025co2 from "@/assets/v2/images/experience/globalco2025/carousel/carousel-2.jpg";
import global2025co3 from "@/assets/v2/images/experience/globalco2025/carousel/carousel-3.jpg";
import global2025co4 from "@/assets/v2/images/experience/globalco2025/carousel/carousel-4.jpg";

import clsu2022co1 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-1.jpg";
import clsu2022co2 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-2.jpg";
import clsu2022co3 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-3.jpg";
import clsu2022co4 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-4.jpg";
import clsu2022co5 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-5.jpg";
import clsu2022co6 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-6.jpg";
import clsu2022co7 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-7.jpg";
import clsu2022co8 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-8.jpg";
import clsu2022co9 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-9.jpg";
import clsu2022co10 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-10.jpg";
import clsu2022co11 from "@/assets/v2/images/experience/clsu2022/carousel/carousel-11.jpg";

import philrice2021co1 from "@/assets/v2/images/experience/philrice2021/carousel/carousel-1.jpg";
import philrice2021co2 from "@/assets/v2/images/experience/philrice2021/carousel/carousel-2.jpg";
import philrice2021co3 from "@/assets/v2/images/experience/philrice2021/carousel/carousel-3.jpg";
import philrice2021co4 from "@/assets/v2/images/experience/philrice2021/carousel/carousel-4.jpg";

import wideout2020co1 from "@/assets/v2/images/experience/wideout2020/carousel/carousel-1.jpg";
import wideout2020co2 from "@/assets/v2/images/experience/wideout2020/carousel/carousel-2.jpg";
import wideout2020co3 from "@/assets/v2/images/experience/wideout2020/carousel/carousel-3.jpg";
import wideout2020co4 from "@/assets/v2/images/experience/wideout2020/carousel/carousel-4.jpg";

import clsu2019co1 from "@/assets/v2/images/experience/clsu2019/carousel/carousel-1.jpg";
import clsu2019co2 from "@/assets/v2/images/experience/clsu2019/carousel/carousel-2.jpg";

import technodream2019co1 from "@/assets/v2/images/experience/technodream2019/carousel/carousel-1.jpg";
import technodream2019co2 from "@/assets/v2/images/experience/technodream2019/carousel/carousel-2.jpg";
import technodream2019co3 from "@/assets/v2/images/experience/technodream2019/carousel/carousel-3.jpg";

import profilePicLightDefault from "@/assets/v2/images/profile-pic/light/default.jpg";
import profilePicLightHover from "@/assets/v2/images/profile-pic/light/hover.jpg";
import profilePicLightClicked from "@/assets/v2/images/profile-pic/light/clicked.jpg";

import profilePicDarkDefault from "@/assets/v2/images/profile-pic/dark/default.jpg";
import profilePicDarkHover from "@/assets/v2/images/profile-pic/dark/hover.jpg";
import profilePicDarkClicked from "@/assets/v2/images/profile-pic/dark/clicked.jpg";

import resume from "@/assets/v2/documents/JBautista-Resume-2026.pdf";

// ─── Data ────────────────────────────────────────────────────────────────────

const profile = {
  name: "Jan Bautista",
  initials: "JB",
  title: "Full-Stack Developer",
  location: "Nueva Ecija, Philippines",
  email: "yjaphzs@gmail.com",
  resumeUrl: resume,
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
     "I’m a Full-Stack Developer passionate about building useful, modern web apps. My experience spans university systems, creative web ads, IT support, and scalable financial technology platforms—always focused on making things simpler and more impactful.",
     "My latest experience is with a financial technology company, where I architected and developed real-time, scalable web systems and internal portals for secure asset valuation and management.",
     "At CLSU, I led the development of institution-wide platforms and taught programming, bridging technical solutions with real user needs.",
  ],
  socials: [
    { 
      name: "GitHub",
      url: "https://github.com/yjaphzs",
      icon: Github
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/yjaphzs/",
      icon: Linkedin,
    }
  ],
};

export const experience = [
  {
    company: "Globalco",
    shortName: "Globalco",
    url: "",
    roles: [
      {
        title: "Full-Stack Developer",
        period: "Aug 2025 – Present",
        bullets: [
          "Architected scalable systems using ReactJS, Firebase (Firestore, Auth, Functions, etc.), and Micro-frontend monorepo architecture.",
          "Developed custom WordPress themes and integrated PHP scripts using a modern HTML/SASS/JS workflow.",
          "Modernized backend workflows by converting local Python scripts into callable APIs via Cloud Functions.",
          "Streamlined deployment by designing and implementing CI/CD pipelines using GitHub Actions.",
          "Collaborated closely with cross-functional teams including developers, data engineers, data scientists, and QA specialists to deliver high-quality, scalable solutions.",
        ],
      },
    ],
    carouselImages: [
      global2025co1,
      global2025co2,
      global2025co3,
      global2025co4,
    ]
  },
  {
    company: "Central Luzon State University",
    shortName: "CLSU",
    url: "https://clsu.edu.ph/",
    roles: [
      {
        title: "Full-Stack Developer",
        period: "Aug 2022 – Jun 2025",
        bullets: [
          "Built and maintained full-stack web applications using Laravel, Livewire, Bootstrap, JavaScript, SASS, and MySQL to support the university’s research, extension, and administrative processes.",
          "Worked closely with administrative offices and the MISO team to understand their needs and turn them into practical digital tools that streamlined their workflows.",
          "Provided regular support and training to faculty and staff, helping them navigate the systems, resolve issues, and confidently use the tools in their daily work.",
          "Regularly improved and updated system features based on user feedback to ensure alignment with the institution’s research and development initiatives.",
          "Performed regular system checks and security reviews to protect against threats like Remote Code Execution (RCE) attacks and SEO poisoning, making sure everything stayed safe and reliable.",
        ],
      },
      {
        title: "Instructor I",
        period: "Aug 2022 – Jun 2025",
        bullets: [
          "Delivered lectures and facilitated laboratory classes on programming-related subjects.",
          "Developed and prepared instructional materials, including PowerPoint presentations and other teaching resources.",
          "Advised students on Capstone Projects and On-the-Job Training (OJT), providing academic and technical guidance.",
          "Provided mentorship and support to students beyond official working hours to help them succeed academically and professionally.",
          'Participated in research and extension activities as a faculty researcher for the project titled "CLSU Virtual Explorer: Embracing CLSU\'s Rich Heritage and Modern Technology through an Interactive Virtual Journey (A Virtual Explorer Web Application)."',
          "Served as Chair and Panel Critic in multiple Capstone Project defenses.",
          "Maintained Outstanding Faculty Performance Ratings throughout the entire duration of employment and recognized as the Highest Rated Outstanding IT Faculty by Students for both the 1st and 2nd Semesters of S.Y. 2023–2024.",
        ],
      },
    ],
    carouselImages: [
      clsu2022co1,
      clsu2022co2,
      clsu2022co3,
      clsu2022co4,
      clsu2022co5,
      clsu2022co6,
      clsu2022co7,
      clsu2022co8,
      clsu2022co9,
      clsu2022co10,
      clsu2022co11,
    ]
  },
  {
    company: "Philippine Rice Research Institute",
    shortName: "PhilRice",
    url: "https://www.philrice.gov.ph/",
    roles: [
      {
        title: "Information System Analyst I",
        period: "Oct 2021 – Aug 2022",
        bullets: [
          "Provided IT support for the division, creating and updating training materials (tarpaulins, PowerPoints, infographics) and offering technical assistance.",
          "Documented activities and training sessions as the photo documentation personnel",
          "Edited photos and videos to support training materials and promotional activities.",
          "Supported online learning and training sessions, including the Training of Trainers on Rice Integrated Crop Management (PalayCheck) for 32 Sri Lankan agricultural workers, backed by DFA-TCCP.",
        ],
      },
    ],
    carouselImages: [
      philrice2021co1,
      philrice2021co2,
      philrice2021co3,
      philrice2021co4,
    ]
  },
  {
    company: "Wideout (AQA)",
    shortName: "Wideout",
    url: "https://www.aqa.work/",
    roles: [
      {
        title: "Quality Assurance Specialist",
        period: "Nov 2020 – Sep 2021",
        bullets: [
          "Ensured that the developed creatives were pixel-perfect based on the instructions and design specifications.",
          "Followed a standardized process to QA the work of creative developers.",
          "Tested and debugged creatives also ensured cross-browser compatibility of creative web advertisements.",
        ],
      },
      {
        title: "Creative Developer",
        period: "Nov 2020 – Sep 2021",
        bullets: [
          "Converted designs into pixel-perfect animated and static web ads using HTML, CSS, and vanilla JavaScript.",
          "Produced multiple banner sizes (160x600, 300x250, 300x600, 728x90, etc.) for creative ads based on initial designs.",
          "Designed and created storyboards in Adobe Photoshop to illustrate concepts and animations for web ads.",
          "Tested and debugged creatives, ensuring cross-browser compatibility.",
        ],
      },
    ],
    carouselImages: [
      wideout2020co1,
      wideout2020co2,
      wideout2020co3,
      wideout2020co4,
    ]
  },
  {
    company: "Central Luzon State University",
    shortName: "CLSU",
    url: "https://clsu.edu.ph/",
    roles: [
      {
        title: "Part-time Instructor",
        period: "Aug 2019 – Apr 2020",
        bullets: [
          "Lecturer for both lecture and laboratory classes on programming subjects.",
          "Prepare learning materials such as PowerPoint presentations and other instructional resources.",
          "Serve as Capstone and OJT advisor for IT students to provide guidance and support.",
        ],
      },
    ],
    carouselImages: [
      clsu2019co1,
      clsu2019co2,
    ]
  },
  {
    company: "TechnoDream Web Works",
    shortName: "TechnoDream",
    url: "https://technodreamoutsourcing.com/",
    roles: [
      {
        title: "Programmer",
        period: "Feb 2019 – May 2019",
        bullets: [
          "Converted daily web designs into pixel-perfect, responsive static web pages using HTML, CSS, and JavaScript.",
          "Successfully converted 34+ designs into responsive web pages.",
          "Assisted in migrating pages from an outdated website to a new WordPress template for Turkey Travel Planner, increasing delivery time by 60% and converting up to 20% of the pages.",
        ],
      },
    ],
    carouselImages: [
      technodream2019co1,
      technodream2019co2,
      technodream2019co3,
    ]
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
  {
    title: "Turkey Travel Planner",
    fullTitle: "Turkey Travel Planner by Jimmy Çay (chai)",
    description:
      "A comprehensive travel guide website for Turkey, featuring detailed information on destinations, itineraries, and travel tips to help travelers plan their trips effectively.",
    url: "https://turkeytravelplanner.com/",
    tech: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Makisig Rescue 3121",
    fullTitle: "Makisig Rescue 3121 Emergency Alerting App with GIS Mapping & Tracking System",
    description:
      "An undergraduate capstone project that provides real-time emergency alerting and location tracking to enhance disaster response and public safety.",
    url: "",
    tech: ["Firebase", "Laravel", "Bootstrap", "MySQL", "JavaScript"],
  }
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
            <CardContent className="relative flex flex-col sm:flex-row items-start gap-4">
              {/* Theme toggle */}
              <div className="absolute top-0 right-3">
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
                        <span className="hidden xs:inline sm:inline">
                          {social.name}
                        </span>
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
                  <CardTitle className="font-semibold uppercase tracking-wide">
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
                  <CardTitle className="font-semibold uppercase tracking-wide">
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
                <CardContent className="space-y-3">
                  {Object.entries(techStack).slice(0,3).map(([category, techs]) => {
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
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Projects */}
            <motion.div {...fadeUp(0.3)}>
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-semibold uppercase tracking-wide">
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
                    {projects.slice(0, 3).map((project, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-border p-3.5 flex flex-col"
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
                  <CardTitle className="font-semibold uppercase tracking-wide">
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
                        <p className="text-[13px] font-medium">{edu.degree}</p>
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

            {/* Gallery */}
            <motion.div {...fadeUp(0.4)}>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="font-semibold uppercase tracking-wide">
                    Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <Carousel className="w-[calc(100%-6rem)]">
                    <CarouselContent className="-ml-1">
                      {CAROUSEL_IMAGES.map((img, index) => (
                        <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 pl-1 lg:basis-1/5">
                          <ImageZoom>
                            <img
                              src={img}
                              alt={`Gallery image ${index + 1}`}
                              className="object-cover w-full h-full rounded-md aspect-square border border-border cursor-zoom-in"
                            />
                          </ImageZoom>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
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
                  <CardTitle className="font-semibold uppercase tracking-wide">
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
                            idx === relevantExperience.length - 1 &&
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
                  <CardTitle className="font-semibold uppercase tracking-wide">
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
