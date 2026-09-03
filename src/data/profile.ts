import {
  profilePhoto,
  profilePicLightDefault,
  profilePicLightHover,
  profilePicLightClicked,
  profilePicDarkDefault,
  profilePicDarkHover,
  profilePicDarkClicked,
} from "@/data/assets";
import {
  Github,
  Linkedin,
} from "lucide-react";

const profile = {
  name: "Jan Bautista",
  fullName: "Jan P. Bautista",
  initials: "JPB",
  title: "Senior Full-Stack Developer",
  location: "Makati City, Philippines",
  email: "yjaphzs@gmail.com",
  website: "yjaphzs.xyz",
  /** Served from public/ — bundlers have no asset rule for PDFs. */
  resumeUrl: "/documents/JBautista-Resume-2026.pdf",
  /**
   * v3's portrait — one static WebP, identical in both themes.
   *
   * `avatarImages` below stays for the archived v2, which still renders the
   * theme-aware hover/click set it shipped with.
   */
  avatar: profilePhoto,
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
     "I’m a full-stack engineer. I build modern web apps and the services behind them, and these days I’m focused on AI-powered products.",
     "Right now I’m building for a fintech client, leading both the front-end and the back-end. I love turning rough ideas into things people actually use — and lately that’s meant a lot of generative AI.",
     "Before that I spent a few years building platforms for a university, and taught programming along the way. Different world, same job: figure out what people actually need, then build it.",
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

export default profile;