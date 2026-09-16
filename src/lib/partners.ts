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
    /** Organisations whose brand terms don't permit third-party logo use. */
    | { logo?: never; width?: never; height?: never }
  );

/**
 * Organisations we've worked with, shown in the homepage trust strip. Logos are
 * the official files from each organisation's own website. Organisations whose
 * brand terms restrict third-party logo use are listed by name instead.
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
    // RTI's logo guide forbids recolouring their logo and asks third parties to
    // request permission before using it. It does ask that the name be set in
    // the surrounding text's font, which is exactly how we render it here.
    name: "RTI International",
    url: "https://www.rti.org",
  },
] satisfies Partner[];
