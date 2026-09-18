import { mailtoUrl, whatsappUrl } from "@/lib/site";

interface LeadSentNoticeProps {
  /** The already-formatted lead body, so every route sends identical text. */
  message: string;
  subject: string;
}

/**
 * Shown after a form is submitted. The links matter: if the browser blocked the
 * WhatsApp tab, this is the only way the lead still reaches us.
 */
export default function LeadSentNotice({ message, subject }: LeadSentNoticeProps) {
  return (
    <div
      role="status"
      className="rounded-[10px] border border-brand-green/30 bg-brand-light px-5 py-4 text-[15px]"
    >
      <p className="font-semibold text-text-primary">WhatsApp is opening with your details filled in.</p>
      <p className="mt-1 text-text-muted">Tap send in WhatsApp to reach us.</p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-green underline underline-offset-4"
        >
          WhatsApp did not open? Try again
        </a>
        <a
          href={mailtoUrl(subject, message)}
          className="font-medium text-brand-green underline underline-offset-4"
        >
          Send it by email instead
        </a>
      </div>
    </div>
  );
}
