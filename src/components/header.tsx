"use client";

import config from "../constants/config";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./theme-toggle";
import MusicToggle from "./music-toggle";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const frameCache = useRef<Map<number, string>>(new Map());
  const frameRate = 20;
  const totalFrames = 50;
  const path = "/ojus-ascii-frames";
  
  // Preload first few frames for instant animation start
  useEffect(() => {
    const preloadFrames = async () => {
      // Preload first 10 frames for instant start
      for (let i = 1; i <= Math.min(10, totalFrames); i++) {
        const fileName = `${path}/frame-${i.toString().padStart(4, "0")}.txt`;
        try {
          const response = await fetch(fileName);
          const text = await response.text();
          frameCache.current.set(i, text);
        } catch (error) {
          console.error(`Failed to preload frame ${i}:`, error);
        }
      }
    };
    preloadFrames();
  }, []); // Check if intro should play and start immediately
  useEffect(() => {
    const isRootRoute = pathname === "/";
    const playedIntro = sessionStorage.getItem("hasPlayedIntro");
    const body = document.body;
    const main = document.querySelector("main");

    // Play animation if: 1) First time visitor OR 2) On root route (including refresh)
    if (!playedIntro || isRootRoute) {
      // Start animation immediately
      setIsFirstLoad(true);
      // Ensure content is hidden during intro
      if (body) body.classList.remove("background");
      if (main) main.classList.add("opacity");
      playAnimation();

      // Only set sessionStorage if it's not already set (for first-time visitors)
      if (!playedIntro) {
        sessionStorage.setItem("hasPlayedIntro", "true");
      }
    } else {
      // Subsequent visits to non-root pages - show content immediately
      setHasPlayedIntro(true);
      setIsFirstLoad(false);
      if (body) body.classList.add("background");
      if (main) main.classList.remove("opacity");
    }
  }, [pathname]); // Added pathname dependency to trigger on route changes
  // Play animation when navigating to dreamspace (but not from root route refresh)
  useEffect(() => {
    if (pathname === "/dreamspace" && hasPlayedIntro && !isFirstLoad) {
      playAnimation();
    }
  }, [pathname, hasPlayedIntro, isFirstLoad]);

  const loadFrame = async (frameNumber: number) => {
    // Check cache first
    if (frameCache.current.has(frameNumber)) {
      const asciiDisplay = document.getElementById("ascii-display");
      if (asciiDisplay) {
        asciiDisplay.innerText = frameCache.current.get(frameNumber)!;
      }
      return;
    }

    const fileName = `${path}/frame-${frameNumber
      .toString()
      .padStart(4, "0")}.txt`;

    try {
      const response = await fetch(fileName);
      const asciiArt = await response.text();
      
      // Cache the frame
      frameCache.current.set(frameNumber, asciiArt);

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
    const themeColorMeta = document.querySelector(
      "meta[name='theme-color']"
    ) as HTMLMetaElement;
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
        setCurrentFrame(1);
        setIsAnimating(false);
        setIsFirstLoad(false);
        setHasPlayedIntro(true);
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
    if (pathname !== "/") {
      setTimeout(() => {
        router.push("/");
      }, 200);
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
    <header
      className="flex justify-between font-mono items-start w-full py-4 text-gray-600"
      id="top"
    >
      <div className="flex items-center gap-2">
        <Link href="" onClick={handleClick} className="inline-block">
          {/* <div className="h-6 w-6 aspect-square border border-white bg-custom hover:opacity-100 opacity-80 cursor-pointer"></div> */}
          <Image
            src="/ojusxe.webp"
            alt="insignia"
            width={28}
            height={28}
            className="h-6 w-6 aspect-square opacity-80 cursor-pointer pointer-events-none"
          />
        </Link>
        <ThemeToggle />
        <MusicToggle />
      </div>
      <div className="flex items-center gap-4 ">
        <div className="flex items-center gap-2 underline text-sm ">
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
