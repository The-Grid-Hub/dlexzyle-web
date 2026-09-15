import type { StaticImageData } from "next/image";
import airportVan from "@/assets/images/airport-van.jpg";
import corporate from "@/assets/images/corporate.jpg";
import driverPortrait from "@/assets/images/driver-portrait.jpg";
import fleetSaloon from "@/assets/images/fleet-saloon.jpg";
import fleetSeater from "@/assets/images/fleet-seater.jpg";
import fleetSienna from "@/assets/images/fleet-sienna.jpg";
import heroDriver from "@/assets/images/hero-driver.jpg";
import highwayLagos from "@/assets/images/highway-lagos.jpg";
import roadAbuja from "@/assets/images/road-abuja.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position, for frames that crop the photo. */
  position?: string;
  credit: string;
  creditUrl: string;
};

/**
 * Every photo on the site. The Unsplash and Pexels licences allow commercial
 * use without attribution; credits are kept here in case they're wanted.
 *
 * The fleet* entries are stock stand-ins, not our vehicles. To swap one,
 * replace the file in src/assets/images with a photo of the real vehicle,
 * keep the filename, and update the alt text below.
 */
export const photos = {
  heroDriver: {
    src: heroDriver,
    alt: "Driver in a white shirt at the wheel of a car",
    position: "35% 40%",
    credit: "Fortune Vieyra",
    creditUrl: "https://unsplash.com/photos/o4yi2U-qcf0",
  },
  driverPortrait: {
    src: driverPortrait,
    alt: "Driver in a white shirt seated at the wheel, holding sunglasses",
    position: "center 30%",
    credit: "Fortune Vieyra",
    creditUrl: "https://unsplash.com/photos/W1lLPnz8Chc",
  },
  corporate: {
    src: corporate,
    alt: "View from the back seat as a driver heads onto an airport road",
    position: "center 33%",
    credit: "Chethan KVS",
    creditUrl: "https://unsplash.com/photos/I_L--GSnAuI",
  },
  airportVan: {
    src: airportVan,
    alt: "White passenger van parked at an airport terminal",
    position: "center 60%",
    credit: "Yazid N",
    creditUrl: "https://unsplash.com/photos/XDw-MK_Kp6Q",
  },
  roadAbuja: {
    src: roadAbuja,
    alt: "Dark saloon car driving along a city road",
    position: "center 42%",
    credit: "Habila Mazawaje",
    creditUrl: "https://unsplash.com/photos/pTuMjzxDsOw",
  },
  highwayLagos: {
    src: highwayLagos,
    alt: "Aerial view of a multi-lane highway with yellow buses",
    position: "center 55%",
    credit: "Vitalis Nwenyi",
    creditUrl: "https://unsplash.com/photos/W7tLS5vmmCM",
  },
  fleetSaloon: {
    src: fleetSaloon,
    alt: "White Toyota Corolla saloon car",
    position: "center 65%",
    credit: "Mumtaz Niazi",
    creditUrl: "https://www.pexels.com/photo/white-toyota-corolla-on-beachfront-37620310/",
  },
  fleetSienna: {
    src: fleetSienna,
    alt: "Rear seats inside a Toyota Sienna",
    credit: "Tomasito",
    creditUrl: "https://www.pexels.com/photo/interior-of-toyota-sienna-20846594/",
  },
  fleetSeater: {
    src: fleetSeater,
    alt: "Toyota Land Cruiser Prado parked on a road",
    position: "center 55%",
    credit: "Ladimir Ladroid",
    creditUrl: "https://unsplash.com/photos/CyEyJjfgd5A",
  },
} satisfies Record<string, Photo>;
