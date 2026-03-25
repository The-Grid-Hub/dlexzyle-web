import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "whatsapp";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
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

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-green text-white hover:bg-brand-dark",
  outline:
    "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1ebe57]",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 cursor-pointer";

  const classes = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" aria-label={rest["aria-label"]}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={rest["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={(rest as ButtonAsButton).type ?? "button"} onClick={(rest as ButtonAsButton).onClick} aria-label={rest["aria-label"]}>
      {children}
    </button>
  );
}
