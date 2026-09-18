"use client";

import { useState } from "react";
import Button from "./Button";
import Field, { inputBase } from "./Field";
import LeadSentNotice from "./LeadSentNotice";
import WhatsAppIcon from "./WhatsAppIcon";
import { formatLead, whatsappUrl } from "@/lib/site";

const SUBJECT = "New quote request";

const vehicleTypes = [
  { value: "saloon", label: "Toyota Saloon" },
  { value: "sienna", label: "Sienna Space Bus" },
  { value: "passenger", label: "6/7-Seater Passenger" },
];

const tripTypes = [
  { value: "one-way", label: "One-way" },
  { value: "round-trip", label: "Round trip" },
  { value: "multi-day", label: "Multi-day" },
];

type Option = { value: string; label: string };

/** Sends the human-readable label ("Toyota Saloon"), never the form value ("saloon"). */
function labelFor(options: Option[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" });
}

export default function QuoteForm() {
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "");

    const body = formatLead(SUBJECT, [
      ["Name", value("fullName")],
      ["Phone", value("phone")],
      ["Email", value("email")],
      ["Pickup", value("pickup")],
      ["Destination", value("destination")],
      ["Date & time", formatDateTime(value("datetime"))],
      ["Vehicle", labelFor(vehicleTypes, value("vehicleType"))],
      ["Trip type", labelFor(tripTypes, value("tripType"))],
      ["Notes", value("notes")],
    ]);

    setMessage(body);
    window.open(whatsappUrl(body), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="grid gap-5 sm:grid-cols-2 sm:gap-6"
      aria-label="Request a quote form"
      onSubmit={handleSubmit}
    >
      <Field label="Full name" htmlFor="fullName" className="sm:col-span-2">
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Your full name"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Phone number" htmlFor="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+234 800 000 0000"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Email address" htmlFor="email" hint="(optional)">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className={inputBase}
        />
      </Field>

      <Field label="Pickup location" htmlFor="pickup">
        <input
          id="pickup"
          name="pickup"
          type="text"
          placeholder="e.g. Asaba Airport"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Destination" htmlFor="destination">
        <input
          id="destination"
          name="destination"
          type="text"
          placeholder="e.g. Onitsha, Anambra"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Pickup date and time" htmlFor="datetime">
        <input
          id="datetime"
          name="datetime"
          type="datetime-local"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Vehicle type" htmlFor="vehicleType">
        <select id="vehicleType" name="vehicleType" required className={inputBase} defaultValue="">
          <option value="" disabled>
            Select vehicle
          </option>
          {vehicleTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Trip type" htmlFor="tripType">
        <select id="tripType" name="tripType" required className={inputBase} defaultValue="">
          <option value="" disabled>
            Select trip type
          </option>
          {tripTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Anything else we should know" htmlFor="notes" hint="(optional)" className="sm:col-span-2">
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Number of passengers, luggage, a return date, or a flight number to track"
          className={inputBase}
        />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          <WhatsAppIcon />
          Send request on WhatsApp
        </Button>
        <p className="mt-3 text-sm text-text-muted">
          Opens WhatsApp with your details filled in. Nothing is stored on this site.
        </p>
      </div>

      {message && (
        <div className="sm:col-span-2">
          <LeadSentNotice message={message} subject={SUBJECT} />
        </div>
      )}
    </form>
  );
}
