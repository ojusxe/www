import { publicClient } from '../../lib/sanity'
import { Metadata } from "next"
import { DreamSpace } from "../../components/dreamspace"
import MdxLayout from "../../components/ui/mdx-layout"
import { GalleryItem } from "../../types/sanity"

export const metadata: Metadata = {
  title: "dreamspace",
  description: "some visual moments captured along the way.",
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function DreamspaceGalleryPage() {
  let galleryItems: GalleryItem[] = []
  let error: string | null = null

  try {
    const query = `*[_type == "galleryItem"]{
      _id,
      caption,
      "imageUrl": media.asset->url,
      "width": media.asset->metadata.dimensions.width,
      "height": media.asset->metadata.dimensions.height
    }`

    galleryItems = await publicClient.fetch(query)
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching gallery items:', err)
    }
    error = err instanceof Error ? err.message : 'Failed to fetch gallery items'
  }

  if (error) {
    return (
      <MdxLayout>
        <h4>DREAMSPACE:</h4>
        <div className="text-red-600 bg-red-50 p-4 rounded-lg">
          <p className="font-semibold">Error loading gallery:</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </MdxLayout>
    )
  }

  return (
    <MdxLayout>
      <h4 className='text-xl'>DREAMSPACE:</h4>
      <p>some visuals rendered and diffused along the way.</p>
      <div className="mt-8">
        <DreamSpace items={galleryItems} />
      </div>
    </MdxLayout>
  )
}
