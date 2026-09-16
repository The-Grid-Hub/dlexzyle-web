import Image from "next/image";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import type { Photo } from "@/lib/images";

interface PhotoBannerProps {
  title: string;
  subtitle?: string;
  image: Photo;
  as?: "h1" | "h2";
  children?: React.ReactNode;
}

/**
 * Full-width photo under a dark brand overlay. The photo is decorative
 * (empty alt) because the heading already says what the section is about.
 */
export default function PhotoBanner({ title, subtitle, image, as = "h2", children }: PhotoBannerProps) {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <Image
        src={image.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-10 object-cover"
        style={{ objectPosition: image.position }}
      />
      <div className="absolute inset-0 -z-10 bg-brand-dark/80" aria-hidden="true" />

      <Container>
        <SectionHeading title={title} subtitle={subtitle} as={as} tone="inverse" />
        {children && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
