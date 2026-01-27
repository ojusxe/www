"use client";

import { useState, useRef, useEffect } from "react";

const musicTracks = [
  { src: "/music/crystalized.mp3", title: "Crystalized" },
  { src: "/music/gangsta.mp3", title: "Gangsta" },
  { src: "/music/twilights.mp3", title: "Twilights" },
];

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [trackTitle, setTrackTitle] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
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

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleTrackEnd);
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current.removeEventListener("canplay", handleCanPlay);
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

    setTimeout(() => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasError(false);
            })
            .catch(() => {
              setHasError(true);
              setIsPlaying(false);
            });
        }
      }
    }, 100);
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
    <div className="flex flex-col items-center gap-8">
      {/* Main player button */}
      <button
        onClick={toggleMusic}
        className={`
          relative size-32 sm:size-40 
          border-2 bg-pink-200 dark:bg-pink-300/20
          border-border hover:border-foreground/40
          cursor-pointer transition-all duration-300 
          overflow-hidden group
          hover:scale-105 active:scale-95
          ${hasError ? "opacity-50 cursor-not-allowed" : ""}
        `}
        title={
          hasError
            ? "Music files not available"
            : isPlaying
            ? "Stop Music"
            : "Play Random Music"
        }
        aria-label={
          hasError
            ? "Music files not available"
            : isPlaying
            ? "Stop Music"
            : "Play Random Music"
        }
      >
        {/* Error state */}
        <div
          className={`absolute inset-0 transition-transform duration-300 flex items-center justify-center ${
            hasError ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <span className="text-red-400 text-4xl">×</span>
        </div>

        {/* Playing state - animated bars */}
        <div
          className={`absolute inset-0 transition-transform duration-300 flex items-center justify-center ${
            isPlaying && !hasError ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-end justify-center gap-1.5 h-16 w-20">
            <div
              className="w-2 bg-green-500 dark:bg-green-400 animate-pulse rounded-sm"
              style={{ height: "40%", animationDuration: "0.8s" }}
            />
            <div
              className="w-2 bg-green-500 dark:bg-green-400 animate-pulse rounded-sm"
              style={{ height: "70%", animationDuration: "1.2s" }}
            />
            <div
              className="w-2 bg-green-500 dark:bg-green-400 animate-pulse rounded-sm"
              style={{ height: "50%", animationDuration: "0.6s" }}
            />
            <div
              className="w-2 bg-green-500 dark:bg-green-400 animate-pulse rounded-sm"
              style={{ height: "80%", animationDuration: "1s" }}
            />
          </div>
        </div>

        {/* Paused state - play icon */}
        <div
          className={`absolute inset-0 transition-transform duration-300 flex items-center justify-center ${
            !isPlaying && !hasError ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative ml-2">
            <div className="w-0 h-0 border-l-[28px] border-l-blue-600 dark:border-l-blue-400 border-y-[18px] border-y-transparent group-hover:border-l-blue-700 dark:group-hover:border-l-blue-300 transition-colors" />
          </div>
        </div>
      </button>

      {/* Track info */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground font-mono">
          {isPlaying && trackTitle ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="inline-block size-2 bg-green-500 rounded-full animate-pulse" />
              now playing
            </span>
          ) : (
            "click to play"
          )}
        </p>
        {trackTitle && isPlaying && (
          <p className="text-lg font-medium text-foreground">{trackTitle}</p>
        )}
      </div>

      {/* Track list */}
      <div className="mt-4 w-full max-w-xs">
        <p className="text-xs text-muted-foreground font-mono mb-3 text-center">
          available tracks
        </p>
        <div className="space-y-1">
          {musicTracks.map((track, index) => (
            <div
              key={track.src}
              className={`
                px-3 py-2 text-sm font-mono
                border border-border
                ${
                  currentTrack === index && isPlaying
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                }
              `}
            >
              {track.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
