/**
 * The roll-up hover from the reference: the label sits in a clipped box with a
 * copy directly beneath it, and on hover both slide up one line. Put the
 * `text-hover` class on the link or button that should trigger it; the CSS is
 * in globals.css. Purely decorative, so the duplicate is aria-hidden.
 */
export default function TextHover({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-hover__inner ${className}`}>
      <span className="text-hover__elem">{children}</span>
      <span className="text-hover__elem text-hover__elem-2" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
