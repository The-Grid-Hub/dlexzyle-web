import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import TextHover from "./TextHover";
import WhatsAppIcon from "./WhatsAppIcon";
import { homeServices } from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Request a quote", href: "/request-quote" },
];

function FooterLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const className = "text-hover inline-block text-white/75 transition-colors hover:text-white";
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        <TextHover>{children}</TextHover>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      <TextHover>{children}</TextHover>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-ink pt-20 text-white sm:pt-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="D'Lexzyle Enterprise home">
              <Image src="/logo-white.png" alt="" width={296} height={200} className="h-10 w-auto" />
              <span className="font-display text-[26px]">{site.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
              Car hire with a driver, and long-term vehicle leasing, for
              organisations and families across the South-South and South-East,
              and across Nigeria.
            </p>
          </div>

          <div>
            <h2 className="font-display text-[22px]">Services</h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {homeServices.map((service) => (
                <li key={service.title}>
                  <FooterLink href={service.href}>{service.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[22px]">Pages</h2>
            <nav aria-label="Footer navigation">
              <ul className="mt-4 space-y-2 text-[15px]">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className="font-display text-[22px]">Contact</h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <FooterLink href={site.phoneHref} external>
                  {site.phoneDisplay}
                </FooterLink>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-white/75 transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li className="pt-2 text-white/70">{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/15 py-6 text-sm text-white/55 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Registered in Asaba, Delta State.</p>
        </div>
      </Container>
    </footer>
  );
}
