export const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5x6lmona",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-06-20",
} as const;

export const SANITY_QUERIES = {
  profile: `*[_type == "profile"] | order(_updatedAt desc)[0] {
    _id,
    title,
    "cvUrl": cv.asset->url
  }`,
  resources: `*[_type == "resource"] | order(order asc, _createdAt desc) {
    _id,
    title,
    url,
    description,
    order,
    _updatedAt
  }`,
  galleryItems: `*[_type == "galleryItem"]{
    _id,
    caption,
    "imageUrl": media.asset->url,
    "width": media.asset->metadata.dimensions.width,
    "height": media.asset->metadata.dimensions.height
  }`,
  musicTracks: `*[_type == "musicTrack"]{
    _id,
    title,
    "url": audioFile.asset->url,
    _updatedAt
  }`,
} as const;
