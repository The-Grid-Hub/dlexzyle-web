import Container from "./Container";
import Button from "./Button";
import LeadForm from "./LeadForm";
import FadeBlock from "./motion/FadeBlock";
import RevealText from "./motion/RevealText";
import ScaleBlock from "./motion/ScaleBlock";

/**
 * The pale panel at the foot of the home page: a very large headline, a
 * three-field WhatsApp form and a link to the full quote form.
 */
export default function HomeContact() {
  return (
    <section className="py-12 sm:py-20" id="contact">
      <Container>
        <ScaleBlock className="rounded-[20px] bg-brand-mist px-6 pb-8 pt-8 sm:px-10 sm:pb-16 sm:pt-11">
          <FadeBlock className="flex items-center justify-between gap-6 border-b border-brand-ink/10 pb-3 font-display text-[15px] text-text-primary sm:text-[18px]">
            <span>Get a quote</span>
            <span className="text-right">Your trip is our concern. Contact us.</span>
          </FadeBlock>

          <RevealText as="h2" className="font-display mt-10 max-w-[1400px] text-[clamp(3.5rem,10.5vw,12.5rem)] leading-[0.9] text-text-primary">
            Your journey in safe hands.
          </RevealText>

          <FadeBlock className="mt-10 sm:mt-14">
            <p className="font-display max-w-[320px] text-[clamp(1.5rem,2vw,1.875rem)] leading-[0.95] text-text-primary">
              Send your details and we reply with a price and the vehicle we recommend.
            </p>
            <div className="mt-8">
              <LeadForm />
            </div>
            {/* <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button href="/request-quote" variant="light" className="bg-white">
                Request a full quote
              </Button>
              <p className="text-sm text-text-muted">For a trip with dates and a destination to price.</p>
            </div> */}
          </FadeBlock>
        </ScaleBlock>
      </Container>
    </section>
  );
}
