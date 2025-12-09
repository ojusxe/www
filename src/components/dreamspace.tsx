"use client";

import { cn } from "../lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { HiRefresh } from "react-icons/hi";
import { GalleryItem } from "../types/sanity";

interface GalleryProps {
  items: GalleryItem[];
  className?: string;
}

interface ModalProps {
  item: GalleryItem;
  isOpen: boolean;
  onClose: () => void;
}

function GalleryModal({ item, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className=" inset-0 z-50 flex items-center justify-center bg-background backdrop-blur-sm"
      id="gallery-modal"
    >
      <div className="rounded-sm shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-3 z-10 p-2 text-pink-500 hover:text-custom/80 hover:scale-110 transition-all duration-200 bg-white/90 rounded-full shadow-sm"
          aria-label="Close modal"
        >
          <Cross2Icon className="w-5 h-5" />
        </button>

        <div className="p-6 flex flex-col items-center">
          <div className="relative w-auto rounded-sm">
            {item.imageUrl.endsWith(".gif") ? (
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-auto h-auto object-cover pointer-events-none"
              />
            ) : (
              <Image
                src={item.imageUrl}
                alt={item.caption}
                width={item.width}
                height={item.height}
                className="w-auto h-auto object-cover pointer-events-none"
                priority
              />
            )}
          </div>

          <div className="">
            <p className="text-foreground font-mono text-sm tracking-wider uppercase">
              {item.caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <div
      className="mb-4 break-inside-avoid group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-card transition-all duration-300 hover:shadow-xl hover:border-custom/40 hover:-translate-y-1">
        <div className="relative block">
          {item.imageUrl.endsWith(".gif") ? (
            <img
              src={item.imageUrl}
              alt={item.caption}
              className="w-full h-auto object-cover block bg-pink-500"
              style={{ display: "block" }}
            />
          ) : (
            <Image
              src={item.imageUrl}
              alt={item.caption}
              width={item.width}
              height={item.height}
              className="w-full h-auto object-cover block"
              style={{ display: "block" }}
            />
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100 flex items-end justify-center pb-4">
            <div className="text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-mono text-xs tracking-widest uppercase px-3 py-1 bg-black/40 rounded-full backdrop-blur-sm">
                {item.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DreamSpace({ items, className }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    
    setTimeout(() => {
      const modalElement = document.getElementById('gallery-modal');
      if (modalElement) {
        modalElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <>
      <div className={cn("w-full", className)}>
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:balance]">
          {items.map((item) => (
            <GalleryCard
              key={item._id}
              item={item}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      <div className="mt-8 text-center">
        <p className="text-muted-foreground font-mono text-xs tracking-wider">
          {items.length} items found
        </p>
      </div>
    </>
  );
}
