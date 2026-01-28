"use client";

import config from "../constants/config";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import ThemeToggle from "./theme-toggle";
import Image from "next/image";

const frameRate = 30;
const totalFrames = 50;
const path = "/ojus-ascii-frames";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const frameCache = useRef<Map<number, string>>(new Map());
  const isInitialMount = useRef(true);
  
  // generate your frames : https://howwasyourdayhoney.vercel.app

  // Preload all frames on mount
  useEffect(() => {
    const preloadFrames = async () => {
      const promises = [];
      for (let i = 1; i <= totalFrames; i++) {
        if (!frameCache.current.has(i)) {
          const fileName = `${path}/frame-${i.toString().padStart(4, "0")}.txt`;
          promises.push(
            fetch(fileName)
              .then((res) => res.text())
              .then((text) => frameCache.current.set(i, text))
              .catch((e) => console.error(`Failed to preload frame ${i}`, e))
          );
        }
      }
      await Promise.all(promises);
    };

    preloadFrames();
  }, []);
  
  // Play animation - recursive setTimeout with async fallback
  const playAnimation = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);

    const themeColorMeta = document.querySelector("meta[name='theme-color']") as HTMLMetaElement;
    const asciiDisplay = document.getElementById("ascii-display");
    const main = document.querySelector("main");
    const body = document.body;

    // Setup animation state
    if (themeColorMeta) themeColorMeta.content = "#4d5eff";
    if (asciiDisplay) asciiDisplay.classList.remove("opacity");
    if (body) body.classList.remove("background");
    if (main) main.classList.add("opacity");

    let currentFrame = 1;

    const animate = async () => {
      let text = frameCache.current.get(currentFrame);

      if (!text) {
        try {
          const fileName = `${path}/frame-${currentFrame.toString().padStart(4, "0")}.txt`;
          const res = await fetch(fileName);
          text = await res.text();
          frameCache.current.set(currentFrame, text);
        } catch (e) {
          console.error(`Failed to load frame ${currentFrame}`, e);
        }
      }

      if (asciiDisplay && text) {
        asciiDisplay.innerText = text;
      }
      
      currentFrame++;

      if (currentFrame > totalFrames) {
        // Animation complete
        if (asciiDisplay) asciiDisplay.classList.add("opacity");
        if (body) body.classList.add("background");
        if (main) main.classList.remove("opacity");
        if (themeColorMeta) themeColorMeta.content = "#ffffff";
        setIsAnimating(false);
        setHasPlayedIntro(true);
        return;
      }

      animationRef.current = setTimeout(animate, frameRate);
    };

    animate();
  }, [isAnimating]);

  // Initial mount - play animation immediately on root
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;

    const isRootRoute = pathname === "/";
    const playedIntro = sessionStorage.getItem("hasPlayedIntro");
    const body = document.body;
    const main = document.querySelector("main");

    if (!playedIntro || isRootRoute) {
      // Ensure content is hidden FIRST
      if (body) body.classList.remove("background");
      if (main) main.classList.add("opacity");
      
      // Start animation immediately
      playAnimation();

      if (!playedIntro) {
        sessionStorage.setItem("hasPlayedIntro", "true");
      }
    } else {
      // Show content immediately for returning visitors on non-root
      setHasPlayedIntro(true);
      if (body) body.classList.add("background");
      if (main) main.classList.remove("opacity");
    }
  }, [pathname, playAnimation]);

  // Play animation when navigating to dreamspace
  useEffect(() => {
    if (pathname === "/dreamspace" && hasPlayedIntro && !isAnimating) {
      playAnimation();
    }
  }, [pathname, hasPlayedIntro, isAnimating, playAnimation]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playAnimation();

    if (pathname !== "/") {
      setTimeout(() => {
        router.push("/");
      }, 200);
    }
  };

  return (
    <header
      className="flex justify-between font-mono w-full py-4 text-gray-600 items-center"
      id="top"
    >
      <div className="flex items-center gap-2">
        <Link href="" onClick={handleClick} className="inline-block">
          <Image
            src="/ojusxe.webp"
            alt="insignia"
            width={28}
            height={28}
            className="h-6 w-6 aspect-square opacity-80 cursor-pointer pointer-events-none"
          />
        </Link>
        <ThemeToggle />
      </div>
      <div className="flex items-center md:gap-4 gap-2.5">
        <div className="flex items-center gap-2 underline md:text-sm text-xs">
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
