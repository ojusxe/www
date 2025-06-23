import { client } from '../../lib/sanity'
import { Metadata } from "next"
import { DreamSpace } from "./dreamspace"
import MdxLayout from "../../components/ui/mdx-layout"

export const metadata: Metadata = {
  title: "DREAMSPACE",
  description: "some visual moments captured along the way.",
}

type GalleryItem = {
  _id: string
  caption: string
  imageUrl: string
  width: number
  height: number
}

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

    galleryItems = await client.fetch(query)
  } catch (err) {
    console.error('Error fetching gallery items:', err)
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
