import { Metadata } from "next";
import MdxLayout from "../../components/ui/mdx-layout";
import Image from "next/image";
import { GithubLogoIcon, LinkIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import  { projects } from "@/constants/projects";
import { Project } from "@/types/projects";

export const metadata: Metadata = {
  title: "projects",
  description: "a collection of projects i've worked on",
};

// Force static generation - this page uses static data from constants
export const dynamic = 'force-static';

function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="relative w-full mb-6">
      <pre className="prose-p:last-of-type:mb-0 w-full font-mono text-xs p-3 py-2.5 border border-gray-200 text-gray-600 scroll-smooth overflow-auto">
        <div className="w-full text-wrap">
          <span className="font-semibold">{project.title}</span>

          <div className="mt-3 space-y-2">
            {project.description.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-xs leading-relaxed">
                {paragraph}
              </p>
            ))}

            {project.teammates && project.teammates.length > 0 && (
              <p className="text-xs">
                w/{" "}
                {project.teammates.map((teammate, tIndex) => (
                  <span key={tIndex}>
                    <a href={teammate.url} target="_blank" rel="noopener noreferrer">
                      {teammate.name}
                    </a>
                    {tIndex < project.teammates!.length - 1 && " && "}
                  </span>
                ))}
              </p>
            )}
          </div>

          <div className="mt-4">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={800}
              height={450}
              className="rounded-sm"
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIDBAARITESQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ANJjv3JIkeO3OjMoYqZDwSNEfMYxirsyAqoYSZ//2Q=="
            />
          </div>

          <div className="mt-3 flex gap-4">
            {project.links.map((link, lIndex) => (
              <Link
                key={lIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:underline"
              >
                {link.type === "github" ? (
                  <GithubLogoIcon className="size-3.5" />
                ) : (
                  <LinkIcon className="size-3.5" />
                )}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </pre>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <MdxLayout>
      <h2>PROJECTS</h2>
      <h4>A COLLECTION OF PROJECTS I&apos;VE WORKED ON</h4>

      <div className="mt-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} priority={index < 2} />
        ))}
      </div>
    </MdxLayout>
  );
}
