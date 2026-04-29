import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { SANITY_CONFIG } from "@/constants/sanity";

const { projectId, dataset, apiVersion } = SANITY_CONFIG;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(publicClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
