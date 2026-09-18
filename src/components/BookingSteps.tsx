import { bookingSteps } from "@/lib/about";

/**
 * The four steps from first message to pickup. Numbered because it is a
 * sequence. Copy lives in about.ts; used on the home and About pages.
 */
export default function BookingSteps() {
  return (
    <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {bookingSteps.map((step, i) => (
        <li key={step.title} className="border-t border-brand-line pt-5">
          <p className="font-display text-[18px] tabular-nums text-brand-green">
            Step {i + 1}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-text-primary">{step.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-text-muted">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
