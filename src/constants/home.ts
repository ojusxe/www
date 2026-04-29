export const TLDR_IMAGES = [
  { src: "/tldr/indigo.webp", alt: "Indigo" },
  { src: "/tldr/setup.webp", alt: "Clueso setup" },
  { src: "/tldr/waterfall.webp", alt: "Waterfall" },
  { src: "/tldr/blitz.webp", alt: "Blitz part" },
] as const;

export const CURRENT_PROJECTS = [
  {
    title: "otel.ai",
    url: "https://otel.ai",
    description: "ai coworker for hotels GMs",
  },
  {
    title: "pageo.me",
    url: "https://pageo.me",
    description: "all-in-one link management platform",
  },
] as const;

export const WORK_EXPERIENCE = [
  {
    period: "26-",
    company: "otel ai",
    href: "https://clueso.io",
    role: "full-stack engineer",
  },
  {
    period: "26",
    company: "clueso (yc w23)",
    href: "https://clueso.io",
    role: "design engineer intern",
  },
  {
    period: "25-26",
    company: "hammer ai",
    href: "https://hammerai.com",
    role: "maintainer & developer",
  },
  {
    period: "24",
    company: "flib",
    href: "https://flib.store",
    role: "frontend engineer",
  },
  {
    period: "24",
    company: "noviga automation",
    href: "https://noviga.tech",
    role: "react developer intern",
  },
  {
    period: "24",
    company: "meta craftlab",
    href: "https://craftlab.ai",
    role: "unpaid, full-stack training",
  },
  {
    period: "23-24",
    company: "gdsc ikgptu",
    href: "https://www.linkedin.com/company/gdsc-ikgptu/posts/?feedView=all",
    role: "unpaid, team collaboration",
  },
] as const;

export const ACHIEVEMENTS = [
  {
    parts: [
      { text: "winner of 1st edition of " },
      {
        text: "PSB hackathon series",
        href: "https://financialservices.gov.in/beta/en/psb-hackathon",
      },
      { text: " by building SAFE app - " },
      { text: "RupeeBee", href: "https://rupeebee.vercel.app" },
      { text: " organized by punjab & sind bank, MoF" },
    ],
  },
  {
    parts: [
      {
        text: "top 11 finalists out of 7,000+ teams nation wide and presented our SAFE themed banking solution ",
      },
      {
        text: "@global fintech fest '25",
        href: "https://www.globalfintechfest.com/gff-hackathons/psb-hackathon",
      },
      {
        text: " . earned recognition from MoF, Indian Banks' Association at jio world convention center, mumbai",
      },
    ],
  },
  {
    parts: [
      {
        text: "proudly part of my college's basketball inter-college team for 2024 season",
      },
    ],
  },
] as const;
