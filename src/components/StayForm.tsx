"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Field, { inputBase } from "./Field";
import LeadSentNotice from "./LeadSentNotice";
import WhatsAppIcon from "./WhatsAppIcon";
import { pickupAirports } from "@/lib/hotel";
import { formatLead, whatsappUrl } from "@/lib/site";

const SUBJECT = "New hotel booking request";

const DAY = 86_400_000;

const guestOptions = ["1", "2", "3", "4", "5 or more"];

/** The Stay + Ride extras: the car service added to a room booking. */
const extras = [
  { name: "pickup", label: "Airport pickup when I arrive" },
  { name: "driver", label: "A driver on call during my stay" },
  { name: "dropoff", label: "Airport drop-off when I leave" },
];

/** "2026-10-12" as "Mon, 12 Oct 2026", read as a local date so it never shifts a day. */
function formatDate(value: string) {
  const date = new Date(`${value}T00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

/** Both dates parse as UTC midnight, so the difference is whole days. */
function nightsBetween(checkIn: string, checkOut: string) {
  const nights = (Date.parse(checkOut) - Date.parse(checkIn)) / DAY;
  return Number.isFinite(nights) && nights > 0 ? nights : 0;
}

function dayAfter(value: string) {
  return new Date(Date.parse(value) + DAY).toISOString().slice(0, 10);
}

const checkboxRow =
  "flex cursor-pointer items-center gap-3 rounded-[10px] border border-transparent bg-brand-mist px-5 py-4 text-[15px] text-text-primary transition-colors has-checked:border-brand-green has-checked:bg-brand-light";

/**
 * The hotel booking form. Like the car hire forms it never posts anywhere: it
 * opens WhatsApp with the request and shows LeadSentNotice as the fallback.
 * The extras add the car service to the stay; ticking the pickup asks which
 * airport. Check-out can't be on or before check-in (the `min` attributes),
 * and the number of nights is shown as soon as both dates are set.
 */
export default function StayForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [pickup, setPickup] = useState(false);
  const checkInRef = useRef<HTMLInputElement>(null);

  // Today in the visitor's time zone. Set after hydration, because the static
  // build would otherwise bake in the day it was built.
  useEffect(() => {
    if (checkInRef.current) checkInRef.current.min = new Date().toLocaleDateString("en-CA");
  }, []);

  const nights = nightsBetween(checkIn, checkOut);

  // A function `action`, not onSubmit, so a click before hydration can't fall
  // back to a GET that puts the visitor's details in the URL (see LeadForm).
  function sendLead(data: FormData) {
    const value = (name: string) => String(data.get(name) ?? "");
    const chosenExtras = extras.filter((extra) => data.get(extra.name)).map((extra) => extra.label);

    const body = formatLead(SUBJECT, [
      ["Name", value("name")],
      ["Phone", value("phone")],
      ["Email", value("email")],
      ["Check-in", formatDate(value("checkIn"))],
      ["Check-out", formatDate(value("checkOut"))],
      ["Nights", String(nightsBetween(value("checkIn"), value("checkOut")) || "")],
      ["Guests", value("guests")],
      ["Rooms", value("rooms")],
      ["Stay + Ride", chosenExtras.join("; ")],
      ["Arriving at", value("airport") && `${value("airport")} Airport`],
      ["Flight or arrival time", value("flight")],
      ["Notes", value("notes")],
    ]);

    setMessage(body);
    // React resets the form after the action, so clear what mirrors it.
    setCheckIn("");
    setCheckOut("");
    setPickup(false);
    window.open(whatsappUrl(body), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="grid gap-5 sm:grid-cols-2 sm:gap-6" aria-label="Hotel booking form" action={sendLead}>
      <Field label="Check-in" htmlFor="checkIn">
        <input
          ref={checkInRef}
          id="checkIn"
          name="checkIn"
          type="date"
          required
          className={inputBase}
          onChange={(event) => setCheckIn(event.target.value)}
        />
      </Field>

      <Field label="Check-out" htmlFor="checkOut">
        <input
          id="checkOut"
          name="checkOut"
          type="date"
          required
          min={checkIn ? dayAfter(checkIn) : undefined}
          className={inputBase}
          onChange={(event) => setCheckOut(event.target.value)}
        />
      </Field>

      <p className="-mt-2 text-sm text-text-muted sm:col-span-2" aria-live="polite">
        {nights > 0 ? (
          <>
            <span className="font-display text-[20px] text-brand-green">
              {nights} {nights === 1 ? "night" : "nights"}
            </span>{" "}
            from {formatDate(checkIn)}
          </>
        ) : (
          "Pick your dates to see the number of nights."
        )}
      </p>

      <Field label="Guests" htmlFor="guests">
        <select id="guests" name="guests" required className={inputBase} defaultValue="1">
          {guestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Rooms" htmlFor="rooms">
        <input id="rooms" name="rooms" type="number" min={1} max={20} defaultValue={1} required className={inputBase} />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-1.5 text-sm font-medium text-text-primary">
          Add a car <span className="ml-1.5 font-normal text-text-muted">(optional, with a driver)</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {extras.map((extra) => (
            <label key={extra.name} className={checkboxRow}>
              <input
                type="checkbox"
                name={extra.name}
                className="h-5 w-5 shrink-0 accent-brand-green"
                onChange={extra.name === "pickup" ? (event) => setPickup(event.target.checked) : undefined}
              />
              {extra.label}
            </label>
          ))}
        </div>
      </fieldset>

      {pickup && (
        <>
          <Field label="Arriving at" htmlFor="airport">
            <select id="airport" name="airport" required className={inputBase} defaultValue="">
              <option value="" disabled>
                Select airport
              </option>
              {pickupAirports.map((airport) => (
                <option key={airport} value={airport}>
                  {airport} Airport
                </option>
              ))}
            </select>
          </Field>
          <Field label="Flight number or arrival time" htmlFor="flight" hint="(optional)">
            <input id="flight" name="flight" type="text" placeholder="e.g. P4 7121, or 2:30 pm" className={inputBase} />
          </Field>
        </>
      )}

      <Field label="Full name" htmlFor="stayName">
        <input id="stayName" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={inputBase} />
      </Field>

      <Field label="Phone number" htmlFor="stayPhone">
        <input id="stayPhone" name="phone" type="tel" required autoComplete="tel" placeholder="+234 800 000 0000" className={inputBase} />
      </Field>

      <Field label="Email address" htmlFor="stayEmail" hint="(optional)" className="sm:col-span-2">
        <input id="stayEmail" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputBase} />
      </Field>

      <Field label="Anything else we should know" htmlFor="stayNotes" hint="(optional)" className="sm:col-span-2">
        <textarea
          id="stayNotes"
          name="notes"
          rows={4}
          placeholder="A late arrival, an invoice for your organisation, or a room for a colleague"
          className={inputBase}
        />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          <WhatsAppIcon />
          Send request on WhatsApp
        </Button>
        <p className="mt-3 text-sm text-text-muted">
          Opens WhatsApp with your dates filled in. Nothing is stored on this site.
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
