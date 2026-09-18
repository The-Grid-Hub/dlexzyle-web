/**
 * A single line of text that scrolls continuously from right to left. The text
 * is repeated so the loop has no gap; screen readers get it once. The
 * animation is CSS (see `.ticker` in globals.css) and stops under
 * prefers-reduced-motion.
 */
export default function Ticker({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <span className="sr-only">{text}</span>
      <div className="ticker" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="ticker__item">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
