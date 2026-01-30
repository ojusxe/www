"use client";

import config from "../constants/config";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import ThemeToggle from "./theme-toggle";
import Image from "next/image";

const FRAME_INTERVAL = 30; // ms between frames (~33fps)
const TOTAL_FRAMES = 50;
const FRAMES_PATH = "/ojus-ascii-frames";

// generate your frames : https://howwasyourdayhoney.vercel.app

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isAnimatingRef = useRef(false);
  const animationRef = useRef<number>(0);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const frameCache = useRef<string[]>([]);
  const framesLoaded = useRef(false);
  const isInitialMount = useRef(true);

  // Cache DOM refs
  const elementsRef = useRef<{
    asciiDisplay: HTMLElement | null;
    main: HTMLElement | null;
    themeColorMeta: HTMLMetaElement | null;
  }>({ asciiDisplay: null, main: null, themeColorMeta: null });

  // Preload all frames on mount
  useEffect(() => {
    if (framesLoaded.current) return;

    const loadFrames = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        const frameNum = i + 1;
        const fileName = `${FRAMES_PATH}/frame-${frameNum.toString().padStart(4, "0")}.txt`;
        return fetch(fileName)
          .then((res) => res.text())
          .catch(() => "");
      });

      frameCache.current = await Promise.all(promises);
      framesLoaded.current = true;
    };

    // Cache DOM elements once
    elementsRef.current = {
      asciiDisplay: document.getElementById("ascii-display"),
      main: document.querySelector("main"),
      themeColorMeta: document.querySelector("meta[name='theme-color']"),
    };

    loadFrames();
  }, []);

  // Play animation - synchronized with requestAnimationFrame
  const playAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const { asciiDisplay, main, themeColorMeta } = elementsRef.current;

    // Setup animation state
    if (themeColorMeta) themeColorMeta.content = "#4d5eff";
    asciiDisplay?.classList.remove("opacity");
    document.body.classList.remove("background");
    main?.classList.add("opacity");

    let currentFrame = 0;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;

      if (timestamp - lastTime >= FRAME_INTERVAL) {
        const text = frameCache.current[currentFrame];

        if (asciiDisplay && text) {
          asciiDisplay.textContent = text;
          currentFrame++;
          lastTime = timestamp;
        }
      }

      if (currentFrame < TOTAL_FRAMES) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        asciiDisplay?.classList.add("opacity");
        document.body.classList.add("background");
        main?.classList.remove("opacity");
        if (themeColorMeta) themeColorMeta.content = "#ffffff";
        isAnimatingRef.current = false;
        setHasPlayedIntro(true);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Initial mount - hide content and play animation before paint
  useLayoutEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;

    const isRootRoute = pathname === "/";
    const playedIntro = sessionStorage.getItem("hasPlayedIntro");
    const main = document.querySelector("main");

    if (!playedIntro || isRootRoute) {
      document.body.classList.remove("background");
      main?.classList.add("opacity");
      playAnimation();
      if (!playedIntro) sessionStorage.setItem("hasPlayedIntro", "true");
    } else {
      setHasPlayedIntro(true);
      document.body.classList.add("background");
      main?.classList.remove("opacity");
    }
  }, [pathname, playAnimation]);

  // Play animation when navigating to dreamspace
  useEffect(() => {
    if (pathname === "/dreamspace" && hasPlayedIntro && !isAnimatingRef.current) {
      playAnimation();
    }
  }, [pathname, hasPlayedIntro, playAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      playAnimation();
      if (pathname !== "/") {
        setTimeout(() => router.push("/"), 200);
      }
    },
    [pathname, playAnimation, router]
  );

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
