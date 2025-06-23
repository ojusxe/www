import { cn } from "@/lib/utils";
import Image from "next/image";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  className?: string;
}

export function DreamSpace({ items, className }: GalleryProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.id} className="relative group">
            <div className="relative aspect-[4/5] bg-gray-50 border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
            {item.caption && (
              <p className="mt-2 text-xs text-gray-600 font-mono">{item.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
