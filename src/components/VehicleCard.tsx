import Image from "next/image";
import PhotoPlaceholder from "./PhotoPlaceholder";
import type { Photo } from "@/lib/images";
import type { Vehicle } from "@/lib/fleet";

interface VehicleCardProps {
  vehicle: Vehicle;
  /** Leave undefined to show the "photo coming soon" frame. */
  photo?: Photo;
  sizes?: string;
}

function Spec({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <dt className="text-sm text-text-muted">{label}</dt>
      <dd className="mt-0.5 text-[15px] font-medium text-text-primary">{value}</dd>
    </div>
  );
}

/** One vehicle type with its photo and specifications, from fleet.ts. */
export default function VehicleCard({
  vehicle,
  photo,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw",
}: VehicleCardProps) {
  return (
    <li className="flex flex-col">
      <div className="overflow-hidden rounded-[12px] bg-brand-light">
        {photo ? (
          <div className="relative aspect-[3/2]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={sizes}
              placeholder="blur"
              className="object-cover"
              style={{ objectPosition: photo.position }}
            />
          </div>
        ) : (
          <PhotoPlaceholder kind="vehicle" aspect="aspect-[3/2]" surface="white" label={`Photo of our ${vehicle.name}`} />
        )}
      </div>
      <div className="pt-5">
        <h3 className="text-lg font-semibold text-text-primary">{vehicle.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{vehicle.summary}</p>
        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-brand-line pt-5">
          <Spec label="Seats" value={vehicle.seats} />
          <Spec label="Luggage" value={vehicle.luggage} />
          <Spec label="Best for" value={vehicle.bestFor} wide />
          <Spec label="Amenities" value={vehicle.amenities} wide />
        </dl>
      </div>
    </li>
  );
}
