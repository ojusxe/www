import { publicClient } from "@/lib/sanity";
import { CurrentProject } from "@/types/sanity";

async function getCurrentProjects(): Promise<CurrentProject[]> {
  const query = `*[_type == "currentProject"] | order(order asc) {
    _id,
    title,
    url,
    description,
    order
  }`;
  
  return await publicClient.fetch(query);
}

export default async function CurrentProjects() {
  const projects = await getCurrentProjects();

  return (
    <>
      <h4>SOME PROJECTS I&apos;M WORKING ON:</h4>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            {project.url ? (
              <a href={project.url}>{project.title}</a>
            ) : (
              <span className="font-semibold">{project.title}</span>
            )}{" "}
            - {project.description}
          </li>
        ))}
      </ul>
    </>
  );
}
