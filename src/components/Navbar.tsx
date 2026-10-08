"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Button from "./Button";
import TextHover from "./TextHover";
import WhatsAppIcon from "./WhatsAppIcon";
import { site, whatsappUrl } from "@/lib/site";
import { gsap, reducedMotion, ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Hotel", href: "/hotel" },
  { label: "Contact", href: "/contact" },
];

/** Matches Tailwind's `lg` breakpoint, where the phone menu gives way to the pill. */
const DESKTOP_NAV = "(min-width: 1024px)";

/** Contact rows at the foot of the phone menu, all from site.ts. */
const menuContacts = [
  { label: "WhatsApp", href: whatsappUrl(), icon: true },
  { label: site.phoneDisplay, href: site.phoneHref, icon: false },
  { label: site.email, href: `mailto:${site.email}`, icon: false },
];

/**
 * Fixed header over the page: logo left, the menu in a pale pill, and the
 * quote button. It slides in during the intro (`data-intro="header"`), hides
 * when you scroll down and returns when you scroll up. On phones a hamburger
 * button opens a full-screen dark panel (see `.mobile-menu` in globals.css)
 * that wipes down from the header with the page links, the quote button and
 * the contact details. The panel is a sibling of the header, not a child,
 * because the header's intro transform would otherwise make it the panel's
 * containing block and cut it to the header's height. The logo mark and the
 * name share one pale box, so the name stays brand green over any surface.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close the phone menu when the route changes (state adjusted during render,
  // as React recommends, rather than in an effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useGSAP(
    () => {
      if (!header.current || reducedMotion()) return;
      ScrollTrigger.create({
        start: "top+=120 top",
        end: "max",
        onUpdate: (self) => {
          gsap.to(header.current, {
            yPercent: self.direction === 1 ? -105 : 0,
            duration: 0.6,
            ease: "power4.inOut",
            overwrite: "auto",
          });
        },
      });
    },
    { scope: header }
  );

  // While the menu is open: lock the page, close on Escape, and close if the
  // viewport grows past the breakpoint where the panel no longer exists.
  useEffect(() => {
    ScrollSmoother.get()?.paused(open);
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const desktop = window.matchMedia(DESKTOP_NAV);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [open]);

  return (
    <>
      <header ref={header} data-intro="header" className="fixed inset-x-0 top-0 z-50">
        <Container className="flex items-center justify-between gap-4 py-4 sm:py-5">
          <Link
            href="/"
            className="relative z-10 flex h-14 items-center gap-2 rounded-[10px] bg-brand-mist pl-3 pr-4"
            aria-label="D'Lexzyle Enterprise home"
          >
            {/* The mark is 246x139 with no white field; keep that ratio so it isn't squashed. */}
            <Image src="/logo-mark.png" alt="" width={246} height={139} className="h-8 w-auto" priority />
            <span className="font-display whitespace-nowrap text-[clamp(1.0625rem,5.4vw,1.625rem)] text-brand-green">D&apos;Lexzyle Enterprise</span>
          </Link>

          <nav
            className="hidden h-14 items-center gap-9 rounded-[10px] bg-brand-mist px-9 font-display text-[19px] text-brand-ink lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-hover" aria-current={pathname === link.href ? "page" : undefined}>
                <TextHover>{link.label}</TextHover>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/request-quote" variant="primary">
              Request a quote
            </Button>
          </div>

          {/* Hamburger: three lines that fold into a cross when the menu is open. */}
          <button
            type="button"
            className="relative z-10 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-brand-mist text-brand-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-transform duration-500 ease-in-out-quart ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-[opacity,scale] duration-300 ${
                  open ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-current transition-transform duration-500 ease-in-out-quart ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </Container>
      </header>

      {/* The wipe is written as utilities here rather than as a rule in globals.css
          so the hidden state can never depend on a stylesheet rule going missing. */}
      <div
        id="mobile-menu"
        data-open={open}
        aria-hidden={!open}
        className={`mobile-menu fixed inset-0 z-40 flex flex-col bg-brand-ink text-white lg:hidden ${
          open
            ? "visible [clip-path:inset(0)] [transition:clip-path_0.7s_var(--ease-in-out-quart),visibility_0s]"
            : "invisible [clip-path:inset(0_0_100%_0)] [transition:clip-path_0.7s_var(--ease-in-out-quart),visibility_0s_linear_0.7s]"
        }`}
      >
        <Container className="flex h-full flex-col overflow-y-auto pb-6 pt-24 sm:pt-28">
          <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center py-6">
            <ol className="border-t border-white/10">
              {navLinks.map((link, i) => {
                const current = pathname === link.href;
                return (
                  <li key={link.href} className="mobile-menu__item border-b border-white/10" style={{ "--i": i } as React.CSSProperties}>
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between gap-6 py-4 font-display text-[clamp(2.75rem,11vw,4.25rem)] transition-colors duration-300 ${
                        current ? "text-brand-light/60" : "text-white active:text-brand-light"
                      }`}
                      aria-current={current ? "page" : undefined}
                      // A link to the page already open never changes the route, so
                      // close the panel here; otherwise the route change closes it
                      // once the curtain is down.
                      onClick={() => {
                        if (current) setOpen(false);
                      }}
                    >
                      <span>{link.label}</span>
                      <span className="text-[15px] text-white/40">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="mobile-menu__item" style={{ "--i": navLinks.length } as React.CSSProperties}>
            <Button href="/request-quote" variant="primary" size="lg" className="w-full">
              Request a quote
            </Button>
          </div>

          <ul
            className="mobile-menu__item mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-white/60"
            style={{ "--i": navLinks.length + 1 } as React.CSSProperties}
          >
            {menuContacts.map((contact) => (
              <li key={contact.href}>
                <a
                  href={contact.href}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.icon && <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />}
                  {contact.label}
                </a>
              </li>
            ))}
            <li className="w-full text-white/40">{site.address}</li>
          </ul>
        </Container>
      </div>
    </>
  );
}
