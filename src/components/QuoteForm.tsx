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
  { value: "one-way", label: "One-Way" },
  { value: "round-trip", label: "Round Trip" },
  { value: "multi-day", label: "Multi-Day" },
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
      className="grid gap-6 sm:grid-cols-2"
      aria-label="Request a quote form"
      onSubmit={handleSubmit}
    >
      <Field label="Full Name" htmlFor="fullName" className="sm:col-span-2">
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="John Doe"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Phone Number" htmlFor="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+234 800 000 0000"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Email Address" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className={inputBase}
        />
      </Field>

      <Field label="Pickup Location" htmlFor="pickup">
        <input
          id="pickup"
          name="pickup"
          type="text"
          placeholder="e.g. Lagos, Ikeja"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Destination" htmlFor="destination">
        <input
          id="destination"
          name="destination"
          type="text"
          placeholder="e.g. Abuja, Wuse"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Date & Time" htmlFor="datetime">
        <input
          id="datetime"
          name="datetime"
          type="datetime-local"
          required
          className={inputBase}
        />
      </Field>

      <Field label="Vehicle Type" htmlFor="vehicleType">
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

      <Field label="Trip Type" htmlFor="tripType">
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

      <Field label="Additional Notes" htmlFor="notes" className="sm:col-span-2">
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Any special requirements or details..."
          className={inputBase}
        />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" className="w-full">
          Request Quote
        </Button>
      </div>

      {message && (
        <div className="sm:col-span-2">
          <LeadSentNotice message={message} subject={SUBJECT} />
        </div>
      )}
    </form>
  );
}
