/**
 * Background videos, served from public/video. `hero` and `footer` are stock
 * stand-ins from Pexels (free for commercial use, no attribution required)
 * until the company has its own footage: to replace one, keep the filename,
 * re-encode to a silent H.264 MP4 under about 3 MB, and export a matching
 * poster frame. `hotel` is our own footage: three cuts from the suite
 * walkthrough, slowed to 85%, fading out to brand ink before it loops. It
 * opens on a full frame (no fade-in) so the paused first frame matches the poster.
 * It is portrait (720x1280), so only frame it portrait or full-bleed on phones.
 *
 * The same plate rule as images.ts applies: no frame may show a readable
 * registration. The hero clip is cut before a car with a legible plate enters.
 */
export type Video = {
  src: string;
  /** Shown until the video can play, and instead of it on data-saver connections. */
  poster: string;
  /** What is in the clip, for the summary line above the video. */
  description: string;
  credit: string;
  creditUrl: string;
};

export const videos = {
  hero: {
    src: "/video/hero.mp4",
    poster: "/video/hero-poster.jpg",
    description: "Driving along an open highway under a sunset sky",
    credit: "Pexels",
    creditUrl: "https://www.pexels.com/video/a-car-driving-on-a-highway-at-sunset-27622908/",
  },
  footer: {
    src: "/video/footer.mp4",
    poster: "/video/footer-poster.jpg",
    description: "Inside a car at dusk, the driver heading towards an airport",
    credit: "Pexels",
    creditUrl: "https://www.pexels.com/video/driving-on-a-highway-5927764/",
  },
  hotel: {
    src: "/video/hotel.mp4",
    poster: "/video/hotel-poster.jpg",
    description: "A walk through the suite: the bedroom seen through its door, the bed, then the lounge",
    credit: "D'Lexzyle Enterprise",
    creditUrl: "",
  },
} satisfies Record<string, Video>;
