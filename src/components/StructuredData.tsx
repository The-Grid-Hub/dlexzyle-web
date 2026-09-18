import { site } from "@/lib/site";

/**
 * LocalBusiness JSON-LD, rendered once per page from the root layout. `AutoRental`
 * is the schema.org subtype for vehicle hire, which is what local search uses to
 * place the business in car hire results.
 *
 * Opening hours are deliberately absent: publishing hours we haven't confirmed
 * would put wrong information in Google. Add `openingHoursSpecification` once the
 * real hours are known.
 */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: `${site.url}/logo-square.png`,
    logo: `${site.url}/logo-square.png`,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    description:
      "Safe, reliable car hire and vehicle leasing with a vetted driver on every hire, for individuals, companies, government agencies and NGOs across the South-South and South-East, and across Nigeria.",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      addressCountry: site.addressCountry,
    },
    areaServed: [
      { "@type": "City", name: "Asaba" },
      { "@type": "AdministrativeArea", name: "Delta State" },
      { "@type": "AdministrativeArea", name: "South-South Nigeria" },
      { "@type": "AdministrativeArea", name: "South-East Nigeria" },
      { "@type": "Country", name: "Nigeria" },
    ],
    sameAs: [`https://wa.me/${site.whatsapp}`],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
