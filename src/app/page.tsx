import Hero from "@/components/Hero";
import AboutPanel from "@/components/AboutPanel";
import Advantages from "@/components/Advantages";
import ServicesStack from "@/components/ServicesStack";
import FleetOverview from "@/components/FleetOverview";
import Clients from "@/components/Clients";
import HomeContact from "@/components/HomeContact";
import PinVideo from "@/components/motion/PinVideo";
import { videos } from "@/lib/videos";

/**
 * Two `relative isolate overflow-clip` containers each hold a pinned background video and the
 * sections that scroll over it: the hero video sits behind the hero and the
 * About panel; the footer video behind the clients and contact sections.
 * The pinned video can't be hit-tested, so the first container tells the
 * header it is dark with `data-header`.
 */
export default function Home() {
  return (
    <>
      <div className="relative isolate overflow-clip" data-header="dark">
        <Hero />
        <AboutPanel />
      </div>

      <Advantages />
      <ServicesStack />
      {/* <FleetOverview /> */}

      <div className="relative isolate overflow-clip bg-brand-ink">
        <PinVideo video={videos.footer} end="bottom bottom" overlayClassName="bg-brand-ink/60" />
        <Clients />
        <HomeContact />
      </div>
    </>
  );
}
