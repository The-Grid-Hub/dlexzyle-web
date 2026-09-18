import Image from "next/image";
import Container from "./Container";
import RevealText from "./motion/RevealText";
import { partners } from "@/lib/partners";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Numbered, frosted tiles over the footer video, one per organisation in
 * partners.ts. Logos sit in grayscale and take their own colours back while
 * the tile is hovered, or the link is focused or pressed (the tap on phones).
 */
export default function Clients() {
  return (
    <section className="pb-12 pt-28 text-white sm:pb-16 sm:pt-36" aria-labelledby="clients-heading">
      <Container>
        <RevealText as="h2" id="clients-heading" className="font-display text-[clamp(3rem,6vw,4.5rem)]">
          Organisations we have worked with
        </RevealText>
        <ul role="list" className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <li key={partner.name} className="group relative flex aspect-[4/3] items-center justify-center rounded-[20px] border border-white/20 bg-white/85 p-10 backdrop-blur-xl sm:aspect-[545/385]">
              <span className="absolute left-6 top-5 font-display text-[20px] text-brand-ink/50" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <a href={partner.url} target="_blank" rel="noopener noreferrer" className="flex items-center grayscale transition-[filter] duration-300 group-hover:grayscale-0 focus-visible:grayscale-0 active:grayscale-0">
                {partner.logo !== undefined ? (
                  <Image src={partner.logo} alt={partner.name} width={partner.width} height={partner.height} className="h-10 w-auto sm:h-12" />
                ) : (
                  <span className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">{partner.name}</span>
                )}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
