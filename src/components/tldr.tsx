import Image from "next/image";
import { TLDR_IMAGES } from "@/constants/home";

export default function TLDR() {
  return (
    <>
      <h4>TL;DR:</h4>
      <p>
        i&apos;m a fan of the process. i&apos;ve been building things and
        working for startups for well over an year now.
      </p>

      <div className="mt-2 grid grid-cols-4 gap-2">
        {TLDR_IMAGES.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              width={0}
              height={0}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw pointer-events-none"
              className="w-full h-auto "
            />
          </div>
        ))}
      </div>
    </>
  );
}
