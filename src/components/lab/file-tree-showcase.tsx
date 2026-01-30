"use client";

import { useState, useCallback, useMemo } from "react";
import { FileTree, parseSchemaToTree, type FileTreeNode } from "./file-tree";
import { ComponentShowcase, ComponentPreview } from "./component-showcase";
import { CodeBlock } from "../ui/code-block";
import { cn } from "../../lib/utils";

// ============================================================================
// Default Example Data
// ============================================================================

const defaultSchema = `src
  app
    layout.tsx
    page.tsx
    globals.css
    lab
      page.tsx
  components
    ui
      button.tsx
      code-block.tsx
    lab
      file-tree.tsx
      component-showcase.tsx
  lib
    utils.ts
public
  favicon.ico
package.json
tsconfig.json
README.md`;

// ============================================================================
// Source Code for Display (Based on interview question solution)
// ============================================================================

const fileTreeSourceCode = `import { useState } from "react";

// Types
interface FileTreeNode {
  name: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
}

// Returns emoji icon based on file extension
function getFileIcon(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  
  const iconMap: Record<string, string> = {
    json: "📋",
    ts: "🔷", tsx: "🔷",
    js: "🟨", jsx: "🟨", 
    css: "🎨", scss: "🎨",
    md: "📝", mdx: "📝",
    png: "🖼️", jpg: "🖼️", svg: "🖼️", webp: "🖼️",
    html: "🌐",
    env: "⚙️", config: "⚙️",
  };
  
  return iconMap[ext || ""] || "📄";
}

// Recursive component - renders itself for children
function FileTreeNode({ node }: { node: FileTreeNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.type === "folder";

  return (
    <div style={{ marginLeft: 20 }}>
      <div
        onClick={() => isFolder && setIsOpen(!isOpen)}
        style={{ 
          cursor: isFolder ? "pointer" : "default",
          padding: "4px 8px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {isFolder ? (isOpen ? "📂" : "📁") : getFileIcon(node.name)}
        <span>{node.name}</span>
      </div>
      
      {/* Recursive call */}
      {isFolder && isOpen && node.children?.map((child, index) => (
        <FileTreeNode key={\`\${child.name}-\${index}\`} node={child} />
      ))}
    </div>
  );
}

// Main component
function FileTree({ data }: { data: FileTreeNode[] }) {
  return (
    <div>
      {data.map((node, index) => (
        <FileTreeNode key={\`\${node.name}-\${index}\`} node={node} />
      ))}
    </div>
  );
}

export default FileTree;`;

const schemaParserCode = `// Converts indentation-based text to tree structure
// Uses 2 spaces or tabs for nesting levels

interface FileTreeNode {
  name: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
}

function parseSchemaToTree(schema: string): FileTreeNode[] {
  const lines = schema.split("\\n").filter((line) => line.trim());
  const root: FileTreeNode[] = [];
  const stack: { node: FileTreeNode; indent: number }[] = [];

  for (const line of lines) {
    // Count leading whitespace (convert tabs to 2 spaces)
    const match = line.match(/^(\\s*)/);
    const indent = match ? match[1].replace(/\\t/g, "  ").length : 0;
    const name = line.trim();

    if (!name) continue;

    const newNode: FileTreeNode = { 
      name, 
      type: "file" // Default to file, updated if it has children
    };

    // Find parent based on indentation level
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(newNode);
    } else {
      const parent = stack[stack.length - 1].node;
      parent.type = "folder"; // Has children, so it's a folder
      if (!parent.children) parent.children = [];
      parent.children.push(newNode);
    }

    stack.push({ node: newNode, indent });
  }

  return root;
}`;

const usageCode = `import FileTree from "./FileTree";
import { parseSchemaToTree } from "./parser";

// Option 1: Provide data directly
const treeData = [
  {
    name: "src",
    type: "folder",
    children: [
      { 
        name: "components", 
        type: "folder",
        children: [
          { name: "button.tsx", type: "file" },
          { name: "card.tsx", type: "file" }
        ] 
      },
      { name: "utils.ts", type: "file" }
    ]
  },
  { name: "package.json", type: "file" }
];

<FileTree data={treeData} />

// Option 2: Parse from schema string (easier to write)
const schema = \`
src
  components
    button.tsx
    card.tsx
  utils.ts
package.json
\`;

<FileTree data={parseSchemaToTree(schema)} />`;

