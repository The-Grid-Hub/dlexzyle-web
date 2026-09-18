/**
 * Background videos, served from public/video. Both are stock stand-ins from
 * Pexels (free for commercial use, no attribution required) until the company
 * has its own footage: to replace one, keep the filename, re-encode to a
 * silent H.264 MP4 under about 3 MB, and export a matching poster frame.
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
} satisfies Record<string, Video>;
