export const site = {
  name: "D'Lexzyle Enterprises",
  /**
   * Live origin, no trailing slash. Single source of truth for `metadataBase`,
   * canonical URLs, `sitemap.ts`, `robots.ts` and the JSON-LD in `StructuredData`.
   * TODO: replace with the real domain before going live — a wrong value here
   * points every canonical tag at a site that doesn't exist.
   */
  url: "https://dlexzyle.com",
  whatsapp: "2348065575378",
  phoneDisplay: "+234 806 557 5378",
  phoneHref: "tel:+2348065575378",
  email: "dlexzyleenterprise@gmail.com",
  address: "Asaba, Delta State, Nigeria",
  /** Broken out for the PostalAddress in the LocalBusiness JSON-LD. */
  addressLocality: "Asaba",
  addressRegion: "Delta State",
  addressCountry: "NG",
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

type LeadField = [label: string, value: string];

/**
 * Builds the message body sent to WhatsApp or email. Blank optional fields are
 * dropped so the recipient never sees a dangling "Email:" line.
 */
export function formatLead(title: string, fields: LeadField[]) {
  const lines = fields
    .filter(([, value]) => value.trim() !== "")
    .map(([label, value]) => `${label}: ${value.trim()}`);

  return [`${title} — ${site.name}`, "", ...lines].join("\n");
}
