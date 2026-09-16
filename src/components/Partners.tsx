import Image from "next/image";
import Container from "./Container";
import { partners } from "@/lib/partners";

export default function Partners() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="border-y border-brand-light bg-white py-10 sm:py-12"
    >
      <Container>
        <h2
          id="partners-heading"
          className="text-balance text-center text-sm font-semibold uppercase tracking-wider text-text-muted"
        >
          Trusted by organisations we&apos;ve worked with
        </h2>

        <ul
          role="list"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-20"
        >
          {partners.map((partner) => (
            <li key={partner.name}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center rounded-md p-2 transition-opacity duration-200 hover:opacity-80"
              >
                {partner.logo !== undefined ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="h-9 w-auto sm:h-12"
                  />
                ) : (
                  <span className="text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
                    {partner.name}
                  </span>
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
