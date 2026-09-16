import Image from "next/image";
import type { Photo } from "@/lib/images";

interface PhotoCardProps {
  title: string;
  /** One photo, or three for a collage: a large panel on the left and two stacked on the right. */
  image: Photo | [Photo, Photo, Photo];
  children: React.ReactNode;
  /** Defaults to a three-column grid inside the 1200px container. */
  sizes?: string;
}

function FillImage({ photo, sizes }: { photo: Photo; sizes: string }) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      className="object-cover"
      style={{ objectPosition: photo.position }}
    />
  );
}

export default function PhotoCard({
  title,
  image,
  children,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw",
}: PhotoCardProps) {
  return (
    <div className="overflow-hidden rounded-[12px] bg-white shadow-sm">
      {Array.isArray(image) ? (
        // A 3x2 grid in a 3:2 frame makes every cell square.
        <div className="grid aspect-[3/2] grid-cols-3 grid-rows-2 gap-0.5">
          {image.map((photo, i) => (
            <div
              key={photo.src.src}
              className={`relative bg-brand-light ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <FillImage photo={photo} sizes={sizes} />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative aspect-[3/2] bg-brand-light">
          <FillImage photo={image} sizes={sizes} />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-brand-green">{title}</h3>
        {children}
      </div>
    </div>
  );
}
