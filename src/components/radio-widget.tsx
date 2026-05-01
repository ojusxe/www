"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { MusicTrack } from "@/types/sanity";
import { IoPause, IoPlay } from "react-icons/io5";

const Bars = () => (
  <span className="flex items-end gap-px h-3.5">
    {(["0ms", "150ms", "300ms"] as const).map((d) => (
      <span
        key={d}
        className="w-0.5 bg-white rounded-full origin-bottom"
        style={{ height: "100%", animation: "musicbar 0.8s ease-in-out infinite", animationDelay: d }}
      />
    ))}
  </span>
);

export default function RadioWidget({ tracks }: { tracks: MusicTrack[] }) {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentRef = useRef<number | null>(null);
  const tracksRef = useRef(tracks);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { tracksRef.current = tracks; }, [tracks]);

  const playTrack = useCallback((i: number) => {
    const t = tracksRef.current[i];
    if (!audioRef.current || !t) return;
    currentRef.current = i;
    setCurrent(i);
    audioRef.current.src = t.url;
    setTimeout(() => {
      audioRef.current?.play()
        .then(() => { setIsPlaying(true); setHasError(false); })
        .catch(() => { setHasError(true); setIsPlaying(false); });
    }, 50);
  }, []);

  const playRandom = useCallback(() => {
    const len = tracksRef.current.length;
    if (!len) { setHasError(true); return; }
    let next = Math.floor(Math.random() * len);
    if (currentRef.current !== null && len > 1) {
      while (next === currentRef.current) next = Math.floor(Math.random() * len);
    }
    playTrack(next);
  }, [playTrack]);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.8;
    audio.addEventListener("ended", playRandom);
    audio.addEventListener("error", () => { setHasError(true); setIsPlaying(false); });
    audioRef.current = audio;
    return () => { audio.pause(); audioRef.current = null; };
  }, [playRandom]);

  const stop = () => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 300);
  };

  const handleTrack = (i: number) => {
    if (isPlaying && current === i) stop();
    else { setHasError(false); playTrack(i); }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* track list — slides up on hover */}
      <div
        className={cn(
          "flex flex-col gap-1 transition-all duration-300 ease-in-out overflow-hidden items-end",
          open ? "opacity-100 max-h-96" : "opacity-0 max-h-0 pointer-events-none"
        )}
      >
        {tracks.map((track, i) => {
          const active = isPlaying && current === i;
          return (
            <button
              key={track._id}
              onClick={() => handleTrack(i)}
              className={cn(
                "inline-flex items-center gap-1.5 text-xs px-2 py-1 border rounded-sm font-mono transition-colors cursor-pointer whitespace-nowrap w-fit",
                active
                  ? "border-green-500 text-green-600 bg-green-50"
                  : "border-border text-muted-foreground bg-background hover:border-foreground/30"
              )}
            >
              {active
                ? <IoPause className="text-green-500 shrink-0 text-[10px]" />
                : <IoPlay className="text-muted-foreground shrink-0 text-[10px]" />
              }
              {track.title}
            </button>
          );
        })}
      </div>

      {/* widget button — click to stop */}
      <button
        onClick={stop}
        aria-label="Radio"
        className="flex items-center justify-center w-9 h-9 rounded-sm cursor-pointer transition-opacity duration-200 hover:opacity-90 border"
        style={{ backgroundColor: "#4d5eff", borderColor: "#3d4eef" }}
      >
        {hasError ? (
          <IoPlay className="text-white text-base opacity-40" />
        ) : isPlaying ? (
          <Bars />
        ) : (
          <IoPlay className="text-white text-base" />
        )}
      </button>
    </div>
  );
}
