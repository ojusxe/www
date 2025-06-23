import { cn } from "../../lib/utils";
import Image from "next/image";

interface GalleryItem {
  _id: string;
  imageUrl: string;
  caption: string;
  width: number;
  height: number;
}

interface GalleryProps {
  items: GalleryItem[];
  className?: string;
}

export function DreamSpace({ items, className }: GalleryProps) {
  const getScaledDimensions = (originalWidth: number, originalHeight: number) => {
    const minWidth = 300;
    const maxWidth = 600;
    const minHeight = 200;
    const maxHeight = 800;
    
    const aspectRatio = originalWidth / originalHeight;
    
    let newWidth = originalWidth;
    let newHeight = originalHeight;
    
    if (originalWidth < minWidth || originalHeight < minHeight) {
      if (originalWidth < minWidth) {
        newWidth = minWidth;
        newHeight = minWidth / aspectRatio;
      }
      if (newHeight < minHeight) {
        newHeight = minHeight;
        newWidth = minHeight * aspectRatio;
      }
    }
    
    if (newWidth > maxWidth || newHeight > maxHeight) {
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = maxWidth / aspectRatio;
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = maxHeight * aspectRatio;
      }
    }
    
    return {
      width: Math.round(newWidth),
      height: Math.round(newHeight)
    };
  };
  return (
    <div className={cn("w-full", className)}>
      <div className="columns-2 lg:columns-3 ">
        {items.map((item) => {
          const scaledDimensions = getScaledDimensions(item.width || 400, item.height || 300);
          
          return (
            <div key={item._id} className="break-inside-avoid">
              <h5 className="text-sm font-mono text-gray-700 lowercase">{item.caption}</h5>
              <div className="relative group overflow-hidden transition-all duration-300 hover:opacity-95">
                {item.imageUrl && item.imageUrl.endsWith('.gif') ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.caption} 
                    className="w-full h-auto hover:shadow-md transition-shadow" 
                  />
                ) : (
                  <Image
                    src={item.imageUrl}
                    alt={item.caption}
                    width={scaledDimensions.width}
                    height={scaledDimensions.height}
                    className="w-full h-auto hover:shadow-md transition-shadow"
                    style={{ objectFit: 'contain' }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
