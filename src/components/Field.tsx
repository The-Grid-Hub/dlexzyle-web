export const inputBase =
  "w-full rounded-[10px] border border-gray-300 bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green";

interface FieldProps {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

export default function Field({ label, htmlFor, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-text-primary">
        {label}
      </label>
      {children}
    </div>
  );
}
