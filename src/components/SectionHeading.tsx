import FadeBlock from "./motion/FadeBlock";
import RevealText from "./motion/RevealText";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  as?: "h1" | "h2";
  /** "inverse" is for headings that sit on a dark photo overlay. */
  tone?: "default" | "inverse";
  align?: "center" | "left";
}

/**
 * A section title that springs in character by character as it scrolls into
 * view, with an optional subtitle that fades in after it.
 */
export default function SectionHeading({
  title,
  subtitle,
  className = "",
  as = "h2",
  tone = "default",
  align = "left",
}: SectionHeadingProps) {
  const inverse = tone === "inverse";
  const centred = align === "center";

  return (
    <div className={`${centred ? "text-center" : "text-left"} ${className}`}>
      <RevealText
        as={as}
        className={`font-display text-balance text-[clamp(2.75rem,5vw,4.5rem)] ${inverse ? "text-white" : "text-text-primary"}`}
      >
        {title}
      </RevealText>
      {subtitle && (
        <FadeBlock>
          <p
            className={`${centred ? "mx-auto" : ""} mt-4 max-w-2xl text-pretty text-lg leading-relaxed ${
              inverse ? "text-white/80" : "text-text-muted"
            }`}
          >
            {subtitle}
          </p>
        </FadeBlock>
      )}
    </div>
  );
}
