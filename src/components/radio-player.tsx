"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";

interface RadioPlayerProps {
  initialTracks?: { title: string; url: string }[];
}

export default function RadioPlayer({ initialTracks = [] }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const musicTracks = initialTracks.map((t) => ({ src: t.url, title: t.title }));

  const [currentTrack, setCurrentTrack] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [trackTitle, setTrackTitle] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.8;
      audioRef.current.loop = false;

      const handleTrackEnd = () => {
        if (isPlaying) {
          playRandomTrack();
        }
      };

      const handleError = () => {
        setHasError(true);
        setIsPlaying(false);
      };

      const handleCanPlay = () => {
        setHasError(false);
      };

      if (audioRef.current) {
        audioRef.current.addEventListener("ended", handleTrackEnd);
        audioRef.current.addEventListener("error", handleError);
        audioRef.current.addEventListener("canplay", handleCanPlay);
      }
    } catch (e) {
      console.error("Audio initialization failed", e);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playRandomTrack = () => {
    if (!audioRef.current || musicTracks.length === 0) {
      setHasError(true);
      return;
    }

    let nextTrack;
    do {
      nextTrack = Math.floor(Math.random() * musicTracks.length);
    } while (nextTrack === currentTrack && musicTracks.length > 1);

    setCurrentTrack(nextTrack);
    setTrackTitle(musicTracks[nextTrack].title);
    audioRef.current.src = musicTracks[nextTrack].src;
    
    // Small delay to ensure source is set
    setTimeout(() => {
      audioRef.current?.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch(() => {
        setHasError(true);
        setIsPlaying(false);
      });
    }, 50);
  };

  const playSpecificTrack = (index: number) => {
    if (!audioRef.current) return;

    // If clicking the currently playing track, stop/pause it (resetting like the main button)
    if (isPlaying && currentTrack === index) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setTrackTitle("");
      return;
    }

    // Play the selected track
    setCurrentTrack(index);
    setTrackTitle(musicTracks[index].title);
    audioRef.current.src = musicTracks[index].src;
    
    setTimeout(() => {
      audioRef.current?.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch(() => {
        setHasError(true);
        setIsPlaying(false);
      });
    }, 50);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setTrackTitle("");
    } else {
      setHasError(false);
      playRandomTrack();
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm mx-auto">
      <button
        onClick={toggleMusic}
        className={cn(
          "relative flex items-center justify-center size-32 sm:size-40 rounded-none",
          "border border-border bg-pink-200 dark:bg-pink-900/20",
          "hover:border-foreground/40 hover:bg-pink-200 dark:hover:bg-pink-900/30",
          "transition-all duration-300 cursor-pointer overflow-hidden group",
          hasError && "opacity-50 cursor-not-allowed bg-red-100 dark:bg-red-900/20"
        )}
        title={hasError ? "Unavailabe" : isPlaying ? "Stop" : "Play Random"}
      >
        {/* Play Icon (when NOT playing) */}
        {!isPlaying && !hasError && (
          <div className="relative translate-x-1">
             <div className="w-0 h-0 
               border-l-[24px] border-l-blue-600 dark:border-l-blue-400 
               border-y-[16px] border-y-transparent 
               group-hover:border-l-blue-700 dark:group-hover:border-l-blue-300 
               transition-colors" 
             />
          </div>
        )}

        {/* Animated Bars (when PLAYING) */}
        {isPlaying && !hasError && (
          <div className="flex items-end justify-center gap-1.5 h-28 ">
            <div className="w-[12px] bg-green-500 dark:bg-green-400 animate-pulse h-[40%]" />
            <div className="w-[12px] bg-green-500 dark:bg-green-400 animate-pulse h-[80%]" />
            <div className="w-[12px] bg-green-500 dark:bg-green-400 animate-pulse h-[50%]" />
            <div className="w-[12px] bg-green-500 dark:bg-green-400 animate-pulse h-[70%]" />
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <span className="text-4xl text-red-500 font-light">×</span>
        )}
      </button>

      {/* Track Info */}
      <div className="text-center space-y-2 h-16">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
            {isPlaying ? "Now Playing" : "Tap to Start"}
        </p>
        
        {isPlaying && trackTitle && (
            <p className="text-lg font-medium animate-in fade-in slide-in-from-bottom-2">
                {trackTitle}
            </p>
        )}
      </div>

      {/* Simple Track List */}
      <div className="w-full text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {musicTracks.map((track, index) => (
             <button 
               key={track.src}
               onClick={() => playSpecificTrack(index)}
               className={cn(
                 "text-xs px-2 py-1 border rounded-sm font-mono transition-colors cursor-pointer",
                 currentTrack === index && isPlaying 
                   ? "border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10" 
                   : "border-transparent text-muted-foreground hover:bg-muted/50"
               )}
             >
                {track.title}
             </button>
          ))}
        </div>
      </div>
    </div>
  );
}
