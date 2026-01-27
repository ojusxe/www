interface ProjectLink {
  url: string;
  label: string;
  type: "github" | "external";
}

interface Teammate {
  name: string;
  url: string;
}

export interface Project {
  title: string;
  description: string[];
  teammates?: Teammate[];
  image: {
    src: string;
    alt: string;
  };
  links: ProjectLink[];
}