const fullComponentCode = `import { useState } from "react";

// Types
interface FileTreeNode {
  name: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
}

// Returns emoji icon based on file extension
function getFileIcon(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const iconMap: Record<string, string> = {
    json: "📋", ts: "🔷", tsx: "🔷", js: "🟨", jsx: "🟨", 
    css: "🎨", scss: "🎨", md: "📝", mdx: "📝",
    png: "🖼️", jpg: "🖼️", svg: "🖼️", html: "🌐",
    env: "⚙️", config: "⚙️",
  };
  return iconMap[ext || ""] || "📄";
}

// Parses indentation-based text to tree structure
function parseSchemaToTree(schema: string): FileTreeNode[] {
  const lines = schema.split("\\n").filter((line) => line.trim());
  const root: FileTreeNode[] = [];
  const stack: { node: FileTreeNode; indent: number }[] = [];

  for (const line of lines) {
    const match = line.match(/^(\\s*)/);
    const indent = match ? match[1].replace(/\\t/g, "  ").length : 0;
    const name = line.trim();
    if (!name) continue;

    const newNode: FileTreeNode = { name, type: "file" };

    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(newNode);
    } else {
      const parent = stack[stack.length - 1].node;
      parent.type = "folder";
      if (!parent.children) parent.children = [];
      parent.children.push(newNode);
    }

    stack.push({ node: newNode, indent });
  }
  return root;
}

// Recursive component - renders itself for children
function FileTreeNode({ node }: { node: FileTreeNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.type === "folder";

  return (
    <div style={{ marginLeft: 20 }}>
      <div
        onClick={() => isFolder && setIsOpen(!isOpen)}
        style={{ 
          cursor: isFolder ? "pointer" : "default",
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {isFolder ? (isOpen ? "📂" : "📁") : getFileIcon(node.name)}
        <span>{node.name}</span>
      </div>
      
      {isFolder && isOpen && node.children?.map((child, i) => (
        <FileTreeNode key={\`\${child.name}-\${i}\`} node={child} />
      ))}
    </div>
  );
}

// Main component
export default function FileTree({ data }: { data: FileTreeNode[] }) {
  return (
    <div>
      {data.map((node, i) => (
        <FileTreeNode key={\`\${node.name}-\${i}\`} node={node} />
      ))}
    </div>
  );
}

export { parseSchemaToTree, type FileTreeNode };`;

// ============================================================================
// FileTree Showcase Component
// ============================================================================

export function FileTreeShowcase() {
  const [schema, setSchema] = useState(defaultSchema);
  const [error, setError] = useState<string | null>(null);

  const treeData = useMemo(() => {
    try {
      setError(null);
      return parseSchemaToTree(schema);
    } catch {
      setError("Invalid schema format");
      return [];
    }
  }, [schema]);

  const handleSchemaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setSchema(e.target.value);
    },
    []
  );

  const handleSelect = useCallback((node: FileTreeNode, path: string) => {
    console.log("Selected:", path, node);
  }, []);

  return (
    <ComponentShowcase
      title="File Tree"
      description="A recursive file tree component with collapsible folders, file type icons, and interactive schema input. Inspired by interview qn"
    >
      <div className="space-y-6">
        {/* Interactive Demo Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Schema Input */}
          <div className="space-y-2">
            <label
              htmlFor="schema-input"
              className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wide"
            >
              Schema Input
            </label>
            <textarea
              id="schema-input"
              value={schema}
              onChange={handleSchemaChange}
              placeholder="Enter file structure (use 2 spaces for nesting)..."
              className={cn(
                "w-full h-[320px] p-3 rounded-lg border bg-background",
                "font-mono text-sm resize-none",
                "placeholder:text-muted-foreground/50",
                "focus:outline-none focus:ring-2 focus:ring-ring/50",
                "scrollbar-thin scrollbar-thumb-rounded",
                "scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20",
                "dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25",
                error && "border-destructive focus:ring-destructive/50"
              )}
            />
            {error && (
              <p className="text-xs text-destructive font-mono">{error}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Use 2 spaces or tabs for indentation to create nested folders.
            </p>
          </div>

          {/* Live Preview */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wide">
              Live Preview
            </span>
            
              {treeData.length > 0 ? (
                <FileTree
                  data={treeData}
                  onSelect={handleSelect}
                  defaultExpandedPaths={["src", "src/components", "src/app"]}
                  className="w-full"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Enter a schema to see the file tree
                </p>
              )}
           
          </div>
        </div>

        {/* Source Code Section */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wide">
            Source Code
          </h4>

          <CodeBlock
            tabs={[
              {
                label: "FileTree.tsx (Full)",
                code: fullComponentCode,
                language: "tsx",
              },
              {
                label: "Component",
                code: fileTreeSourceCode,
                language: "tsx",
              },
              {
                label: "Parser",
                code: schemaParserCode,
                language: "typescript",
              },
              {
                label: "Usage",
                code: usageCode,
                language: "tsx",
              },
            ]}
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}

export default FileTreeShowcase;
