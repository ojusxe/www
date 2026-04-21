import { cn } from "@/lib/utils";

type MdxLayoutProps = {
  children: React.ReactNode;
  constrainWidth?: boolean;
  className?: string;
};

export default function MdxLayout({
  children,
  constrainWidth = true,
  className,
}: MdxLayoutProps) {
  return (
    <div
      className={cn(
        "w-full prose-sm prose-a:hover:underline prose-headings:mb-4 prose-headings:mt-8 prose-headings:font-semibold prose-headings:font-mono prose-h1:prose-2xl prose-h2:prose-md prose-li:list-disc prose-li:list-inside prose-li:pl-0 prose-li:text-xs sm:prose-li:text-sm prose-li:-ml-5 sm:prose-li:ml-0 prose-li:font-mono prose-li:prose-smgray-600 prose-a:text-custom",
        constrainWidth && "mx-auto max-w-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
