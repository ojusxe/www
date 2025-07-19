"use client";

import { useState, useRef, useEffect } from "react";

// Add your music files to /public/music/ directory
const musicTracks = [
  "/music/crystalized.mp3",
  "/music/Gangsta%20Soundrack%20__%20Sing%20A_0.mp3",
  "/music/Gangsta%20Soundrack%20__%20Sing%20Twilights.mp3",
];

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [hasError, setHasError] = useState(false);
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
      console.warn("Audio file not found or failed to load");
      setHasError(true);
      setIsPlaying(false);

      if (audioRef.current?.src) {
        console.warn("Failed to load:", audioRef.current.src);
      }
    };

    const handleCanPlay = () => {
      setHasError(false);
    };

    const handleLoadStart = () => {
      setHasError(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleTrackEnd);
      audioRef.current.addEventListener("error", handleError);
      audioRef.current.addEventListener("canplay", handleCanPlay);
      audioRef.current.addEventListener("loadstart", handleLoadStart);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleTrackEnd);
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("loadstart", handleLoadStart);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []); // Remove isPlaying dependency to avoid recreation

  const playRandomTrack = () => {
    if (!audioRef.current || musicTracks.length === 0) {
      console.warn("No audio element or tracks available");
      setHasError(true);
      return;
    }

    // Select a random track different from current one
    let nextTrack;
    do {
      nextTrack = Math.floor(Math.random() * musicTracks.length);
    } while (nextTrack === currentTrack && musicTracks.length > 1);

    setCurrentTrack(nextTrack);
    audioRef.current.src = musicTracks[nextTrack];

    // Add a small delay to ensure the src is set
    setTimeout(() => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Audio started successfully
              setIsPlaying(true);
              setHasError(false);
            })
            .catch((error) => {
              console.warn("Failed to play audio:", error);
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
      // Stop music
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      console.log("Music stopped");
    } else {
      // Start playing random track
      setHasError(false);
      console.log("Starting music...");
      playRandomTrack();
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className={`h-6 w-6 aspect-square border bg-pink-200 border-gray-300 hover:border-gray-400 cursor-pointer transition-colors duration-200 relative overflow-hidden group ${
        hasError ? "opacity-50 cursor-not-allowed" : ""
      }`}
      title={
        hasError
          ? "Music files not available - add files to /public/music/"
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
      <div
        className={`absolute inset-0 transition-transform duration-300 flex items-center justify-center ${
          hasError ? "translate-y-0" : "translate-y-6"
        }`}
      >
        <div className="text-red-400 text-sm">×</div>
      </div>

      {/* Playing state - animated bars */}
      <div
        className={`absolute inset-0 transition-transform duration-300 flex items-center justify-center ${
          isPlaying && !hasError ? "translate-y-0" : "translate-y-6"
        }`}
      >
        <div className="flex items-end justify-center space-x-0.5 h-3 w-4">
          <div
            className="w-0.5 bg-green-500 animate-pulse"
            style={{ height: "40%", animationDuration: "0.8s" }}
          ></div>
          <div
            className="w-0.5 bg-green-500 animate-pulse"
            style={{ height: "70%", animationDuration: "1.2s" }}
          ></div>
          <div
            className="w-0.5 bg-green-500 animate-pulse"
            style={{ height: "50%", animationDuration: "0.6s" }}
          ></div>
          <div
            className="w-0.5 bg-green-500 animate-pulse"
            style={{ height: "80%", animationDuration: "1.0s" }}
          ></div>
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-transform duration-300 flex items-center justify-center ${
          !isPlaying && !hasError ? "translate-y-0" : "-translate-y-6"
        }`}
      >
        <div className="relative ml-0.5">
          {/* Simple play triangle */}
          <div className="w-0 h-0 border-l-[6px] border-l-blue-600 border-y-[4px] group-hover:border-l-blue-800"></div>
        </div>
      </div>
    </button>
  );
}
