import { calculateAge } from "@/lib/utils";

const config = {
  SITE_NAME: "ojus -- dev",
  SITE_DESCRIPTION:
    `ojus, ${calculateAge()}y/o, developer, surrealism digiart, basketball U21.`,
  MAIN_BRANCH: "main",
  SITE_URL: "https://ojus.fyi",
  HEADER: {
    logs: "/logs",
    projects: "/projects",
    resources: "/resources"
  },
} as const;

export const HEADER_NAV_LINKS = [
  { label: "LOGS", href: "/logs" },
  { label: "PROJECTS", href: "/projects" },
  { label: "RESOURCES", href: "/resources" },
] as const;

export const DIRECTORY_LINKS = [
  { label: "logs", href: "/logs" },
  { label: "resources", href: "/resources" },
  { label: "past projects", href: "/projects" },
  { label: "dreamspace", href: "/dreamspace" },
  { label: "radio", href: "/radio" },
  { label: "manage", href: "/manage", suffix: " (only for ojus)" },
] as const;


export default config;

