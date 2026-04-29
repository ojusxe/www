"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { motion, useAnimate, type AnimationSequence } from "motion/react";
import { cn } from "@/lib/utils";

interface CodeTab {
  label: string;
  code: string;
  language?: string;
}

interface CodeBlockProps {
  tabs?: CodeTab[];
  code?: string;
  language?: string;
  copyable?: boolean;
  className?: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [scope, animate] = useAnimate();
  const maskId = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inSequence: AnimationSequence = useMemo(
    () => [
      [
        '[data-part="square-front"]',
        { y: [0, -4] },
        { duration: 0.12, ease: "easeOut" },
      ],
      [
        '[data-part="square-back"]',
        { x: [0, -4] },
        { at: "<", duration: 0.12, ease: "easeOut" },
      ],
      [
        '[data-part="square-front"], [data-part="square-back"]',
        {
          rx: [2, 7.25],
          width: [10.5, 14.5],
          height: [10.5, 14.5],
          rotate: [0, -45],
        },
        { at: "<", duration: 0.12, ease: "easeOut" },
      ],
      [
        '[data-part="check"]',
        { opacity: [0, 1], pathOffset: [1, 0] },
        { at: "-0.03", duration: 0 },
      ],
      ['[data-part="check"]', { pathLength: [0, 1] }, { duration: 0.1 }],
    ],
    []
  );

  const outSequence: AnimationSequence = useMemo(
    () => [
      [
        '[data-part="check"]',
        { pathOffset: [0, 1] },
        { duration: 0.1, ease: "easeOut" },
      ],
      [
        '[data-part="check"]',
        { opacity: [1, 0], pathLength: [1, 0] },
        { duration: 0 },
      ],
      [
        '[data-part="square-front"], [data-part="square-back"]',
        {
          rx: [7.25, 2],
          width: [14.5, 10.5],
          height: [14.5, 10.5],
          rotate: [-45, 0],
        },
        { at: "+0.03", duration: 0.12, ease: "easeOut" },
      ],
      [
        '[data-part="square-front"]',
        { y: [-4, 0] },
        { at: "<", duration: 0.12, ease: "easeOut" },
      ],
      [
        '[data-part="square-back"]',
        { x: [-4, 0] },
        { at: "<", duration: 0.12, ease: "easeOut" },
      ],
    ],
    []
  );

  const isFirstRender = useRef(true);
  const hasAnimatedIn = useRef(false);
  const inAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const outAnimation = useRef<ReturnType<typeof animate> | null>(null);

  const animateIn = useCallback(async () => {
    if (
      !inAnimation.current &&
      !outAnimation.current &&
      !hasAnimatedIn.current
    ) {
      const animation = animate(inSequence);
      inAnimation.current = animation;
      await animation;
      inAnimation.current = null;
      if (animation.speed === 1) hasAnimatedIn.current = true;
    } else if (outAnimation.current) {
      outAnimation.current.speed = -1;
    } else if (inAnimation.current) {
      inAnimation.current.speed = 1;
    }
  }, [animate, inSequence]);

  const animateOut = useCallback(async () => {
    if (inAnimation.current) {
      inAnimation.current.speed = -1;
    } else if (hasAnimatedIn.current && !outAnimation.current) {
      const animation = animate(outSequence);
      outAnimation.current = animation;
      await animation;
      outAnimation.current = null;
      if (animation.speed === 1) hasAnimatedIn.current = false;
    } else if (outAnimation.current) {
      outAnimation.current.speed = 1;
    }
  }, [animate, outSequence]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    copied ? animateIn() : animateOut();
  }, [animateIn, animateOut, copied]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-button"
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
      style={{
        position: "absolute",
        top: "0.375rem",
        right: "0.5rem",
        padding: "0.25rem",
        background: "transparent",
        border: "none",
        borderRadius: "0.25rem",
        cursor: "pointer",
        color: "rgb(34 197 94)",
        transition: "color 0.15s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        ref={scope}
        style={{ overflow: "visible" }}
        width={20}
        height={20}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
      >
        <motion.rect
          data-part="square-front"
          x="4.75"
          y="8.75"
          width="10.5"
          height="10.5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <g mask={`url(#${maskId})`}>
          <motion.rect
            data-part="square-back"
            x="8.75"
            y="4.75"
            width="10.5"
            height="10.5"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </g>
        <motion.path
          data-part="check"
          initial={{ pathLength: 0, opacity: 0 }}
          d="M9.25 12.25L11 14.25L15 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#fff" />
          <motion.rect
            data-part="square-front"
            x="4.75"
            y="8.75"
            width="10.5"
            height="10.5"
            rx="2"
            fill="#000"
            stroke="#000"
            strokeWidth="1.5"
          />
        </mask>
      </svg>
    </button>
  );
}

function HighlightedCodeBlock({
  code,
  language = "tsx",
  copyable = false,
}: {
  code: string;
  language?: string;
  copyable?: boolean;
}) {
  const trimmedCode = code.trim();

  return (
    <div className="relative">
      <Highlight
        theme={themes.github}
        code={trimmedCode}
        language={language as Language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              "code-block m-0 overflow-x-auto py-2.5 pl-4 text-xs leading-relaxed",
              copyable ? "pr-14" : "pr-4"
            )}
            style={{ ...style, background: "transparent", margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {copyable && <CopyButton text={trimmedCode} />}
    </div>
  );
}

export function CodeBlock({
  tabs,
  code,
  language = "tsx",
  copyable = true,
  className,
}: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const codeContent =
    tabs && tabs.length > 0 ? tabs : code ? [{ label: language, code, language }] : [];
  const currentCode = codeContent[activeTab];

  if (!currentCode) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 text-zinc-950 transition-colors",
        "hover:border-green-500/60 hover:bg-green-50/50",
        className
      )}
    >
      {codeContent.length > 1 && (
        <div className="flex items-center border-b border-zinc-200 px-2 py-1">
          <div
            role="tablist"
            className="flex min-w-0 flex-1 gap-1 overflow-x-auto overflow-y-hidden text-xs leading-6"
          >
            {codeContent.map((tab, index) => (
              <button
                key={`${tab.label}-${index}`}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "whitespace-nowrap rounded px-1.5 font-medium transition-colors duration-150",
                  "hover:bg-zinc-200/60",
                  activeTab === index ? "text-zinc-950" : "text-zinc-500"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <HighlightedCodeBlock
        key={`${activeTab}-${currentCode.language ?? language}`}
        code={currentCode.code}
        language={currentCode.language ?? language}
        copyable={copyable}
      />
    </div>
  );
}
