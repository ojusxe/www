import { client } from '../../lib/sanity'
import Image from 'next/image'

type GalleryItem = {
  _id: string
  caption: string
  imageUrl: string
}

export default async function DreamspaceGalleryPage() {
  let galleryItems: GalleryItem[] = []
  let error: string | null = null

  try {
    const query = `*[_type == "galleryItem"]{
      _id,
      caption,
      "imageUrl": media.asset->url
    }`

    galleryItems = await client.fetch(query)
  } catch (err) {
    console.error('Error fetching gallery items:', err)
    error = err instanceof Error ? err.message : 'Failed to fetch gallery items'
  }

  if (error) {
    return (
      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dreamspace Gallery</h1>
        <div className="text-red-600 bg-red-50 p-4 rounded-lg">
          <p className="font-semibold">Error loading gallery:</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </main>
    )
  }

  if (!galleryItems || galleryItems.length === 0) {
    return (
      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dreamspace Gallery</h1>
        <div className="text-gray-600 bg-gray-50 p-4 rounded-lg text-center">
          <p>No gallery items found. Add some items to your Sanity CMS!</p>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dreamspace Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div key={item._id} className="space-y-2">
            {item.imageUrl && item.imageUrl.endsWith('.gif') ? (
              <img 
                src={item.imageUrl} 
                alt={item.caption} 
                className="w-full rounded-lg shadow hover:shadow-lg transition-shadow" 
              />
            ) : (
              <Image
                src={item.imageUrl || '/placeholder.jpg'}
                alt={item.caption}
                width={600}
                height={400}
                className="rounded-lg shadow hover:shadow-lg transition-shadow object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            )}
            <p className="text-center text-gray-700 text-sm">{item.caption}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
