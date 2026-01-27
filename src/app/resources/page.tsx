import { Metadata } from "next";
import MdxLayout from "../../components/ui/mdx-layout";
import { publicClient } from "../../lib/sanity";
import { Resource } from "../../types/sanity";
import { formatDate } from "../../lib/utils";

export const metadata: Metadata = {
  title: "resources",
  description: "links i've found interesting, helpful, inspiring or cool",
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getResources(): Promise<Resource[]> {
  const query = `*[_type == "resource"] | order(order asc, _createdAt desc) {
    _id,
    title,
    url,
    description,
    order,
    _updatedAt
  }`;

  return publicClient.fetch(query);
}

export default async function ResourcesPage() {
  const resources = await getResources();

  const lastUpdated = resources.reduce((latest, resource) => {
    const resourceDate = new Date(resource._updatedAt);
    return resourceDate > latest ? resourceDate : latest;
  }, new Date(0));

  const lastUpdatedDate = formatDate(lastUpdated);

  return (
    <MdxLayout>
      <h2>RESOURCES</h2>
      <h5>LAST UPDATED {lastUpdatedDate}</h5>

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
