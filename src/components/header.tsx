'use client';

import config from "@/constants/config";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./theme-toggle";

declare global {
  interface Window {
    pako: any;
  }
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(7);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  const frameRate = 45;
  const totalFrames = 72;
  const path = "/assets/dris-frames-alt";

  const decompressAsciiArt = (compressedBase64: string) => {
    if (!window.pako) return "";
    
    const compressedData = atob(compressedBase64);
    const compressedArray = new Uint8Array(compressedData.length);
    for (let i = 0; i < compressedData.length; i++) {
      compressedArray[i] = compressedData.charCodeAt(i);
    }
    const decompressedArray = window.pako.inflate(compressedArray);
    return new TextDecoder().decode(decompressedArray);
  };

  const loadFrame = async (frameNumber: number) => {
    const fileName = `${path}/frame-${frameNumber.toString().padStart(6, "0")}.txt.gz`;
    
    try {
      const response = await fetch(fileName);
      const compressedBase64 = await response.text();
      const asciiArt = decompressAsciiArt(compressedBase64);
      
      const asciiDisplay = document.getElementById("ascii-display");
      if (asciiDisplay) {
        asciiDisplay.innerText = asciiArt;
      }
    } catch (error) {
      console.error("Failed to load frame:", error);
    }
  };

  const playAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Update theme color
    const themeColorMeta = document.querySelector("meta[name='theme-color']") as HTMLMetaElement;
    if (themeColorMeta) themeColorMeta.content = "#4d5eff";
    
    // Get elements
    const asciiDisplay = document.getElementById("ascii-display");
    const main = document.querySelector("main");
    const body = document.body;
    
    // Show animation
    if (asciiDisplay) asciiDisplay.classList.remove("opacity");
    if (body) body.classList.remove("background");
    if (main) main.classList.add("opacity");
    
    let frame = currentFrame;
    
    const animate = () => {
      loadFrame(frame);
      frame++;
      
      if (frame > totalFrames) {
        // Hide animation
        if (asciiDisplay) asciiDisplay.classList.add("opacity");
        if (body) body.classList.add("background");
        if (main) main.classList.remove("opacity");
        
        // Reset state
        setCurrentFrame(7);
        setIsAnimating(false);
        if (themeColorMeta) themeColorMeta.content = "#ffffff";
        return;
      }
      
      setCurrentFrame(frame);
      animationRef.current = setTimeout(animate, frameRate);
    };
    
    animate();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playAnimation();
    
    // Only navigate if we're not already on the home page
    if (pathname !== '/') {
      setTimeout(() => {
        router.push('/');
      }, (totalFrames - currentFrame + 1) * frameRate + 500);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return (
    <header className="flex justify-between font-mono items-start w-full py-4 text-gray-600" id="top">
      <div>
      <Link href="/" onClick={handleClick} className="inline-block mr-2">
        <div className="h-6 w-6 aspect-square bg-custom hover:opacity-100 opacity-80 cursor-pointer"></div>
      </Link>
      <ThemeToggle />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 underline text-sm">
          {Object.entries(config.HEADER).map(([key, value]) => (
            <Link href={value} key={key}>
              {key.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

