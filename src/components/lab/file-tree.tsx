"use client";

import { useState, useCallback } from "react";
import { cn } from "../../lib/utils";
import {
  ChevronRight,
  Folder,
  File,
  FileJson,
  FileCode,
  FileText,
  FileImage,
  FileCog,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export interface FileTreeNode {
  name: string;
  children?: FileTreeNode[];
}

interface FileTreeProps {
  data: FileTreeNode[];
  className?: string;
  onSelect?: (node: FileTreeNode, path: string) => void;
  defaultExpandedPaths?: string[];
}

interface TreeNodeProps {
  node: FileTreeNode;
  depth: number;
  path: string;
  expandedPaths: Set<string>;
  onToggle: (path: string) => void;
  onSelect?: (node: FileTreeNode, path: string) => void;
  selectedPath?: string;
}

// ============================================================================
// File Icon Mapping
// ============================================================================

function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();
  const iconClass = "size-4 shrink-0";

  switch (ext) {
    case "json":
      return <FileJson className={cn(iconClass, "text-yellow-500")} />;
    case "ts":
    case "tsx":
      return <FileCode className={cn(iconClass, "text-blue-500")} />;
    case "js":
    case "jsx":
      return <FileCode className={cn(iconClass, "text-yellow-400")} />;
    case "css":
    case "scss":
      return <FileCode className={cn(iconClass, "text-pink-500")} />;
    case "md":
    case "mdx":
      return <FileText className={cn(iconClass, "text-gray-500")} />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
    case "webp":
    case "avif":
      return <FileImage className={cn(iconClass, "text-green-500")} />;
    case "config":
    case "env":
      return <FileCog className={cn(iconClass, "text-gray-400")} />;
    default:
      return <File className={cn(iconClass, "text-muted-foreground")} />;
  }
}

// ============================================================================
// Tree Node Component (Recursive)
// ============================================================================

function TreeNode({
  node,
  depth,
  path,
  expandedPaths,
  onToggle,
  onSelect,
  selectedPath,
}: TreeNodeProps) {
  const isFolder = Boolean(node.children && node.children.length > 0);
  const isExpanded = expandedPaths.has(path);
  const isSelected = selectedPath === path;

  const handleClick = useCallback(() => {
    if (isFolder) {
      onToggle(path);
    }
    onSelect?.(node, path);
  }, [isFolder, onToggle, onSelect, node, path]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <div className="select-none">
      <div
        role={isFolder ? "treeitem" : "treeitem"}
        aria-expanded={isFolder ? isExpanded : undefined}
        aria-selected={isSelected}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center gap-1.5 py-1 px-2 rounded-md cursor-pointer",
          "text-sm font-mono transition-colors duration-100",
          "hover:bg-accent/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          isSelected && "bg-accent text-accent-foreground"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {/* Chevron for folders */}
        {isFolder ? (
          <ChevronRight
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-90"
            )}
          />
        ) : (
          <span className="size-4 shrink-0" />
        )}

        {/* Icon */}
        {isFolder ? (
          <Folder
            className={cn(
              "size-4 shrink-0 transition-colors",
              isExpanded ? "text-blue-400" : "text-blue-500"
            )}
          />
        ) : (
          getFileIcon(node.name)
        )}

        {/* Name */}
        <span className="truncate">{node.name}</span>
      </div>

      {/* Children (Recursive) */}
      {isFolder && isExpanded && (
        <div role="group" className="overflow-hidden">
          {node.children!.map((child, index) => (
            <TreeNode
              key={`${path}/${child.name}-${index}`}
              node={child}
              depth={depth + 1}
              path={`${path}/${child.name}`}
              expandedPaths={expandedPaths}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main FileTree Component
// ============================================================================

export function FileTree({
  data,
  className,
  onSelect,
  defaultExpandedPaths = [],
}: FileTreeProps) {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(
    () => new Set(defaultExpandedPaths)
  );
  const [selectedPath, setSelectedPath] = useState<string>();

  const handleToggle = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (node: FileTreeNode, path: string) => {
      setSelectedPath(path);
      onSelect?.(node, path);
    },
    [onSelect]
  );

  return (
    <div
      role="tree"
      aria-label="File tree"
      className={cn(
        "rounded-lg border bg-card text-card-foreground p-2",
        "min-w-[200px] max-h-[400px] overflow-auto",
        "scrollbar-thin scrollbar-thumb-rounded",
        "scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20",
        "dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25",
        className
      )}
    >
      {data.map((node, index) => (
        <TreeNode
          key={`${node.name}-${index}`}
          node={node}
          depth={0}
          path={node.name}
          expandedPaths={expandedPaths}
          onToggle={handleToggle}
          onSelect={handleSelect}
          selectedPath={selectedPath}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Schema Parser Utility
// ============================================================================

/**
 * Parses a simple text-based schema into FileTreeNode structure.
 * Supports indentation-based nesting (2 spaces or tabs).
 *
 * Example input:
 * ```
 * src
 *   components
 *     button.tsx
 *     card.tsx
 *   lib
 *     utils.ts
 * package.json
 * ```
 */
export function parseSchemaToTree(schema: string): FileTreeNode[] {
  const lines = schema.split("\n").filter((line) => line.trim());
  const root: FileTreeNode[] = [];
  const stack: { node: FileTreeNode; indent: number }[] = [];

  for (const line of lines) {
    // Count leading spaces/tabs
    const match = line.match(/^(\s*)/);
    const indent = match ? match[1].replace(/\t/g, "  ").length : 0;
    const name = line.trim();

    if (!name) continue;

    const newNode: FileTreeNode = { name };

    // Find parent based on indentation
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      // Top-level item
      root.push(newNode);
    } else {
      // Child of last item in stack
      const parent = stack[stack.length - 1].node;
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(newNode);
    }

    // Push current node to stack (might be a parent for subsequent items)
    stack.push({ node: newNode, indent });
  }

  return root;
}

export default FileTree;
