import Container from "./Container";
import Button from "./Button";
import HeroSlider from "./HeroSlider";
import PinVideo from "./motion/PinVideo";
import { established } from "@/lib/about";
import { site } from "@/lib/site";
import { videos } from "@/lib/videos";

/**
 * Full-viewport hero over the pinned background video. The headline sits
 * bottom-left; on wide screens the services slider sits beside it. Every
 * element carries a `data-intro` attribute so SiteMotion can play it in on
 * load. This component is the first child of the video container in page.tsx,
 * which also holds the About panel so the video stays behind both.
 */
export default function Hero() {
  return (
    <>
      <PinVideo
        video={videos.hero}
        intro
        overlayClassName="bg-[linear-gradient(to_top,rgba(12,31,20,0.85)_0%,rgba(12,31,20,0.35)_50%,rgba(12,31,20,0.2)_100%)]"
      />
      <section className="flex min-h-screen flex-col justify-end text-white" aria-label="Introduction">
        <Container className="flex flex-col pb-10 pt-32 sm:pb-14">
          <div className="relative mb-16 flex items-center justify-between pb-3 font-display text-[20px] sm:mb-24 sm:text-[26px] lg:text-[34px]">
            <p data-intro="chars">{site.name}</p>
            <p data-intro="chars" className="text-right">
              Car hire and leasing since {established}
            </p>
            <span data-intro="line" className="absolute bottom-0 left-0 h-px w-0 bg-white/40" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h1
              data-intro="chars"
              className="font-display max-w-[1100px] text-balance text-[clamp(3.25rem,9vw,7rem)] leading-[0.9]"
            >
              Car hire with a driver, based in Asaba.
            </h1>
            <div className="lg:hidden">
              <Button href="/services" variant="light" size="lg" className="w-full">
                <span data-intro="rise" className="block">
                  Our services
                </span>
              </Button>
            </div>
            <HeroSlider />
          </div>
        </Container>
      </section>
    </>
  );
}
