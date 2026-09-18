import Image from "next/image";
import Container from "./Container";
import { intro } from "@/lib/about";
import { photos } from "@/lib/images";
import { site } from "@/lib/site";

/**
 * The About page's full-viewport opener over a photo: a header row with a
 * growing hairline, the oversized "About us" title, and the introduction set
 * in a narrow column offset to the right. Everything carries `data-intro` so
 * SiteMotion plays it in on load, like the home hero. The photo is decorative
 * (empty alt): the heading says what the page is.
 */
export default function AboutHero() {
  const photo = photos.driverPortrait;

  return (
    <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-brand-ink text-white">
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        priority
        className="-z-10 object-cover"
        style={{ objectPosition: photo.position }}
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,31,20,0.92)_0%,rgba(12,31,20,0.6)_50%,rgba(12,31,20,0.35)_100%)]"
        aria-hidden="true"
      />

      <Container className="pb-10 pt-32 sm:pb-16 lg:pb-24">
        <div className="relative mb-10 flex flex-col gap-8 pb-3 sm:mb-14 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <h1
            data-intro="chars"
            className="font-display text-[clamp(4.5rem,13vw,12.5rem)] leading-[0.8]"
          >
            About us
          </h1>
          <p
            data-intro="chars"
            className="font-display flex flex-wrap items-baseline gap-x-6 gap-y-1 text-[clamp(1.25rem,2vw,2.5rem)] leading-[0.9] sm:gap-x-10 lg:justify-end lg:gap-x-16"
          >
            <span>Car hire.</span>
            <span>Leasing.</span>
            <span className="basis-full lg:basis-auto lg:pl-8">{site.name}</span>
          </p>
          <span data-intro="line" className="absolute bottom-0 left-0 h-px w-0 bg-white/40" aria-hidden="true" />
        </div>

        <div data-intro="fade" className="flex max-w-[555px] flex-col gap-4 lg:ml-auto lg:mr-[6%]">
          <p className="font-display text-[clamp(1.25rem,1.6vw,1.875rem)] leading-[0.9]">
            {intro.caption}
          </p>
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[15px] font-medium leading-snug text-white/85 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
