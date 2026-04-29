import Link from "next/link";
import { cn } from "@/lib/utils";

type LogEntryProps = {
  href: string;
  title: string;
  description: string;
  date?: string;
  active?: boolean;
};

export function LogEntry({ href, title, description, date, active }: LogEntryProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block w-full px-3 py-2.5 border rounded-sm font-mono transition-colors",
        active
          ? "border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10"
          : "border-border text-foreground hover:border-green-500/60 hover:bg-green-50/50 dark:hover:bg-green-900/5"
      )}
    >
      <span className="text-xs font-medium">{title}</span>
      <p className="text-[11px] text-muted-foreground mt-0.5 font-inter">{description}</p>
      {date && <p className="text-[10px] text-muted-foreground/60 mt-1">{date}</p>}
    </Link>
  );
}
