export const inputBase =
  "w-full rounded-[10px] border border-transparent bg-brand-mist px-5 py-4 text-base text-text-primary placeholder:text-text-muted/70 focus:border-brand-green focus:bg-white focus:outline-none";

interface FieldProps {
  label: string;
  htmlFor: string;
  /** Short note under the label, e.g. "Optional". */
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Field({ label, htmlFor, hint, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-text-primary">
        {label}
        {hint && <span className="ml-1.5 font-normal text-text-muted">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
