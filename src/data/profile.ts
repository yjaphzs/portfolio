import {
  resume,
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

export default profile;