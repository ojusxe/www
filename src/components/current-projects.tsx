import { CURRENT_PROJECTS } from "@/constants/home";
import Link from "next/link";

export default function CurrentProjects() {
  return (
    <>
      <h4>SOME PROJECTS I&apos;M WORKING ON:</h4>
      <ul>
        {CURRENT_PROJECTS.map((project) => (
          <li key={project.url}>
            <a href={project.url}>{project.title}</a>{" "}
            - {project.description}
          </li>
        ))}
      </ul>
      <p className="text-xs font-mono mt-2">
        <Link href="/projects" className="hover:underline">
          view past projects →
        </Link>
      </p>
    </>
  );
}
