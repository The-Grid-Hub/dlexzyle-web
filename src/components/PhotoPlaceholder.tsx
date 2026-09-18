type Kind = "vehicle" | "person";

interface PhotoPlaceholderProps {
  /** What the photo will show, e.g. "Photo of a Toyota saloon". Read out by screen readers. */
  label: string;
  kind?: Kind;
  /** Tailwind aspect utility for the frame, e.g. "aspect-[3/2]". */
  aspect: string;
  /** "white" for frames that sit on the brand-light background. */
  surface?: "light" | "white";
}

const icons: Record<Kind, React.ReactNode> = {
  vehicle: (
    <>
      <path d="M5 13l1.6-4.4A2 2 0 0 1 8.5 7.3h7a2 2 0 0 1 1.9 1.3L19 13" />
      <path d="M4 13h16v4H4z" />
      <path d="M6.5 17v2M17.5 17v2" />
      <circle cx="8" cy="15" r="0.5" />
      <circle cx="16" cy="15" r="0.5" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
};

/**
 * Stands in for a photo we don't have yet. Swap it for a `Photo` from
 * images.ts once the real picture is available.
 */
export default function PhotoPlaceholder({
  label,
  kind = "vehicle",
  aspect,
  surface = "light",
}: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative @container ${aspect} ${surface === "white" ? "bg-white" : "bg-brand-light"}`}
    >
      <div className="absolute inset-2 flex flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed border-brand-green/40 @[9rem]:inset-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-brand-green/70 @[9rem]:size-8"
        >
          {icons[kind]}
        </svg>
        {/* Narrow frames (the mobile team layout) show the icon alone. */}
        <span className="hidden text-xs font-medium text-brand-green/80 @[9rem]:block">
          Photo coming soon
        </span>
      </div>
    </div>
  );
}
