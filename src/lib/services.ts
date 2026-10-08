/**
 * The seven services shown on the home page: in the hero slider, the stacked
 * service cards and the footer's Services column. The car services are a finer
 * split of the three categories on the Services page, so each links to one of
 * that page's section ids (`corporate`, `private`, `leasing`); hotel stays
 * link to their own page.
 */
export type HomeService = {
  title: string;
  /** One short line, set after the title; a fragment, not a sentence. */
  tagline: string;
  href: string;
};

export const homeServices: HomeService[] = [
  {
    title: "Corporate and institutional hire",
    tagline: "vehicles and vetted drivers for agencies, banks, hotels and NGOs, by the day or the month.",
    href: "/services#corporate",
  },
  {
    title: "Hotel stays",
    tagline: "a suite with its own lounge, and the airport pickup arranged with the room.",
    href: "/hotel",
  },
  {
    title: "Airport transfers",
    tagline: "flight-tracked pickups at Asaba, Enugu, Owerri, Benin and Port Harcourt.",
    href: "/services#private",
  },
  {
    title: "Private hire",
    tagline: "a clean car and a driver who knows the road, for an hour or a week.",
    href: "/services#private",
  },
  {
    title: "Interstate travel",
    tagline: "all thirty-six states in Nigeria, including FCT, by arrangement.",
    href: "/services#private",
  },
  {
    title: "Vehicle leasing",
    tagline: "a car for your office or project, with servicing, insurance and a replacement included.",
    href: "/services#leasing",
  },
  {
    title: "Team and event shuttles",
    tagline: "Sienna buses and seven-seaters for field teams, conferences and ceremonies.",
    href: "/services#corporate",
  },
];
