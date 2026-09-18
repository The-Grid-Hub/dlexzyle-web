"use client";

import { useState } from "react";
import Button from "./Button";
import Field, { inputBase } from "./Field";
import LeadSentNotice from "./LeadSentNotice";
import WhatsAppIcon from "./WhatsAppIcon";
import { formatLead, whatsappUrl } from "@/lib/site";

const SUBJECT = "New enquiry";

export default function ContactForm() {
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "");

    const body = formatLead(SUBJECT, [
      ["Name", value("name")],
      ["Email", value("email")],
      ["Message", value("message")],
    ]);

    setMessage(body);
    window.open(whatsappUrl(body), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="grid gap-5" aria-label="Contact form" onSubmit={handleSubmit}>
      <Field label="Name" htmlFor="contactName">
        <input
          id="contactName"
          name="name"
          type="text"
          placeholder="Your full name"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Email" htmlFor="contactEmail">
        <input
          id="contactEmail"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Message" htmlFor="contactMessage">
        <textarea
          id="contactMessage"
          name="message"
          rows={5}
          placeholder="Where are you going, when, and how many people are travelling?"
          required
          className={inputBase}
        />
      </Field>

      <div>
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          {/* <WhatsAppIcon /> */}
          Send Message
        </Button>
      </div>

      {message && <LeadSentNotice message={message} subject={SUBJECT} />}
    </form>
  );
}
