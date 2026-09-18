type PartnerBase = {
  name: string;
  url: string;
};

export type Partner = PartnerBase &
  (
    | {
        /** Path under /public. SVG logos are served as-is by next/image. */
        logo: string;
        /** Intrinsic logo size, used by next/image to reserve space. */
        width: number;
        height: number;
      }
    /** Organisations listed by name only. */
    | { logo?: never; width?: never; height?: never }
  );

/**
 * Organisations we've worked with, shown in the homepage trust strip. Logos are
 * the official files from each organisation's own website, rendered in
 * grayscale until hovered. An organisation without a logo is listed by name.
 */
export const partners = [
  {
    name: "Mercy Corps Nigeria",
    url: "https://nigeria.mercycorps.org",
    logo: "/partners/mercy-corps.svg",
    width: 96,
    height: 34,
  },
  {
    name: "DAI",
    url: "https://www.dai.com",
    logo: "/partners/dai.svg",
    width: 982,
    height: 245,
  },
  {
    // RTI's logo guide asks third parties to request permission before using
    // the logo and forbids recolouring it; confirm permission before launch.
    name: "RTI International",
    url: "https://www.rti.org",
    logo: "/partners/rti.svg",
    width: 199,
    height: 80,
  },
] satisfies Partner[];
