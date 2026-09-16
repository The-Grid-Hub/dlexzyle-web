interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  as?: "h1" | "h2";
  /** "inverse" is for headings that sit on a dark photo overlay. */
  tone?: "default" | "inverse";
}

export default function SectionHeading({ title, subtitle, className = "", as: Heading = "h2", tone = "default" }: SectionHeadingProps) {
  const inverse = tone === "inverse";

  return (
    <div className={`text-center ${className}`}>
      <Heading className={`text-3xl font-bold sm:text-4xl ${inverse ? "text-white" : "text-brand-green"}`}>
        {title}
      </Heading>
      {subtitle && (
        <p className={`mx-auto mt-3 max-w-2xl ${inverse ? "text-white/85" : "text-text-muted"}`}>{subtitle}</p>
      )}
    </div>
  );
}
