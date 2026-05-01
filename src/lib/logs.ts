import fs from "fs";
import path from "path";
import { LogMeta } from "@/types/logs";

export function getAllLogEntries(): LogMeta[] {
  const logsDir = path.join(process.cwd(), "src/app/logs");
  const entries = fs.readdirSync(logsDir, { withFileTypes: true });

  const logEntries: LogMeta[] = entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => {
      const slug = entry.name;
      const metaPath = path.join(logsDir, slug, "meta.json");

      if (!fs.existsSync(metaPath)) {
        return null;
      }

      const metaContent = fs.readFileSync(metaPath, "utf-8");
      const meta = JSON.parse(metaContent);

      return {
        ...meta,
        slug,
      } as LogMeta;
    })
    .filter((entry): entry is LogMeta => entry !== null);

  return logEntries.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
