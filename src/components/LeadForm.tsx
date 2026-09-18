"use client";

import { useState } from "react";
import Button from "./Button";
import Field from "./Field";
import LeadSentNotice from "./LeadSentNotice";
import { formatLead, whatsappUrl } from "@/lib/site";

const SUBJECT = "New enquiry";

const input =
  "w-full rounded-[10px] border border-transparent bg-white px-6 py-5 text-base text-text-primary placeholder:text-text-muted/70 focus:border-brand-green focus:outline-none";

/**
 * The three-field form in the home page's contact panel. Like the other forms
 * it never posts anywhere: it opens WhatsApp with the details and shows
 * LeadSentNotice as the fallback.
 */
export default function LeadForm() {
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "");
    const body = formatLead(SUBJECT, [
      ["Name", value("name")],
      ["Phone", value("phone")],
      ["Email", value("email")],
    ]);
    setMessage(body);
    window.open(whatsappUrl(body), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="grid gap-4" aria-label="Quick enquiry form" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Full name" htmlFor="leadName">
          <input id="leadName" name="name" type="text" required autoComplete="name" className={input} />
        </Field>
        <Field label="Phone number" htmlFor="leadPhone">
          <input id="leadPhone" name="phone" type="tel" required autoComplete="tel" className={input} />
        </Field>
        <Field label="Email" htmlFor="leadEmail" hint="(optional)">
          <input id="leadEmail" name="email" type="email" autoComplete="email" className={input} />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          Send a request
        </Button>
        {/* <p className="text-sm text-text-muted">Opens WhatsApp with your details filled in. Nothing is stored on this site.</p> */}
      </div>
      {message && <LeadSentNotice message={message} subject={SUBJECT} />}
    </form>
  );
}
