import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { fleet } from "@/lib/fleet";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-text-muted">{label}</dt>
      <dd className="mt-0.5 text-[15px] font-medium text-text-primary">{value}</dd>
    </div>
  );
}

/** The fleet as a spec table, for the home page. Reads from fleet.ts. */
export default function FleetOverview() {
  return (
    <section className="bg-brand-mist py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Three vehicle types"
          subtitle="Tell us how many people are travelling and how much luggage they have, and we will match you to one."
        />

        <ul role="list" className="mt-12 divide-y divide-brand-green/20 border-y border-brand-green/20">
          {fleet.map((vehicle) => (
            <li
              key={vehicle.id}
              className="grid gap-x-8 gap-y-4 py-7 md:grid-cols-[minmax(0,5fr)_repeat(3,minmax(0,2fr))] md:items-start"
            >
              <div>
                <h3 className="font-display text-[30px] text-text-primary">{vehicle.name}</h3>
                <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-text-muted">{vehicle.summary}</p>
              </div>
              <dl className="contents">
                <Spec label="Seats" value={vehicle.seats} />
                <Spec label="Luggage" value={vehicle.luggage} />
                <Spec label="Best for" value={vehicle.bestFor} />
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/services#fleet" variant="outline">
            See the full fleet
          </Button>
        </div>
      </Container>
    </section>
  );
}
