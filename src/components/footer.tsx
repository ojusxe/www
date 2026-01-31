import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex font-mono text-xs absolute bottom-0 w-full py-3.5 text-gray-600 border-t border-gray-200 bg-gray-100 md:px-0 px-6">
      <div className="w-full flex justify-between items-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1">
          © {new Date().getFullYear()} OJUS {" "}
        </span>
      </div>
    </footer>
  );
}
