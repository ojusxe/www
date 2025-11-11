import { Metadata } from "next";
import MdxLayout from "../../components/ui/mdx-layout";
import { publicClient } from "../../lib/sanity";
import { Resource } from "../../types/sanity";

export const metadata: Metadata = {
  title: "resources",
  description:
    "links i've found interesting, helpful, inspiring or cool (firefox bookmarks).",
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getResources(): Promise<Resource[]> {
  const query = `*[_type == "resource"] | order(order asc, _createdAt desc) {
    _id,
    title,
    url,
    description,
    order
  }`;

  return publicClient.fetch(query);
}

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <MdxLayout>
      <h2>RESOURCES</h2>
      <h4>UPDATED 5/27/2025</h4>

      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.title}
            </a>{" "}
            - {resource.description}
          </li>
        ))}
      </ul>
    </MdxLayout>
  );
}
