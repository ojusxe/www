import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5x6lmona";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2023-06-20";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // enable to use caching
  useCdn: false,
  token: process.env.SANITY_TOKEN
});

export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // since its public data, we can use cdn
  useCdn: true,
});

// i guess this renders the images from their CDN hosted assets
const builder = imageUrlBuilder(publicClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
