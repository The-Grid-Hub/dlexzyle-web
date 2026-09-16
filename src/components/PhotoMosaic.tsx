import Image from "next/image";
import type { Photo } from "@/lib/images";

const wideSizes = "(min-width: 1024px) 360px, (min-width: 640px) 344px, 66vw";
const smallSizes = "(min-width: 1024px) 176px, (min-width: 640px) 168px, 33vw";

/**
 * A 3x3 grid in a 4:5 frame makes every cell 4:5 as well. Cell 0 is a 2x2
 * block, so the lead photo keeps its 4:5 crop at every breakpoint; cell 3 is
 * the only landscape cell, at 8:5. Check a photo's `position` against the
 * shape of its cell before swapping one, and keep all five different --
 * the React key is the image src.
 */
const cells = [
  { span: "col-span-2 row-span-2", sizes: wideSizes },
  { span: "", sizes: smallSizes },
  { span: "", sizes: smallSizes },
  { span: "col-span-2", sizes: wideSizes },
  { span: "", sizes: smallSizes },
];

interface PhotoMosaicProps {
  /** Lead photo first: it fills the 2x2 cell. All five must be different photos. */
  images: [Photo, Photo, Photo, Photo, Photo];
  caption?: string;
}

export default function PhotoMosaic({ images, caption }: PhotoMosaicProps) {
  return (
    <div>
      <div className="grid aspect-[4/5] w-full grid-cols-3 grid-rows-3 gap-1.5 overflow-hidden rounded-[12px]">
        {images.map((photo, i) => (
          <div
            key={photo.src.src}
            className={`group relative overflow-hidden bg-brand-light ${cells[i].span}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={cells[i].sizes}
              placeholder="blur"
              className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              style={{ objectPosition: photo.position }}
            />
          </div>
        ))}
      </div>
      {caption && <p className="mt-3 text-xs text-text-muted">{caption}</p>}
    </div>
  );
}
