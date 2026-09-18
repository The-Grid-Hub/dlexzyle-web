import Image from "next/image";
import Container from "./Container";
import type { Photo } from "@/lib/images";

interface PhotoBannerProps {
  title: string;
  subtitle?: string;
  image: Photo;
  as?: "h1" | "h2";
  children?: React.ReactNode;
}

/**
 * Full-width photo under a dark green gradient, with the heading set
 * bottom-left. The photo is decorative (empty alt) because the heading
 * already says what the section is about. The heading, subtitle and children
 * carry `data-intro` attributes, so on inner pages they play in on load the
 * same way the home hero does. The top padding clears the fixed header.
 */
export default function PhotoBanner({ title, subtitle, image, as: Heading = "h2", children }: PhotoBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink">
      <Image
        src={image.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        priority={Heading === "h1"}
        className="-z-10 object-cover"
        style={{ objectPosition: image.position }}
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,31,20,0.92)_0%,rgba(12,31,20,0.6)_50%,rgba(12,31,20,0.35)_100%)]"
        aria-hidden="true"
      />

      <Container className="flex min-h-[60vh] flex-col justify-end pb-12 pt-40 sm:min-h-[70vh] sm:pb-16">
        <Heading data-intro="chars" className="font-display max-w-[1100px] text-balance text-[clamp(3rem,8vw,6.5rem)] text-white">
          {title}
        </Heading>
        {subtitle && (
          <p data-intro="fade" className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">
            {subtitle}
          </p>
        )}
        {children && (
          <div data-intro="fade" className="mt-8 flex flex-wrap items-center gap-3">
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
