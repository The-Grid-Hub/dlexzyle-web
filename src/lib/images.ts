import type { StaticImageData } from "next/image";
import airportVan from "@/assets/images/airport-van.jpg";
import corporate from "@/assets/images/corporate.jpg";
import driverPortrait from "@/assets/images/driver-portrait.jpg";
import fleetSaloon from "@/assets/images/fleet-saloon.jpg";
import fleetSeater from "@/assets/images/fleet-seater.jpg";
import fleetSienna from "@/assets/images/fleet-sienna.jpg";
import heroDriver from "@/assets/images/hero-driver.jpg";
import highwayLagos from "@/assets/images/highway-lagos.jpg";
import privateMinivan from "@/assets/images/private-minivan.jpg";
import privateSuv from "@/assets/images/private-suv.jpg";
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
 * use without attribution, and the Wikimedia Commons photos are public domain;
 * credits are kept here in case they're wanted.
 *
 * The fleet* entries are stock stand-ins, not our vehicles. To swap one,
 * replace the file in src/assets/images with a photo of the real vehicle,
 * keep the filename, and update the alt text below.
 *
 * No photo here may show a readable number plate -- a registration is personal
 * data. Check the full-resolution file, front and rear, before adding it.
 *
 * privateMinivan and privateSuv are the two panels of the Private Car Hire
 * collage, one per vehicle type. Their positions are tuned for a portrait cell.
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
    alt: "Executive in a suit taking a call in the back seat of a car",
    position: "62% center",
    credit: "Emmanuel Ondoua",
    creditUrl: "https://www.pexels.com/photo/a-man-talking-on-the-smartphone-6841078/",
  },
  airportVan: {
    src: airportVan,
    alt: "White passenger van parked at an airport terminal",
    position: "center 60%",
    credit: "Yazid N",
    creditUrl: "https://unsplash.com/photos/XDw-MK_Kp6Q",
  },
  privateMinivan: {
    src: privateMinivan,
    alt: "White Toyota Sienna minivan parked in a car park",
    position: "15% center",
    credit: "IFCAR",
    creditUrl: "https://commons.wikimedia.org/wiki/File:2007-2009_Toyota_Sienna_LE_--_06-26-2009.jpg",
  },
  privateSuv: {
    src: privateSuv,
    alt: "Silver Toyota Land Cruiser Prado parked beside a harbour fence",
    position: "center",
    credit: "OSX",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:2005_Toyota_Land_Cruiser_Prado_(GRJ120R)_GXL_(2012-10-26).jpg",
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
