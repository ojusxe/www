import { Metadata } from "next";
import MdxLayout from "@/components/ui/mdx-layout";
import { FileTreeShowcase } from "@/components/lab/file-tree-showcase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "File Tree",
  description:
    "A recursive file tree component with collapsible folders, file type icons, and interactive schema input.",
};

export default function FileTreePage() {
  return (
    <MdxLayout>
      <Link
        href="/lab"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="size-3" />
        back to lab
      </Link>

      <h2>FILE TREE</h2>
      <p className="text-muted-foreground text-sm font-mono mb-8">
        A recursive file tree component with collapsible folders, file type
        icons, and interactive schema input. Inspired by interview qn
      </p>

      <FileTreeShowcase />
    </MdxLayout>
  );
}
