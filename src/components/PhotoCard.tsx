import Image from "next/image";
import type { Photo } from "@/lib/images";

type Collage = [Photo, Photo] | [Photo, Photo, Photo];

interface PhotoCardProps {
  title: string;
  /** One photo, or a collage of two or three. */
  image: Photo | Collage;
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

function CollageGrid({ photos, sizes }: { photos: Collage; sizes: string }) {
  // Three photos make a 3x2 grid in a 3:2 frame, so every cell is square: a
  // large panel on the left and two stacked on the right. Two photos split the
  // same frame down the middle, giving each a portrait cell.
  const three = photos.length === 3;
  return (
    <div
      className={`grid aspect-[3/2] gap-0.5 ${three ? "grid-cols-3 grid-rows-2" : "grid-cols-2"}`}
    >
      {photos.map((photo, i) => (
        <div
          key={photo.src.src}
          className={`relative bg-brand-light ${three && i === 0 ? "col-span-2 row-span-2" : ""}`}
        >
          <FillImage photo={photo} sizes={sizes} />
        </div>
      ))}
    </div>
  );
}

/**
 * A photo with a heading and copy beneath it. There is no box around it:
 * the photo frame carries the radius and the text sits on the page.
 */
export default function PhotoCard({
  title,
  image,
  children,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw",
}: PhotoCardProps) {
  return (
    <div>
      <div className="overflow-hidden rounded-[12px] bg-brand-light">
        {Array.isArray(image) ? (
          <CollageGrid photos={image} sizes={sizes} />
        ) : (
          <div className="relative aspect-[3/2]">
            <FillImage photo={image} sizes={sizes} />
          </div>
        )}
      </div>
      <div className="pt-5">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        {children}
      </div>
    </div>
  );
}
