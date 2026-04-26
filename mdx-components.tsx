import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/ui/code-block";
import React from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: ({ children }) => {
      const child = React.Children.only(children) as React.ReactElement<{ className?: string; children?: string }>;
      const className = child?.props?.className ?? "";
      const language = className.replace("language-", "") || "bash";
      const code = String(child?.props?.children ?? "").trimEnd();
      return <CodeBlock code={code} language={language} />;
    },
    code: ({ children, className }) =>
      className ? <code className={className}>{children}</code> : (
        <code className="font-mono text-xs bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded">{children}</code>
      ),
  };
}
