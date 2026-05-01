import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-4 inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground no-underline hover:no-underline"
    >
      <ArrowLeft className="size-3" />
      {label}
    </Link>
  );
}
