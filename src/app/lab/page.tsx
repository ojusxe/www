import { Metadata } from "next";
import MdxLayout from "@/components/ui/mdx-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "lab",
  description: "A collection of experimental components and their source code",
};

const components = [
  {
    title: "File Tree",
    description:
      "A recursive file tree component with collapsible folders and interactive schema input. Inspired by interview qn",
    href: "/lab/file-tree",
  },
];

export default function LabPage() {
  return (
    <MdxLayout>
      <h2>LAB // DEVVIT</h2>
      <p className="text-muted-foreground text-sm mb-8">
        experimental components with interactive demos and source code.
      </p>

      <div className="space-y-3">
        {components.map((component) => (
          
          <div key={component.href}>
            <Link
              href={component.href}
              className="group flex items-center justify-between"
            >
              <h3 className="font-mono font-medium text-sm">
                {component.title}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              {component.description}
            </p>
          </div>
        ))}
      </div>
    </MdxLayout>
  );
}
