import Link from "next/link";
import TextHover from "./TextHover";

type ButtonVariant = "primary" | "light" | "outline" | "whatsapp" | "inverse";
type ButtonSize = "md" | "lg";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Set false for labels with an icon, which the roll-up hover can't clip cleanly. */
  roll?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: undefined;
  onClick?: undefined;
  "aria-label"?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Each variant sets its resting colours and, through the `--fill` custom
 * property, the colour that rises from the bottom on hover (see `.btn-fill`
 * in globals.css). Text colour changes with it.
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-green text-white [--fill:var(--color-brand-ink)]",
  /** Pale panel-coloured button, the reference's default. */
  light: "bg-brand-mist text-brand-ink hover:text-white [--fill:var(--color-brand-green)]",
  outline:
    "border border-brand-green text-brand-green hover:text-white [--fill:var(--color-brand-green)]",
  whatsapp: "bg-[#25D366] text-brand-ink [--fill:var(--color-brand-ink)] hover:text-white",
  /** White outline for buttons on a brand-green or dark photo background. */
  inverse:
    "border border-white/80 text-white hover:text-brand-ink [--fill:#ffffff]",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-14 px-7 text-[22px]",
  lg: "h-16 px-9 text-[26px]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  roll = true,
  href,
  ...rest
}: ButtonProps) {
  const base =
    "btn-fill font-display inline-flex cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] leading-none transition-colors duration-500";

  const classes = `${base} ${sizeStyles[size]} ${variantStyles[variant]} ${roll ? "text-hover" : ""} ${className}`;
  const label = roll ? <TextHover>{children}</TextHover> : children;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" aria-label={rest["aria-label"]}>
          {label}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={rest["aria-label"]}>
        {label}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={(rest as ButtonAsButton).type ?? "button"}
      onClick={(rest as ButtonAsButton).onClick}
      aria-label={rest["aria-label"]}
    >
      {label}
    </button>
  );
}
