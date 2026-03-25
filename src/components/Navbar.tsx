"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Container from "./Container";
import Button from "./Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Request A Quote", href: "/request-quote" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 h-20 bg-white"
      style={{ boxShadow: "0px 6px 20px -6px rgba(0,0,0,0.12)" }}
    >
      <Container className="flex h-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="D'Lexzyle Enterprises home">
          <Image
            src="/logo_.png"
            alt="D'Lexzyle Enterprises logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="text-lg font-bold text-brand-green whitespace-nowrap">
            D&apos;Lexzyle Enterprises
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-primary transition-colors hover:text-brand-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="/contact" variant="outline" aria-label="Contact us">
            Contact Us
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="absolute left-0 top-20 w-full border-t border-gray-100 bg-white pb-6 shadow-lg lg:hidden"
          aria-label="Mobile navigation"
        >
          <Container className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-text-primary transition-colors hover:text-brand-green"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="outline" className="mt-2 w-full" aria-label="Contact us">
              Contact Us
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
