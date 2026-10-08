import Container from "./Container";
import Button from "./Button";
import AmbientVideo from "./motion/AmbientVideo";
import FadeBlock from "./motion/FadeBlock";
import RevealText from "./motion/RevealText";
import ScaleBlock from "./motion/ScaleBlock";
import { site } from "@/lib/site";
import { videos } from "@/lib/videos";

/**
 * The home page's announcement of the hotel: a pale panel with the large
 * title and buttons on the left and the portrait walkthrough video in a tall
 * frame on the right, the shape the footage was shot in.
 */
export default function HotelTeaser() {
  return (
    <section className="py-12 sm:py-20" aria-labelledby="hotel-teaser-heading">
      <Container>
        <ScaleBlock className="rounded-[20px] bg-brand-mist px-5 pb-6 pt-8 sm:px-10 sm:pb-10 sm:pt-11">
          <FadeBlock className="flex items-center justify-between gap-6 border-b border-brand-ink/10 pb-3 font-display text-[15px] text-text-primary sm:text-[18px]">
            <span className="text-brand-green">New: hotel stays</span>
            <span className="text-right">{site.name}</span>
          </FadeBlock>

          <div className="grid gap-10 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end lg:gap-16">
            <div className="lg:pb-6">
              <RevealText
                as="h2"
                id="hotel-teaser-heading"
                className="font-display text-[clamp(3.25rem,8vw,8rem)] leading-[0.85] text-text-primary"
              >
                A room at the end of the road.
              </RevealText>
              <FadeBlock>
                <p className="mt-6 max-w-[480px] text-pretty text-lg leading-relaxed text-text-muted">
                  We now host guests as well as drive them. Book a suite with a
                  separate lounge, a king-size bed and an en-suite shower, and
                  add an airport pickup so your driver brings you to the door.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button href="/hotel" variant="primary">
                    See the suite
                  </Button>
                  <Button href="/hotel#book" variant="outline">
                    Book a stay
                  </Button>
                </div>
              </FadeBlock>
            </div>

            <FadeBlock className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-brand-ink lg:aspect-[9/14]">
              <AmbientVideo video={videos.hotel} className="h-full w-full object-cover" />
            </FadeBlock>
          </div>
        </ScaleBlock>
      </Container>
    </section>
  );
}
