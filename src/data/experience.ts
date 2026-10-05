import {
  global2025co1,
  global2025co2,
  global2025co3,
  global2025co4,
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
  philrice2021co1,
  philrice2021co2,
  philrice2021co3,
  philrice2021co4,
  wideout2020co1,
  wideout2020co2,
  wideout2020co3,
  wideout2020co4,
  clsu2019co1,
  clsu2019co2,
  technodream2019co1,
  technodream2019co2,
  technodream2019co3,
} from "@/data/assets";

export const experience = [
  {
    id: "globalco-2025",
    company: "Globalco",
    shortName: "Globalco",
    location: "Makati City, NCR",
    url: "https://www.globalco.com/",
    roles: [
      {
        title: "Senior Full-Stack Developer",
        period: "May 2026 – Present",
        bullets: [
          "Lead full-stack development across multiple product teams, owning architecture and delivery so features ship as one system instead of stalling at the hand-off between front end and services.",
          "Drive AI-assisted development through the team’s daily workflow, from scaffolding and code review to test generation, compressing the path from ticket to merged pull request.",
          "Build and deploy containerized AI applications on cloud VMs, powering agentic workflows for data annotation and browser-based data crawling that replaced manual collection work.",
          "Ship subscription billing and credit-metered usage across the portal, covering checkout, payment webhooks and entitlement enforcement, so access and usage limits resolve from a single source of truth.",
          "Ship Next.js front ends on Python FastAPI services over a managed SQL layer, under one typed contract.",
          "Build Firebase applications end to end across authentication, database, storage, serverless functions and hosting, keeping the platform on one managed stack rather than stitched-together infrastructure.",
          "Integrate e-signature and CRM providers, pushing portal and team updates through webhooks so deal state stays current without manual re-entry.",
          "Integrate email and file-storage APIs and manage service accounts and access control across cloud projects, holding least-privilege boundaries intact as the team grew.",
          "Tune reliability with realtime data, remote configuration and performance monitoring, surfacing regressions early and flipping feature flags without a redeploy.",
          "Mentor junior developers and partner with data engineers, data scientists and QA, turning research and test findings into product improvements that ship on the same cycle.",
        ],
      },
      {
        title: "Full-Stack Developer",
        period: "Aug 2025 – May 2026",
        bullets: [
          "Re-architected a monolithic React frontend into a micro-frontend platform on Firebase, a host app loading ten independently deployed apps at runtime, migrated one domain at a time with no downtime.",
          "Converted Data Science and Data Engineering research code into production Python FastAPI services with contracts, auth, tests and deployment pipelines, making research models callable by the product.",
          "Designed CI/CD pipelines that cut releases to a single push, removing hand-run deployment steps.",
          "Rebuilt the corporate site as a Next.js front end on headless WordPress, modeling Advanced Custom Fields as a GraphQL schema and deploying to Cloud Run, so marketing edits content without a developer in the loop.",
          "Converted local Python scripts into callable serverless APIs, putting one-off analyst tooling behind endpoints the product could consume.",
          "Partnered with developers, data engineers, data scientists and QA specialists to turn cross-team requirements into shipped features, settling scope before build rather than after review.",
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
    id: "clsu-2022",
    company: "Central Luzon State University",
    shortName: "CLSU",
    location: "Science City of Muñoz, Nueva Ecija",
    url: "https://clsu.edu.ph/",
    roles: [
      {
        title: "Full-Stack Developer",
        period: "Aug 2022 – Jun 2025",
        bullets: [
          "Built institution-wide Laravel/Livewire platforms on MySQL, replacing paper and spreadsheet workflows.",
          "Hardened those platforms against Remote Code Execution (RCE) and SEO poisoning through security reviews, removing both classes of vulnerability from institution-facing systems.",
          "Partnered with administrative offices and the MISO team, turning operational needs into working tools.",
          "Iterated on system features from user feedback, keeping platforms aligned with the institution’s research and development initiatives as requirements shifted.",
          "Trained and supported faculty and staff on the systems, resolving issues and driving day-to-day adoption well past the launch period.",
        ],
      },
      {
        title: "Instructor I",
        period: "Aug 2022 – Jun 2025",
        bullets: [
          "Earned Highest Rated Outstanding IT Faculty by Students for the 1st and 2nd Semesters of S.Y. 2023–2024.",
          "Delivered lectures and lab classes on programming, advising Capstone and OJT students to defense.",
          "Maintained Outstanding Faculty Performance Ratings for the full duration of employment.",
          'Served as faculty researcher on "CLSU Virtual Explorer: Embracing CLSU\'s Rich Heritage and Modern Technology through an Interactive Virtual Journey (A Virtual Explorer Web Application)."',
          "Chaired and served as Panel Critic in multiple Capstone Project defenses, holding project scope to a standard students could defend.",
          "Developed instructional materials, including presentations and laboratory resources, giving successive cohorts a consistent baseline.",
          "Mentored students beyond official working hours, supporting their academic and professional growth into internships and first roles.",
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
    id: "philrice-2021",
    company: "Philippine Rice Research Institute",
    shortName: "PhilRice",
    location: "Science City of Muñoz, Nueva Ecija",
    url: "https://www.philrice.gov.ph/",
    roles: [
      {
        title: "Information System Analyst I",
        period: "Oct 2021 – Aug 2022",
        bullets: [
          "Supported the PalayCheck Training of Trainers for 32 Sri Lankan agricultural workers under DFA-TCCP.",
          "Provided division-wide IT support and produced training materials (tarpaulins, PowerPoints, infographics) alongside hands-on technical assistance.",
          "Edited photos and videos to support training materials and promotional activities.",
          "Documented activities and training sessions as the division’s photo documentation personnel.",
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
    id: "wideout-2020",
    company: "Wideout (AQA)",
    shortName: "Wideout",
    location: "Makati City, NCR",
    url: "https://core.wideout.com/",
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
        period: "Aug 2020 – Nov 2020",
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
    id: "clsu-2019",
    company: "Central Luzon State University",
    shortName: "CLSU",
    location: "Science City of Muñoz, Nueva Ecija",
    url: "https://clsu.edu.ph/",
    roles: [
      {
        title: "Part-time Instructor",
        period: "Aug 2019 – Apr 2020",
        bullets: [
          "Lectured both lecture and laboratory classes on programming subjects.",
          "Prepared learning materials such as presentations and other instructional resources.",
          "Advised Capstone and OJT students, guiding projects from proposal through defense.",
        ],
      },
    ],
    carouselImages: [
      clsu2019co1,
      clsu2019co2,
    ]
  },
  {
    id: "technodream-2019",
    company: "TechnoDream Web Works",
    shortName: "TechnoDream",
    location: "Baguio, Benguet",
    url: "https://technodreamoutsourcing.com/",
    roles: [
      {
        title: "Programmer",
        period: "Feb 2019 – May 2019",
        bullets: [
          "Converted 34+ web designs into pixel-perfect, responsive static pages using HTML, CSS, and JavaScript.",
          "Migrated Turkey Travel Planner from an outdated site onto a new WordPress template, speeding up delivery by 60% and converting up to 20% of the pages.",
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

const RELEVANT_TITLES = [
  "Senior Full-Stack Developer",
  "Full-Stack Developer",
  "Quality Assurance Specialist",
  "Creative Developer",
  "Programmer",
];

export const relevantExperience = experience
  .map((exp) => ({
    ...exp,
    roles: exp.roles.filter((role) => RELEVANT_TITLES.includes(role.title)),
  }))
  .filter((exp) => exp.roles.length > 0);

/**
 * Experience id → plain image URLs.
 *
 * The gallery components take `string[]`: they preload with `new Image()` and
 * index into the array, and they key effects on the array's identity. Mapping
 * `.src` inline in JSX would build a new array on every render and restart the
 * preloader each time, so it is derived once here instead.
 */
export const carouselSrcs: Record<string, string[]> = Object.fromEntries(
  experience.map((exp) => [exp.id, exp.carouselImages.map((img) => img.src)])
);