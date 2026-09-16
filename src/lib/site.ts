export const site = {
  name: "D'Lexzyle Enterprises",
  whatsapp: "2348065575378",
  phoneDisplay: "+234 806 557 5378",
  phoneHref: "tel:+2348065575378",
  email: "dlexzyleenterprise@gmail.com",
  address: "Asaba, Delta State, Nigeria",
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
