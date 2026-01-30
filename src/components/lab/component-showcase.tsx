"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface ComponentShowcaseProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
  className?: string;
}

export function ComponentShowcase({
  title,
  description,
  children,
  className,
}: ComponentShowcaseProps) {
  return (
    <div
      className={cn(
        "w-full bg-card overflow-hidden mb-12",
        className
      )}
    >
      <div className="border-b px-4 py-3 bg-muted/30">
        <h3 className="text-sm font-semibold font-mono uppercase tracking-wide">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  );
}

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({ children, className }: ComponentPreviewProps) {
  return (
    <div
      className={cn(
        "bg-background",
        "flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ComponentShowcase;
