import { Metadata } from "next";
import MdxLayout from "@/components/ui/mdx-layout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "lab",
  description: "A collection of experimental components and their source code",
};

const components = [
  {
    title: "File Tree",
    description: "A recursive file tree component with collapsible folders and interactive schema input. Inspired by interview qn",
    href: "/lab/file-tree",
  },
];

export default function LabPage() {
  return (
    <MdxLayout>
      <h2>LAB</h2>
      <p className="text-muted-foreground text-sm font-mono mb-8">
        Experimental components with interactive demos and source code.
      </p>

      <div className="space-y-3">
        {components.map((component) => (
          <Link
            key={component.href}
            href={component.href}
            className="group flex items-center justify-between"
          >
            <div>
              <h3 className="font-mono font-medium text-sm">{component.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {component.description}
              </p>
            </div>  
          </Link>
        ))}
      </div>
    </MdxLayout>
  );
}
