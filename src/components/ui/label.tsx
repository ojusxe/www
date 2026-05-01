"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface LabelProps {
  children: React.ReactNode;
  /** When provided, hovering reveals this content expanding to the right over the layout. */
  expandedContent?: React.ReactNode;
  className?: string;
}

export function Label({ children, expandedContent, className }: LabelProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={cn(
        "relative inline-block text-xs border border-border text-muted-foreground rounded-sm font-mono",
        className
      )}
      onMouseEnter={expandedContent ? () => setHovered(true) : undefined}
      onMouseLeave={expandedContent ? () => setHovered(false) : undefined}
    >
      {/* always holds layout space */}
      <span
        className="block px-2 py-0.5"
        style={expandedContent ? { opacity: hovered ? 0 : 1, transition: "opacity 0.15s linear" } : undefined}
      >
        {children}
      </span>

      {/* overlay — only when expandedContent is passed */}
      {expandedContent && (
        <span
          className="absolute left-0 top-0 overflow-hidden whitespace-nowrap px-2 py-0.5 border border-green-500 text-green-600 bg-green-50 rounded-sm"
          style={{
            maxWidth: hovered ? "300px" : "0px",
            opacity: hovered ? 1 : 0,
            transition: "max-width 0.25s linear, opacity 0.15s linear",
          }}
        >
          {expandedContent}
        </span>
      )}
    </span>
  );
}
