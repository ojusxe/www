import { Project } from "@/types/projects";

export const projects: Project[] = [
  {
    title: "PAGEO.ME",
    description: [
      "all-in-one link management platform using next.js, typescript, and custom tailwind css, integrating drizzle orm growing the active user base to 100+ through continuous ux improvements.",
    ],
    teammates: [
      { name: "sanyam", url: "https://sanyam.xyz" },
      { name: "aviral", url: "https://aviral.xyz/" },
    ],
    image: {
      src: "/projects/pageo.webp",
      alt: "pageo.me link-in-bio platform",
    },
    links: [
      {
        url: "https://pageo.me",
        label: "visit",
        type: "external",
      },
      {
        url: "https://www.producthunt.com/products/pageo-me",
        label: "product hunt",
        type: "external",
      },
      {
        url: "https://peerlist.io/sanyamm/project/pageome",
        label: "peerlist",
        type: "external",
      },
    ],
  },
  {
    title: "HOBBY SCOPE",
    description: [
      "Get a focused 5-8 technique plan tailored to your skill level. No more endless YouTube rabbit holes",
      "Hobby Scope uses AI to create personalized learning plans for your hobbies, helping you get better at your hobbies without overwhelm",
    ],
    image: {
      src: "/projects/hobby-scope.webp",
      alt: "hobby scope",
    },
    links: [
      {
        url: "https://hobby-scope.vercel.app",
        label: "visit",
        type: "external",
      },
      {
        url: "https://github.com/ojusxe/hobby-scope",
        label: "source",
        type: "github",
      },
    ],
  },
  {
    title: "RUPEEBEE",
    description: [
      "a finance awareness cross-platform app that prevents fraud, helps manage personal budget, and spreads financial awareness.",
      "ranked 1st in the 1st edition of psb hackathon series out of 200+ teams, organized by punjab & sind bank.",
      "selected among the top 11 finalists out of 7,000+ teams at the 6th edition of gff - psb series hackathon 2025, jio world convention center, mumbai.",
    ],
    teammates: [
      { name: "nav9v", url: "https://nav9v.me" },
      { name: "nikita", url: "https://iamnikitaa.github.io/" },
      {
        name: "priyam",
        url: "https://priyamsri.vercel.app/",
      },
    ],
    image: {
      src: "/projects/rupeebee.webp",
      alt: "rupeebee finance app",
    },
    links: [
      {
        url: "https://rupeebee.vercel.app",
        label: "visit",
        type: "external",
      },
    ],
  },
  {
    title: "LUMO PLAYGROUND",
    description: [
      "enter lumo's playground where only hands allowed. use gestures to control 3d characters in an interactive playground environment.",
    ],
    teammates: [
      {
        name: "noordeep",
        url: "https://github.com/noorhanspal",
      },
    ],
    image: {
      src: "/projects/lumo-playground.jpg",
      alt: "lumo playground gesture control",
    },
    links: [
      {
        url: "https://github.com/ojusxe/lumo-playground",
        label: "source",
        type: "github",
      },
      {
        url: "https://ojusxe.github.io/lumo-playground/",
        label: "visit",
        type: "external",
      },
    ],
  },
  {
    title: "ROAD ANOMALY DETECTION",
    description: [
      "road anomaly detection was a part of my 6 semester minor project that leverages advanced cv techniques to identify and classify road anomalies, such as potholes, cracks, and other surface irregularities.",
    ],
    teammates: [
      { name: "nav9v", url: "https://nav9v.me" },
      { name: "nikita", url: "https://iamnikitaa.github.io/" },
    ],
    image: {
      src: "/projects/rad.avif",
      alt: "road anomaly detection",
    },
    links: [
      {
        url: "https://github.com/collabdoor/Road-Anomaly-Detection",
        label: "source",
        type: "github",
      },
      {
        url: "https://road-anomaly-detection.streamlit.app/",
        label: "visit",
        type: "external",
      },
    ],
  },
  {
    title: "COLLABDOOR && DUMBAF",
    description: [
      "this community is made by cs undergrad students with intention to build cool stuff that touches a few hundread of lives if not thousand. started the community to provide course relevant resources for cs majors.",
    ],
    teammates: [
      { name: "nav9v", url: "https://nav9v.me" },
      { name: "nikita", url: "https://www.github.com/iamnikitaa" },
      {
        name: "priyam",
        url: "https://priyam-sri.vercel.app/",
      },
    ],
    image: {
      src: "/projects/dumbaf.webp",
      alt: "collabdoor and dumbaf",
    },
    links: [
      {
        url: "https://github.com/collabdoor/dumbAF",
        label: "source",
        type: "github",
      },
      {
        url: "https://collabdoor.github.io/dumbAF",
        label: "visit",
        type: "external",
      },
    ],
  },
  {
    title: "GOPHER GOLANG",
    description: [
      "i wanted to practice to grow out of web dev and not restrict myself to javascript frameworks. golang was a suggested language from a friend sanyam.",
      "project gomini - a backend api built with go and gemini 2.5 to generate intelligent responses based on user prompts.",
      "project stripe-go - implementation of stripe's payment intent api integrated with go backend.",
    ],
    teammates: [{ name: "sanyam", url: "https://sanyam.xyz" }],
    image: {
      src: "/projects/go.webp",
      alt: "gopher and go",
    },
    links: [
      {
        url: "https://github.com/ojusxe/gemini-go",
        label: "source",
        type: "github",
      },
      {
        url: "https://github.com/ojusxe/stripe-payment-intent",
        label: "source",
        type: "github",
      },
    ],
  },
  {
    title: "SCIENTIFIC ILLUSTRATOR PORTFOLIO",
    description: [
      "a professionally designed portfolio website for a scientific illustrator, showcasing their work with a clean, modern interface.",
    ],
    image: {
      src: "/projects/illustrations.webp",
      alt: "scientific illustrator portfolio",
    },
    links: [
      {
        url: "https://oshgupta.com",
        label: "visit",
        type: "external",
      },
    ],
  },
];
