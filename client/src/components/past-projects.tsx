import { Snippet } from "./ui/snippet";
import Image from "next/image";
import { GitHubLogoIcon, Link1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ProjectLink {
  url: string;
  label: string;
  type: "github" | "external";
}

interface Teammate {
  name: string;
  url: string;
}

interface PastProject {
  title: string;
  description: string[];
  teammates?: Teammate[];
  image: {
    src: string;
    alt: string;
  };
  links: ProjectLink[];
}

const pastProjects: PastProject[] = [
  {
    title: "ROAD ANOMALY DETECTION",
    description: [
      "road anomaly detection was a part of my 6 semester minor project that leverages advanced CV techniques to identify and classify road anomalies, such as potholes, cracks, and other surface irregularities.",
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
      "this community is made by CS undergrad students with intention to build cool stuff that touches a few hundread of lives if not thousand. started the community to provide course relevant resources for CS majors.",
    ],
    teammates: [
      { name: "nav9v", url: "https://nav9v.me" },
      { name: "nikita", url: "https://www.github.com/iamnikitaa" },
      {
        name: "priyam",
        url: "https://portfolio-priyam-srivastavas-projects-a9e142b7.vercel.app/",
      },
    ],
    image: {
      src: "/projects/dumbaf.avif",
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
      "project stripe-go - implementation of stripe's payment intent API integrated with go backend.",
    ],
    teammates: [{ name: "sanyam", url: "https://sanyam.xyz" }],
    image: {
      src: "/projects/gogo.webp",
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

export default function PastProjects() {
  return (
    <>
      <h4>SOME OF MY PAST PROJECTS</h4>
      {pastProjects.map((project, index) => (
        <Snippet key={index} title={project.title} className="">
          {project.description.map((paragraph, pIndex) => (
            <p key={pIndex}>
              {paragraph.includes("sanyam") ? (
                <>
                  i wanted to practice to grow out of web dev and not restrict
                  myself to javascript frameworks. golang was a suggested
                  language from a friend{" "}
                  <a href="https://sanyam.xyz" target="_blank">
                    sanyam
                  </a>
                  .
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}

          {project.teammates && project.teammates.length > 0 && (
            <p>
              {project.title === "ROAD ANOMALY DETECTION"
                ? "team #22, my awesome teamates "
                : "my awesome teamates "}
              {project.teammates.map((teammate, tIndex) => (
                <span key={tIndex}>
                  <a href={teammate.url} target="_blank">
                    {teammate.name}
                  </a>
                  {tIndex < project.teammates!.length - 1 && " && "}
                </span>
              ))}
            </p>
          )}

          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={800}
            height={450}
            className="rounded-sm"
          />

          <div className="">
            {project.links.map((link, lIndex) => (
              <Link key={lIndex} href={link.url} target="_blank">
                {link.type === "github" ? (
                  <GitHubLogoIcon className="inline-block mr-2" />
                ) : (
                  <Link1Icon className="inline-block mx-2" />
                )}
                {link.label}
              </Link>
            ))}
          </div>
        </Snippet>
      ))}
    </>
  );
}
