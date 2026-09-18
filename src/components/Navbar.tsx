"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Button from "./Button";
import TextHover from "./TextHover";
import { gsap, reducedMotion, ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

let swatch: CanvasRenderingContext2D | null = null;
const measured = new Map<string, [luma: number, alpha: number]>();

/**
 * Luma and alpha (both 0-1) of any CSS colour. Painting it onto a 1px canvas
 * handles the `oklab()` / `color-mix()` forms Tailwind emits.
 */
function measure(color: string): [luma: number, alpha: number] {
  let result = measured.get(color);
  if (!result) {
    swatch ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!swatch) return [1, 0];
    swatch.clearRect(0, 0, 1, 1);
    swatch.fillStyle = color;
    swatch.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = swatch.getImageData(0, 0, 1, 1).data;
    result = [(0.2126 * r + 0.7152 * g + 0.0722 * b) / 255, a / 255];
    measured.set(color, result);
  }
  return result;
}

/**
 * Whether the surface behind the logo is dark. Walks down the elements under
 * the logo's resting centre (ignoring the header and fixed overlays such as
 * the preloader and curtain) to the first one that settles it: a
 * `data-header="dark" | "light"` attribute, a photo or video, or a background
 * colour that is at least half opaque. The page itself is white.
 */
function isDarkBehind(logo: HTMLElement, header: HTMLElement): boolean {
  const box = logo.getBoundingClientRect();
  // Measure from the header's resting position, not mid-way through hiding.
  const y = box.top - header.getBoundingClientRect().top + box.height / 2;
  const x = box.left + box.width / 2;
  for (const el of document.elementsFromPoint(x, y)) {
    if (header.contains(el)) continue;
    if (el instanceof HTMLElement && el.dataset.header) return el.dataset.header === "dark";
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) return true;
    const style = getComputedStyle(el);
    if (style.position === "fixed") continue;
    const [luma, alpha] = measure(style.backgroundColor);
    if (alpha >= 0.5) return luma < 0.45;
  }
  return false;
}

/**
 * Fixed header over the page: logo left, the menu in a pale pill, and the
 * quote button. It slides in during the intro (`data-intro="header"`), hides
 * when you scroll down and returns when you scroll up. On phones the menu is
 * a full-screen panel toggled by a Menu / Close button. The logo keeps its
 * own white box everywhere; the name beside it turns white over dark surfaces.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const header = useRef<HTMLElement>(null);
  const logo = useRef<HTMLAnchorElement>(null);
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

  useEffect(() => {
    ScrollSmoother.get()?.paused(open);
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Re-check what is behind the logo whenever the page moves under it. This
  // runs with motion off too: ScrollTrigger works on native scroll.
  useEffect(() => {
    const check = () => {
      if (header.current && logo.current) setOnDark(isDarkBehind(logo.current, header.current));
    };
    const trigger = ScrollTrigger.create({ start: 0, end: "max", onUpdate: check, onRefresh: check });
    const frame = requestAnimationFrame(check);
    return () => {
      trigger.kill();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // The phone menu is a pale panel, so the name stays dark over it.
  const dark = onDark && !open;

  return (
    <header ref={header} data-intro="header" className="fixed inset-x-0 top-0 z-50">
      <Container className="flex items-center justify-between gap-4 py-4 sm:py-5">
        <Link ref={logo} href="/" className="relative z-10 flex items-center gap-3" aria-label="D'Lexzyle Enterprise home">
          {/* The logo file is 296x200; keep that ratio so it isn't squashed. */}
          <Image src="/logo_.png" alt="" width={296} height={200} className="h-10 w-auto" priority />
          <span
            className={`font-display whitespace-nowrap text-[26px] transition-colors duration-300 ${
              dark ? "text-white" : "text-text-primary"
            }`}
          >
            D&apos;Lexzyle Enterprise
          </span>
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

        <button
          type="button"
          className="relative z-10 h-14 rounded-[10px] bg-brand-mist px-6 font-display text-[19px] text-brand-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={`fixed inset-0 flex flex-col bg-brand-mist transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <Container className="flex flex-1 flex-col justify-center pb-16 pt-28">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-6 font-display text-[44px] text-brand-ink">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-hover self-start" onClick={() => setOpen(false)}>
                <TextHover>{link.label}</TextHover>
              </Link>
            ))}
          </nav>
          <div className="mt-12">
            <Button href="/request-quote" variant="primary" size="lg" className="w-full">
              Request a quote
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
