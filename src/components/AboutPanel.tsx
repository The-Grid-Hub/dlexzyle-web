import Container from "./Container";
import Button from "./Button";
import FadeBlock from "./motion/FadeBlock";
import RevealText from "./motion/RevealText";
import ScaleBlock from "./motion/ScaleBlock";
import Ticker from "./motion/Ticker";
import { established } from "@/lib/about";
import { site } from "@/lib/site";

/**
 * The dark panel that scrolls up over the hero video, growing to full size as
 * it arrives. The ticker along the bottom is the reference's oversized faded
 * marquee; it repeats one fact, so keep it short.
 */
export default function AboutPanel() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <ScaleBlock className="overflow-hidden rounded-[20px] bg-brand-ink px-6 pb-4 pt-8 text-white sm:px-10 sm:pt-11">
          <FadeBlock className="flex items-center justify-between border-b border-white/15 pb-3 font-display text-[15px] sm:text-[18px]">
            <span>About us</span>
            <span>{site.name}</span>
          </FadeBlock>

          <div className="pt-16 sm:pt-20">
            <RevealText as="h2" className="font-display text-[clamp(3rem,6vw,4.5rem)]">
              Who we are
            </RevealText>
            <FadeBlock>
              <p className="mt-5 max-w-[570px] text-lg leading-relaxed text-white/85 sm:text-xl">
                {site.name} is a car hire and vehicle leasing company based in
                Asaba, Delta State. Every hire comes with a vetted professional
                driver and an inspected, well-maintained vehicle, so you travel
                in safe hands, whether it is an airport run or a two-year lease,
                for individuals, companies, government agencies and NGOs across
                the South-South and South-East, and across Nigeria.
              </p>
              <div className="mt-10 sm:mt-14">
                <Button href="/about" variant="light">
                  Learn more about us
                </Button>
              </div>
            </FadeBlock>
          </div>

          <div className="mt-16 hidden border-t border-white/15 pt-4 sm:block">
            <Ticker
              text={`Serving Asaba since ${established}`}
              className="font-display text-[clamp(6rem,12vw,14rem)] leading-none text-white/[0.06]"
            />
          </div>
        </ScaleBlock>
      </Container>
    </section>
  );
}
