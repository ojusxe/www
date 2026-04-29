import { Metadata } from "next";
import MdxLayout from "../../components/ui/mdx-layout";
import { BackButton } from "../../components/ui/back-button";
import { publicClient } from "../../lib/sanity";
import { Resource } from "../../types/sanity";
import { formatDate } from "../../lib/utils";
import { SANITY_QUERIES } from "@/constants/sanity";

export const metadata: Metadata = {
  title: "resources",
  description: "links i've found interesting, helpful, inspiring or cool",
};

export const revalidate = 60;

async function getResources(): Promise<Resource[]> {
  return publicClient.fetch(SANITY_QUERIES.resources);
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
      <BackButton href="/" label="back to home" />
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
