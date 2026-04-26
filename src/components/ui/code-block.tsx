"use client"

import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils"

interface CodeTab {
  label: string
  code: string
  language?: string
}

interface CodeBlockProps {
  tabs?: CodeTab[]
  code?: string
  language?: string
  className?: string
}

export function CodeBlock({
  tabs,
  code,
  language = "bash",
  className,
}: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [direction, setDirection] = useState(0)
  const preRef = useRef<HTMLPreElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)

  const codeContent = useMemo(() => {
    if (tabs && tabs.length > 0) {
      return tabs
    }
    if (code) {
      return [{ label: language, code, language }]
    }
    return []
  }, [tabs, code, language])

  const currentCode = codeContent[activeTab]?.code || ""

  // Check overflow when tab changes or content updates
  // biome-ignore lint/correctness/useExhaustiveDependencies: activeTab is needed to recheck overflow when content changes
  useLayoutEffect(() => {
    const checkOverflow = () => {
      if (preRef.current) {
        const hasHorizontalOverflow =
          preRef.current.scrollWidth > preRef.current.clientWidth
        setHasOverflow(hasHorizontalOverflow)
      }
    }

    checkOverflow()
    const resizeObserver = new ResizeObserver(checkOverflow)
    if (preRef.current) {
      resizeObserver.observe(preRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [activeTab])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTabChange = (index: number) => {
    setDirection(index > activeTab ? 1 : -1)
    setActiveTab(index)
  }

  if (codeContent.length === 0) return null

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-md border",
        "border-zinc-200",
        "bg-zinc-50",
        "text-zinc-950",
        className
      )}
    >
      {/* Tab Bar */}
      {codeContent.length > 1 && (
        <div className="flex items-center relative pr-2.5">
          <div
            role="tablist"
            className={cn(
              "flex-1 min-w-0 text-xs leading-6 rounded-tl-xl gap-1 flex",
              "overflow-x-auto overflow-y-hidden",
              "scrollbar-thin scrollbar-thumb-rounded",
              "scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20"
            )}
          >
            <div className="relative flex gap-1">
              {codeContent.map((tab, index) => (
                <button
                  key={`${tab.label}-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === index}
                  onClick={() => handleTabChange(index)}
                  className={cn(
                    "flex items-center relative gap-1.5 my-1 mb-1.5 outline-0",
                    "whitespace-nowrap font-medium transition-colors duration-150",
                    "px-1.5 rounded-lg",
                    "first:ml-2.5",
                    "hover:bg-zinc-200/50",
                    activeTab === index
                      ? "text-zinc-950"
                      : "text-zinc-500"
                  )}
                >
                  {tab.label}
                  {activeTab === index && (
                    <div
                      
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 rounded-full"
                      
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Code Content */}
      <div className="relative overflow-hidden">
        {/* Header row: language + copy */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-200">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{codeContent[activeTab]?.language || language}</span>
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1 text-[10px] font-medium",
              "text-zinc-400 hover:text-zinc-700 transition-colors duration-150",
              "focus-visible:outline-none"
            )}
            aria-label="Copy code"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
        <pre
          ref={preRef}
          className={cn(
            "px-4 py-0 text-sm leading-relaxed m-0 bg-zinc-50",
            hasOverflow ? "overflow-x-auto" : "overflow-x-hidden",
            hasOverflow && "scrollbar-thin scrollbar-thumb-rounded",
            hasOverflow &&
              "scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20",
            hasOverflow && "[&::-webkit-scrollbar]:h-2",
            hasOverflow && "[&::-webkit-scrollbar-thumb]:rounded-full",
            hasOverflow && "[&::-webkit-scrollbar-thumb]:bg-black/15",
            hasOverflow && "[&::-webkit-scrollbar-thumb:hover]:bg-black/20",
            hasOverflow && "[&::-webkit-scrollbar-track]:bg-transparent"
          )}
        >
            <code
              key={activeTab}
              className="font-mono text-zinc-950 block whitespace-pre"
            >
              {currentCode}
            </code>
        </pre>
      </div>
    </div>
  )
}
