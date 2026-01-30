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
// Source Code for Display
// ============================================================================

const fileTreeSourceCode = `// Types
interface FileTreeNode {
  name: string;
  children?: FileTreeNode[];
}

// Recursive Tree Node Component
function TreeNode({ node, depth, path, expandedPaths, onToggle }) {
  const isFolder = Boolean(node.children?.length);
  const isExpanded = expandedPaths.has(path);

  return (
    <div className="select-none">
      <div
        onClick={() => isFolder && onToggle(path)}
        style={{ paddingLeft: \`\${depth * 12 + 8}px\` }}
        className="flex items-center gap-1.5 py-1 px-2 rounded-md cursor-pointer"
      >
        {/* Chevron */}
        {isFolder ? (
          <ChevronRight className={cn("size-4", isExpanded && "rotate-90")} />
        ) : (
          <span className="size-4" />
        )}
        
        {/* Icon */}
        {isFolder ? <Folder className="size-4" /> : <File className="size-4" />}
        
        {/* Name */}
        <span>{node.name}</span>
      </div>

      {/* Recursive Children */}
      {isFolder && isExpanded && (
        <div>
          {node.children!.map((child, i) => (
            <TreeNode
              key={\`\${path}/\${child.name}-\${i}\`}
              node={child}
              depth={depth + 1}
              path={\`\${path}/\${child.name}\`}
              expandedPaths={expandedPaths}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main FileTree Component
function FileTree({ data }) {
  const [expandedPaths, setExpandedPaths] = useState(new Set());

  const handleToggle = (path) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  };

  return (
    <div role="tree" className="rounded-lg border p-2">
      {data.map((node, i) => (
        <TreeNode
          key={\`\${node.name}-\${i}\`}
          node={node}
          depth={0}
          path={node.name}
          expandedPaths={expandedPaths}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}`;

const schemaParserCode = `// Parse indentation-based schema to tree structure
function parseSchemaToTree(schema: string): FileTreeNode[] {
  const lines = schema.split("\\n").filter((line) => line.trim());
  const root: FileTreeNode[] = [];
  const stack: { node: FileTreeNode; indent: number }[] = [];

  for (const line of lines) {
    const match = line.match(/^(\\s*)/);
    const indent = match ? match[1].replace(/\\t/g, "  ").length : 0;
    const name = line.trim();

    if (!name) continue;

    const newNode: FileTreeNode = { name };

    // Find parent based on indentation
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(newNode);
    } else {
      const parent = stack[stack.length - 1].node;
      if (!parent.children) parent.children = [];
      parent.children.push(newNode);
    }

    stack.push({ node: newNode, indent });
  }

  return root;
}`;

const usageCode = `import { FileTree, parseSchemaToTree } from "@/components/lab/file-tree";

// Option 1: Provide data directly
const treeData = [
  {
    name: "src",
    children: [
      { name: "components", children: [{ name: "button.tsx" }] },
      { name: "utils.ts" }
    ]
  }
];

<FileTree data={treeData} />

// Option 2: Parse from schema string
const schema = \`
src
  components
    button.tsx
  utils.ts
\`;

<FileTree data={parseSchemaToTree(schema)} />`;

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
      description="A recursive file tree component with collapsible folders, file type icons, and interactive schema input. Inspired by shadcn/ui's sidebar file tree."
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
                label: "file-tree.tsx",
                code: fileTreeSourceCode,
                language: "tsx",
              },
              {
                label: "parser.ts",
                code: schemaParserCode,
                language: "typescript",
              },
              {
                label: "usage.tsx",
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
