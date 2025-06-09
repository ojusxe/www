import { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import MdxLayout from "@/components/mdx-layout";

export const metadata: Metadata = {
  title: "GALLERY",
  description: "some visual moments captured along the way.",
};

// Placeholder gallery items - replace with your actual images
// To add your own images:
// 1. Add images to public/gallery/ directory  
// 2. Update the src paths to "/gallery/your-image-name.jpg"
// 3. Update alt text and captions accordingly
const galleryItems = [
  {
    id: "1",
    src: "https://picsum.photos/400/500?random=1",
    alt: "placeholder image",
    caption: "placeholder (25)"
  }
];

export default function GalleryPage() {
  return (
    <MdxLayout>
      <h4>GALLERY:</h4>
      <p>some visual moments captured along the way.</p>
      <Gallery items={galleryItems} />
    </MdxLayout>
  );
}
