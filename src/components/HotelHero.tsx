import Container from "./Container";
import Button from "./Button";
import AmbientVideo from "./motion/AmbientVideo";
import { hotelIntro } from "@/lib/hotel";
import { site } from "@/lib/site";
import { videos } from "@/lib/videos";

/**
 * The Hotel page's full-viewport opener. The walkthrough video is portrait,
 * so it is never stretched across a wide screen: on phones it fills the
 * section behind the text, and from `lg` it fills a full-height column on
 * the right while the title sits on the dark panel to its left. Everything
 * carries `data-intro` so SiteMotion plays it in on load.
 */
export default function HotelHero() {
  return (
    <section
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-brand-ink text-white"
      aria-label="Introduction"
    >
      <div data-intro="fade" className="absolute inset-0 -z-10 lg:left-auto lg:w-[42%]">
        <AmbientVideo video={videos.hotel} className="h-full w-full object-cover" />
        {/* Phones: darken towards the text. Desktop: a soft edge where the video meets the panel. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,31,20,0.94)_0%,rgba(12,31,20,0.55)_45%,rgba(12,31,20,0.25)_100%)] lg:bg-[linear-gradient(to_right,rgba(12,31,20,1)_0%,rgba(12,31,20,0)_28%)]"
          aria-hidden="true"
        />
      </div>

      <Container className="pb-10 pt-32 sm:pb-16 lg:pb-20">
        <div className="relative mb-12 flex items-center justify-between gap-6 pb-3 font-display text-[20px] sm:mb-20 sm:text-[26px] lg:mr-[44%] lg:text-[30px]">
          <p data-intro="chars">{site.name}</p>
          <p data-intro="chars" className="text-right">
            Hotel stays
          </p>
          <span data-intro="line" className="absolute bottom-0 left-0 h-px w-0 bg-white/40" aria-hidden="true" />
        </div>

        <div className="lg:max-w-[54%]">
          <h1 data-intro="chars" className="font-display text-balance text-[clamp(4.5rem,12vw,11rem)] leading-[0.8]">
            Stay with us
          </h1>
          <p data-intro="fade" className="mt-8 max-w-[520px] text-pretty text-lg leading-relaxed text-white/85">
            {hotelIntro}
          </p>
          <div data-intro="fade" className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#book" variant="primary" size="lg">
              Book a stay
            </Button>
            <Button href="#suite" variant="inverse" size="lg">
              Tour the suite
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
