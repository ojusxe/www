import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen gap-24 p-4">
      <Image src="/xiao-fei-404.png" alt="Not Found" width={500} height={500} className="pointer-events-none"/>
      <h4 className="text-sm font-mono text-muted-foreground">NOT FOUND</h4>
    </div>
  );
}
