import { publicClient } from '../../lib/sanity'
import { Metadata } from "next"
import { DreamSpace } from "../../components/dreamspace"
import MdxLayout from "../../components/ui/mdx-layout"
import { BackButton } from "../../components/ui/back-button"
import { GalleryItem } from "../../types/sanity"
import { SANITY_QUERIES } from "@/constants/sanity"

export const metadata: Metadata = {
  title: "dreamspace",
  description: "some visual moments captured along the way",
}

export const revalidate = 60

export default async function DreamspaceGalleryPage() {
  let galleryItems: GalleryItem[] = []
  let error: string | null = null

  try {
    galleryItems = await publicClient.fetch(SANITY_QUERIES.galleryItems)
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching gallery items:', err)
    }
    error = err instanceof Error ? err.message : 'Failed to fetch gallery items'
  }

  return (
    <MdxLayout>
      <BackButton href="/" label="back to home" />
      <h2 >DREAMSPACE:</h2>
      <p>some visuals rendered and diffused along the way.</p>
      {error ? (
        <div className="text-red-600 bg-red-50 p-4 rounded-lg mt-4">
          <p className="font-semibold">Error loading gallery:</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : 
      <div className="mt-8">
        <DreamSpace items={galleryItems} />
      </div>}
    </MdxLayout>
  )
}
