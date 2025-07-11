"use client";

import { useTheme } from "../contexts/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="h-6 w-6 aspect-square border border-gray-300 hover:border-gray-400 cursor-pointer transition-colors duration-200 relative overflow-hidden group"
      title={
        theme === "default" ? "Switch to Blue Theme" : "Switch to Default Theme"
      }
      aria-label={
        theme === "default" ? "Switch to Blue Theme" : "Switch to Default Theme"
      }
    >
      <div
        className={`absolute inset-0 transition-transform duration-300 ${
          theme === "blue" ? "translate-y-0" : "translate-y-6"
        }`}
      >
        <div className="h-full w-full bg-[#4d5eff]"></div>
      </div>
      <div
        className={`absolute inset-0 transition-transform duration-300 ${
          theme === "default" ? "translate-y-0" : "-translate-y-6"
        }`}
      >
        <div className="h-full w-full bg-gray-200 group-hover:bg-gray-300"></div>
      </div>
    </button>
  );
}
