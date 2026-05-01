import { Metadata } from "next";
import { LogEntry } from "@/components/ui/log-entry";
import { BackButton } from "@/components/ui/back-button";
import { LOG_ENTRIES } from "@/constants/logs";
import MdxLayout from "@/components/ui/mdx-layout";

export const metadata: Metadata = {
  title: "logs",
  description: "a shared space for technical writings or anything related to tech",
};

export default function LogsPage() {
  return (
    <MdxLayout>
      <BackButton href="/" label="back to home" />
      <h2>LOGS</h2>
      <p className="text-muted-foreground -mt-2">technical writings to document what i learn and figure out</p>
      <div className="not-prose flex flex-col gap-2 mt-8">
        {LOG_ENTRIES.map((entry) => (
          <LogEntry key={entry.href} {...entry} />
        ))}
      </div>
    </MdxLayout>
  );
}
