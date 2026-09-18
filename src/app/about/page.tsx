import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import Container from "@/components/Container";
import HomeContact from "@/components/HomeContact";
import KeyAdvantages from "@/components/KeyAdvantages";
import ServicesStack from "@/components/ServicesStack";
import FadeBlock from "@/components/motion/FadeBlock";
import ReadingText from "@/components/motion/ReadingText";
import RevealText from "@/components/motion/RevealText";
import ScaleBlock from "@/components/motion/ScaleBlock";
import { facts, figuresUpdated, goals, mission, statement, tagline } from "@/lib/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "D'Lexzyle Enterprise is a car hire and vehicle leasing company in Asaba, Delta State. Our goals, our key advantages, our commitment to safety, our mission and the facts behind them, for clients across the South-South and South-East, and across Nigeria.",
  alternates: { canonical: "/about" },
};

const pad = (n: number) => String(n).padStart(2, "0");

const figuresDate = figuresUpdated.toLocaleDateString("en-NG", {
  month: "long",
  year: "numeric",
});

/**
 * The About page follows the reference's sequence: hero, a statement read
 * word by word, the dark story panel, goals, the pinned key advantages, the
 * mission, a tagline panel, facts, then the services stack and the contact
 * panel shared with the home page.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Statement */}
      <section className="flex items-center py-20 sm:py-32 lg:min-h-screen" aria-label="Our promise">
        <Container>
          <ReadingText className="font-display mx-auto flex max-w-[1200px] flex-col gap-5 text-[clamp(1.75rem,4.2vw,5rem)] leading-[0.9] text-text-primary sm:gap-14 lg:text-center">
            {statement.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ReadingText>
        </Container>
      </section>

      <AboutStory />

      {/* Goals */}
      <section className="py-12 sm:py-20" aria-labelledby="goals-heading">
        <Container>
          <RevealText
            as="h2"
            id="goals-heading"
            className="font-display mb-10 text-[clamp(3rem,10vw,12.5rem)] leading-[0.8] sm:mb-14 lg:text-center"
          >
            Our main goals
          </RevealText>
          <ol className="grid gap-2.5 lg:grid-cols-3 lg:gap-5">
            {goals.map((goal, i) => (
              <li key={goal.verb} className="flex">
                <ScaleBlock className="flex w-full flex-col items-start gap-5 rounded-[10px] bg-brand-mist px-8 pb-10 pt-6 lg:min-h-[555px] lg:gap-16 lg:px-14 lg:pb-14">
                  <span
                    className="font-display text-[clamp(3.75rem,10vw,12.5rem)] leading-[1.1] text-brand-ink/[0.06]"
                    aria-hidden="true"
                  >
                    {pad(i + 1)}
                  </span>
                  <div className="max-w-[320px]">
                    <h3 className="font-display text-[clamp(2.25rem,3.2vw,3.75rem)] text-text-primary">
                      <span className="sr-only">{pad(i + 1)}. </span>
                      {goal.verb}
                    </h3>
                    <p className="mt-3 leading-snug text-text-muted">{goal.detail}</p>
                  </div>
                </ScaleBlock>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <KeyAdvantages />

      {/* Mission */}
      <section className="flex items-center py-20 sm:py-32 lg:min-h-screen" aria-labelledby="mission-heading">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <RevealText
            as="h2"
            id="mission-heading"
            className="font-display shrink-0 text-[clamp(3rem,8.5vw,12.5rem)] leading-[0.8] lg:w-[42%]"
          >
            Our mission
          </RevealText>
          <ReadingText className="font-display flex flex-col gap-5 text-[clamp(1.75rem,4.2vw,5rem)] leading-[0.9] text-text-primary sm:gap-14 lg:w-[54%]">
            {mission.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ReadingText>
        </Container>
      </section>

      {/* Tagline */}
      <section className="py-12 sm:py-20" aria-label="Tagline">
        <Container>
          <ScaleBlock className="flex flex-col items-center rounded-[20px] bg-brand-mist px-5 py-14 sm:px-10 lg:pb-56 lg:pt-72">
            <FadeBlock className="mb-10 flex w-full flex-wrap justify-between gap-x-6 gap-y-2 font-display text-[clamp(1.5rem,5vw,6.25rem)] leading-[0.9] text-text-primary lg:mb-32">
              {tagline.head.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </FadeBlock>
            <RevealText
              as="p"
              className="font-display max-w-[1400px] text-center text-[clamp(2.75rem,7.8vw,9.375rem)] leading-[0.9] tracking-[-0.03em] text-text-primary"
            >
              {tagline.title}
            </RevealText>
          </ScaleBlock>
        </Container>
      </section>

      {/* Facts */}
      <section className="py-12 sm:py-20" aria-labelledby="facts-heading">
        <Container>
          <RevealText
            as="h2"
            id="facts-heading"
            className="font-display mb-10 text-[clamp(3rem,10vw,12.5rem)] leading-[0.8] sm:mb-14 lg:text-center"
          >
            Facts about us
          </RevealText>
          <dl className="grid gap-2.5 lg:grid-cols-3 lg:gap-5">
            {facts.map((fact) => (
              <ScaleBlock
                key={fact.detail}
                className="flex flex-col justify-between gap-8 rounded-[10px] bg-brand-ink px-8 pb-10 pt-8 text-white lg:min-h-[550px] lg:px-12 lg:pb-12"
              >
                <dt className="font-display text-[clamp(5rem,10vw,12.5rem)] leading-none tabular-nums tracking-[-0.03em]">
                  {fact.value}
                </dt>
                <dd className="font-display max-w-[320px] text-[clamp(1.25rem,1.6vw,1.875rem)] leading-[0.9]">
                  {fact.detail}
                </dd>
              </ScaleBlock>
            ))}
          </dl>
          <p className="mt-6 text-xs text-text-muted">Figures last updated {figuresDate}.</p>
        </Container>
      </section>

      <ServicesStack />
      <HomeContact />
    </>
  );
}
