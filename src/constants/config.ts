import { calculateAge } from "@/lib/utils";

const config = {
  SITE_NAME: "ojus -- dev",
  SITE_DESCRIPTION:
    `ojus, ${calculateAge()}y/o, developer, surrealism digiart, basketball U21.`,
  MAIN_BRANCH: "main",
  SITE_URL: "https://ojus.fyi",
  HEADER: {
    projects: "/projects",
    resources: "/resources",
  },
} as const;

export default config;

