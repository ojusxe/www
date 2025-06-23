import { Metadata } from "next";
import { DreamSpace } from "@/app/dreamspace/dreamspace";
import MdxLayout from "@/components/ui/mdx-layout";

export const metadata: Metadata = {
  title: "DREAMSPACE",
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

export default function Dreamspace() {
  return (
    <MdxLayout>
      <h4>DREAMSPACE:</h4>
      <p>some visuals rendered and diffused along the way.</p>
      <DreamSpace items={galleryItems} />
    </MdxLayout>
  );
}
