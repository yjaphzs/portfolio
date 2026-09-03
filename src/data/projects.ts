export type Project = {
  title: string;
  fullTitle: string;
  description: string;
  url: string;
  tech: string[];
  /**
   * Tighter one-line variant for the printed resume, which renders a project as
   * a single bullet on a fixed one-page budget. Falls back to `description`.
   */
  resumeLine?: string;
};

export const projects: Project[] = [
  {
    title: "Barkr AI Portal",
    fullTitle: "Barkr AI Portal",
    description:
      "Micro-frontend portal for financial institutions covering asset valuation and collateral management. A host app loads around ten independently deployed React apps at runtime, backed by Firebase and Python FastAPI services, with subscription billing and a credit system metering submissions and contracts.",
    resumeLine:
      "Micro-frontend portal for asset valuation and collateral management — ~10 runtime-loaded React apps on Firebase and FastAPI, with subscription billing and credit-metered usage.",
    url: "https://portal.barkr.ai/",
    tech: ["React", "Module Federation", "Firebase", "TypeScript", "Python", "FastAPI", "Stripe", "Redis", "Vite", "Shadcn UI", "Tailwind CSS"],
  },
  {
    title: "Barkr AI Website",
    fullTitle: "Barkr AI Website",
    description:
      "A corporate website for Barkr, a fintech company providing AI-powered valuation solutions for hard assets to support financial institutions in lending decisions.",
    url: "https://barkr.ai/",
    tech: ["WordPress", "PHP", "HTML", "CSS", "SCSS", "JavaScript"],
  },
  {
    title: "Cariño Tailor Shop",
    fullTitle: "Cariño Tailor Shop Management System",
    description:
      "A complete operations platform for a tailoring and dry-cleaning business — orders, per-piece production tracking, inventory, payroll, and a full double-entry accounting suite that auto-posts from daily operations. Works offline, with a separate touch interface for the shop counter and public order tracking for customers.",
    resumeLine:
      "Solo-built operations platform for a tailoring business — production tracking, inventory and payroll on a double-entry accounting engine, offline-capable with public order tracking.",
    url: "",
    tech: ["Next.js", "TypeScript", "Firebase", "Cloud Functions", "Tailwind CSS", "Shadcn UI", "PWA"],
  },
  {
    title: "Data Annotation Platform",
    fullTitle: "Human-in-the-Loop Data Annotation & QA Platform",
    description:
      "An internal platform where reviewers annotate and quality-check a collection of over 100,000 generated images, growing toward millions. Queued review feeds with a second-pass stage, bulk import and export, per-reviewer throughput analytics, role-based access with multi-factor authentication, and full activity auditing — with query and listener patterns tuned so read cost stays flat as the collection grows.",
    resumeLine:
      "Human-in-the-loop annotation platform over a 100k+ image collection — queued review and second-pass feeds, reviewer analytics, and read patterns tuned to keep query cost flat at scale.",
    url: "",
    tech: ["Next.js", "TypeScript", "React", "Firebase", "Cloud Functions", "Python", "Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "Research Data Portal",
    fullTitle: "Server-Rendered Research Data Portal",
    description:
      "A server-rendered portal over a large curated reference collection, assembled by an ingestion pipeline that parses source documents into structured records with extracted page images. Server components on a managed SQL data layer with cached reads, a server-verified session model, and role-based access across public and internal views.",
    resumeLine:
      "Server-rendered portal over a curated collection parsed from source documents into structured records with page images — server components on a managed SQL layer with cached reads.",
    url: "",
    tech: ["Next.js", "TypeScript", "React", "PostgreSQL", "Redis", "Firebase", "Tailwind CSS"],
  },
  {
    title: "App Hub",
    fullTitle: "App Hub",
    description:
      "A centralized launcher for all my personal web apps, providing quick access to each project in one place.",
    url: "https://app-hub.yjaphzs.xyz",
    tech: ["React", "TypeScript", "Vite", "Shadcn UI", "Framer Motion", "Tailwind CSS"],
  },
  {
    title: "Expense Tracker",
    fullTitle: "Expense Tracker",
    description:
      "A simple web app that helps users track their expenses and manage their budget effectively.",
    url: "https://yjaphzs.github.io/expense-tracker/",
    tech: ["React", "TypeScript", "Vite", "Shadcn UI", "Lucide React", "ESLint", "Tailwind CSS"],
  },
  {
    title: "GWA Calculator",
    fullTitle: "Grade Weighted Average (GWA) Calculator",
    description:
      "A simple web app that calculates students' Grade Weighted Average (GWA) based on their course grades and credit units, providing an easy way for students to track their academic performance.",
    url: "https://yjaphzs.github.io/gwa-calculator/",
    tech: ["React", "TypeScript", "Vite", "Shadcn UI", "Lucide React", "ESLint", "Tailwind CSS"],
  },
  {
    title: "CLSU IT Discord Bot",
    fullTitle: "CLSU IT Discord Bot for Streamlined Support & Engagement",
    description:
      "A custom-built Discord bot designed to enhance communication and support for CLSU IT Discord Community providing features such as automated responses, moderation, and real-time updates on IT-related announcements.",
    url: "",
    tech: ["Node.js", "Discord.js", "JavaScript", "Ollama", "Docker"],
  },
  {
    title: "RADIIS (v2.0)",
    fullTitle: "Research & Development Integrated Information System",
    description:
      "Institution-wide platform managing CLSU's research portfolio — programs, projects, studies, publications, intellectual property and researcher profiles across ~129 tables. Role-based access scoped to the university's structure, two-factor auth, activity auditing, PDF/Excel reporting and geographic research mapping.",
    resumeLine:
      "Institution-wide research management platform — ~129 tables covering programs, projects, publications and IP, with org-scoped RBAC, 2FA, auditing and PDF/Excel reporting.",
    url: "https://radiis.clsu.edu.ph",
    tech: ["PHP", "Laravel", "Livewire", "HTML & CSS", "JavaScript", "SASS/SCSS", "MySQL", "Bootstrap"],
  },
  {
    title: "BASIS",
    fullTitle: "Business Affairs Strategic Integrated System",
    description:
      "Centralized platform modernizing CLSU's business operations — contracts and agreements, incident reporting, project statements and a rice program module, sharing the institutional structure and component library built for RADIIS.",
    url: "https://basis.clsu.edu.ph",
    tech: ["PHP", "Laravel", "Livewire", "HTML & CSS", "JavaScript", "SASS/SCSS", "MySQL", "Bootstrap"],
  },
  {
    title: "CLSU Virtual Explorer",
    fullTitle: "Interactive 360° Virtual Campus Tour",
    description:
      "An interactive web app that lets anyone explore CLSU's campuses through immersive 360-degree panoramic images.",
    url: "https://360.clsu.edu.ph",
    tech: ["3DVista", "HTML & CSS", "JavaScript"],
  },
  {
    title: "UEPOMS",
    fullTitle: "University Extension Program Office Management System",
    description:
      "A web-based management system designed to streamline the operations of university extension programs, including project tracking, reporting, and stakeholder communication.",
    url: "https://uepoms.clsu.edu.ph",
    tech: ["PHP", "Laravel", "Livewire", "HTML & CSS", "JavaScript", "SASS/SCSS", "MySQL", "Bootstrap"],
  },
  {
    title: "RADIIS (v1.0)",
    fullTitle: "Research & Development Integrated Information System",
    description:
      "A web app to manage and organize CLSU's research programs, projects, and studies with built-in analytics.",
    url: "https://radiis.clsu.edu.ph",
    tech: ["PHP", "Laravel", "HTML & CSS", "JavaScript", "SASS/SCSS", "MySQL", "Bootstrap"],
  },
  {
    title: "WaterVille",
    fullTitle: "WaterVille: A Water Billing and Monitoring System",
    description:
      "A web application designed to manage water billing and monitor water usage for residential and commercial customers, providing real-time data and analytics to promote efficient water consumption.",
    url: "",
    tech: ["PHP", "Laravel", "Jetstream", "HTML & CSS", "JavaScript", "SASS/SCSS", "MySQL", "Bootstrap"],
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
    tech: ["PHP", "Laravel", "Firebase", "Leaflet", "JavaScript", "MySQL", "Bootstrap"],
  }
];

export default projects;