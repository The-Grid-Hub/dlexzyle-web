import Link from "next/link";
import Container from "./Container";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Request A Quote", href: "/request-quote" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-sm font-semibold text-brand-green">
            D&apos;Lexzyle Enterprise
          </p>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-brand-green"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} D&apos;Lexzyle Enterprise. All
          rights reserved.
        </p>
      </Container>
    </footer>
  );
}
