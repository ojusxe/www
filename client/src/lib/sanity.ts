import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5x6lmona'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2023-06-20'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to ensure fresh data
  token: process.env.SANITY_TOKEN, // Only for private datasets or authenticated requests
})

// For public data queries (no token needed)
export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Can use CDN for public data
})
