"use client";

import { useState, useCallback, useMemo } from "react";
import { FileTree, parseSchemaToTree, type FileTreeNode } from "./file-tree";
import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";

const defaultSchema = `src
  app
    layout.tsx
    page.tsx
    globals.css
  components
    ui
      button.tsx
      code-block.tsx
    lab
      file-tree.tsx
  lib
    utils.ts
public
  favicon.ico
package.json
tsconfig.json`;

const componentCode = `"use client";
import { useState, useCallback } from "react";

interface FileTreeNode {
  name: string;
  children?: FileTreeNode[];
}

function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    json: "📋", ts: "🔷", tsx: "🔷", js: "🟨", jsx: "🟨",
    css: "🎨", md: "📝", mdx: "📝", png: "🖼️", svg: "🖼️",
  };
  return map[ext || ""] || "📄";
}

function TreeNode({ node, depth, path, expanded, onToggle }) {
  const isFolder = Boolean(node.children?.length);
  const isOpen = expanded.has(path);
  return (
    <div>
      <div
        onClick={() => isFolder && onToggle(path)}
        style={{ paddingLeft: depth * 12 + 8, cursor: isFolder ? "pointer" : "default" }}
        className="flex items-center gap-1.5 py-1 text-sm font-mono hover:bg-accent/50 rounded"
      >
        {isFolder ? (isOpen ? "📂" : "📁") : getFileIcon(node.name)}
        <span>{node.name}</span>
      </div>
      {isFolder && isOpen && node.children.map((child, i) => (
        <TreeNode key={i} node={child} depth={depth + 1}
          path={\`\${path}/\${child.name}\`} expanded={expanded} onToggle={onToggle} />
      ))}
    </div>
  );
}

export function FileTree({ data }) {
  const [expanded, setExpanded] = useState(new Set(["src"]));
  const toggle = useCallback((p) =>
    setExpanded(prev => { const n = new Set(prev); n.has(p) ? n.delete(p) : n.add(p); return n; }), []);
  return (
    <div className="rounded-lg border p-2 font-mono text-sm">
      {data.map((node, i) => (
        <TreeNode key={i} node={node} depth={0} path={node.name} expanded={expanded} onToggle={toggle} />
      ))}
    </div>
  );
}`;

const parserCode = `function parseSchemaToTree(schema: string): FileTreeNode[] {
  const lines = schema.split("\\n").filter(l => l.trim());
  const root: FileTreeNode[] = [];
  const stack: { node: FileTreeNode; indent: number }[] = [];

  for (const line of lines) {
    const indent = (line.match(/^(\\s*)/)?.[1] ?? "").replace(/\\t/g, "  ").length;
    const name = line.trim();
    if (!name) continue;

    const node: FileTreeNode = { name };
    while (stack.length && stack.at(-1)!.indent >= indent) stack.pop();

    if (!stack.length) {
      root.push(node);
    } else {
      const parent = stack.at(-1)!.node;
      (parent.children ??= []).push(node);
    }
    stack.push({ node, indent });
  }
  return root;
}`;

const usageCode = `import { FileTree, parseSchemaToTree } from "./file-tree";

// from schema string
const schema = \`
src
  components
    button.tsx
  lib
    utils.ts
package.json
\`;

<FileTree data={parseSchemaToTree(schema)} />

// or direct data
<FileTree data={[
  { name: "src", children: [{ name: "index.ts" }] },
  { name: "package.json" },
]} />`;

export function FileTreeDemo() {
  const [schema, setSchema] = useState(defaultSchema);

  const parsedSchema = useMemo(() => {
    try {
      return { treeData: parseSchemaToTree(schema), error: null };
    } catch {
      return { treeData: [], error: "invalid schema" };
    }
  }, [schema]);
  const { treeData, error } = parsedSchema;

  const handleSelect = useCallback((node: FileTreeNode, path: string) => {
    console.log("selected:", path, node);
  }, []);

  return (
    <div className="space-y-6 not-prose">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="schema-input" className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
            Schema Input
          </label>
          <textarea
            id="schema-input"
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            className={cn(
              "w-full h-[300px] p-3 rounded-md border bg-background",
              "font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/50",
              error && "border-destructive"
            )}
          />
          {error && <p className="text-xs text-destructive font-mono">{error}</p>}
          <p className="text-xs text-muted-foreground">use 2 spaces or tabs for nesting.</p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Preview</span>
          {treeData.length > 0 ? (
            <FileTree
              data={treeData}
              onSelect={handleSelect}
              defaultExpandedPaths={["src", "src/components", "src/app"]}
              className="w-full"
            />
          ) : (
            <p className="text-sm text-muted-foreground">enter a schema to see the file tree</p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t space-y-3">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">Source</p>
        <CodeBlock
          tabs={[
            { label: "FileTree.tsx", code: componentCode, language: "tsx" },
            { label: "Parser", code: parserCode, language: "typescript" },
            { label: "Usage", code: usageCode, language: "tsx" },
          ]}
        />
      </div>
    </div>
  );
}
