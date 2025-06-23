import Image from 'next/image';

const images = [
  { src: '/tldr/indigo.webp', alt: 'Indigo project' },
  { src: '/tldr/laptop.webp', alt: 'Laptop setup' },
  { src: '/tldr/egd.webp', alt: 'EGD project' },
  { src: '/tldr/blitz.webp', alt: 'Blitz project' },
];

export default function TLDR() {
  return (
    <>
      <h4>TL;DR:</h4>
      <p>i&apos;m a fan of the process. i&apos;ve been building things and working for startups for over an year now.</p>
      
      <div className="mt-2 grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              width={0}
              height={0}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full h-auto "
            />
          </div>
        ))}
      </div>
    </>
  );
}
