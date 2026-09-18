import Container from "./Container";
import Button from "./Button";
import FadeBlock from "./motion/FadeBlock";
import RevealText from "./motion/RevealText";
import ScaleBlock from "./motion/ScaleBlock";
import Ticker from "./motion/Ticker";
import { established, storyPanel } from "@/lib/about";
import { site } from "@/lib/site";

/**
 * The About page's dark "Why us?" panel, a two-column version of the home
 * page's AboutPanel: the business name and its lead on the left, the caption
 * and detail with a button on the right, and the oversized faded ticker along
 * the bottom.
 */
export default function AboutStory() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <ScaleBlock className="overflow-hidden rounded-[20px] bg-brand-ink px-5 pb-4 pt-8 text-white sm:px-10 sm:pt-11">
          <FadeBlock className="flex items-center justify-between gap-6 border-b border-white/15 pb-3 font-display text-[15px] sm:text-[18px]">
            <span>Why us?</span>
            <span className="text-right">{site.name}</span>
          </FadeBlock>

          <FadeBlock className="grid gap-8 py-10 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-0 lg:px-12 lg:py-0">
            <div className="border-b border-white/15 pb-8 lg:border-b-0 lg:border-r lg:py-20 lg:pr-16">
              <RevealText as="h2" className="font-display text-[clamp(2.5rem,3.6vw,4.375rem)]">
                {site.name}
              </RevealText>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/85 sm:text-lg">
                {storyPanel.lead.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:py-20 lg:pl-16">
              <p className="font-display max-w-[600px] text-[clamp(1.5rem,2vw,1.875rem)] leading-[0.9]">
                {storyPanel.caption}
              </p>
              <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-white/85 sm:text-lg">
                {storyPanel.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 lg:mt-16">
                <Button href="/services" variant="light" className="w-full sm:w-auto">
                  Our services
                </Button>
              </div>
            </div>
          </FadeBlock>

          <div className="hidden border-t border-white/15 pt-4 sm:block">
            <Ticker
              text={`Operating since ${established}`}
              className="font-display text-[clamp(6rem,12vw,14rem)] leading-none text-white/[0.06]"
            />
          </div>
        </ScaleBlock>
      </Container>
    </section>
  );
}
