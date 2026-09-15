import Image from "next/image";
import type { Photo } from "@/lib/images";

interface PhotoCardProps {
  title: string;
  image: Photo;
  children: React.ReactNode;
  /** Defaults to a three-column grid inside the 1200px container. */
  sizes?: string;
}

export default function PhotoCard({
  title,
  image,
  children,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw",
}: PhotoCardProps) {
  return (
    <div className="overflow-hidden rounded-[12px] bg-white shadow-sm">
      <div className="relative aspect-[3/2] bg-brand-light">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: image.position }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-brand-green">{title}</h3>
        {children}
      </div>
    </div>
  );
}
