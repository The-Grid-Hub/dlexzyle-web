import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import ServicesPreview from "@/components/ServicesPreview";
import PhotoBanner from "@/components/PhotoBanner";
import Button from "@/components/Button";
import { photos } from "@/lib/images";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <ServicesPreview />
      <PhotoBanner
        title="Based in Asaba, Delta State"
        subtitle="Airport runs, trips within the city and long-distance travel across the South-South and South-East."
        image={photos.highwayLagos}
      >
        <Button href="/request-quote" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-green">
          Request a Quote
        </Button>
      </PhotoBanner>
    </>
  );
}
