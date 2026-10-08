import type { StaticImageData } from "next/image";
import airportVan from "@/assets/images/airport-van.jpg";
import corporate from "@/assets/images/corporate.jpg";
import driverPortrait from "@/assets/images/driver-portrait.jpg";
import fleetCamryBlack from "@/assets/images/fleet-camry-black.jpg";
import fleetCamryFront from "@/assets/images/fleet-camry-front.jpg";
import fleetCamryGrey from "@/assets/images/fleet-camry-grey.jpg";
import fleetSaloon from "@/assets/images/fleet-saloon.jpg";
import fleetSeater from "@/assets/images/fleet-seater.jpg";
import fleetSienna from "@/assets/images/fleet-sienna.jpg";
import heroDriver from "@/assets/images/hero-driver.jpg";
import hotelBathroom from "@/assets/images/hotel-bathroom.jpg";
import hotelBedroom from "@/assets/images/hotel-bedroom.jpg";
import hotelDesk from "@/assets/images/hotel-desk.jpg";
import hotelDoorway from "@/assets/images/hotel-doorway.jpg";
import hotelLounge from "@/assets/images/hotel-lounge.jpg";
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
    // Cropped from the original to remove a legible plate on a neighbouring car.
    src: airportVan,
    alt: "White passenger van parked at an airport terminal",
    position: "center 55%",
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
  // Our own Toyota Camrys. The number plates (and any others in frame) are
  // blurred in the files themselves; keep it that way for any replacement.
  fleetCamryBlack: {
    src: fleetCamryBlack,
    alt: "Black Toyota Camry saloon seen from the rear",
    position: "center 55%",
    credit: "D'Lexzyle Enterprise",
    creditUrl: "",
  },
  fleetCamryGrey: {
    src: fleetCamryGrey,
    alt: "Silver-grey Toyota Camry XLE V6 saloon seen from the rear",
    position: "center 55%",
    credit: "D'Lexzyle Enterprise",
    creditUrl: "",
  },
  fleetCamryFront: {
    src: fleetCamryFront,
    alt: "Black Toyota Camry saloon seen from the front",
    position: "center",
    credit: "D'Lexzyle Enterprise",
    creditUrl: "",
  },
  // The hotel suite, taken from the walkthrough video (720x1280 portrait
  // frames), so frame them portrait. Check every frame for people, including
  // reflections in the mirror and the TV, before adding another.
  hotelLounge: {
    src: hotelLounge,
    alt: "Suite lounge with a tufted brown sofa, an orange armchair and a wooden coffee table",
    position: "center 60%",
    credit: "D'Lexzyle Enterprise",
    creditUrl: "",
  },
  hotelBedroom: {
    src: hotelBedroom,
    alt: "King-size bed with gold cushions against a padded headboard and wood-panelled wall",
    position: "center 65%",
    credit: "D'Lexzyle Enterprise",
    creditUrl: "",
  },
  hotelDoorway: {
    src: hotelDoorway,
    alt: "The suite bedroom seen through its open door",
    position: "center 45%",
    credit: "D'Lexzyle Enterprise",
    creditUrl: "",
  },
  hotelDesk: {
    src: hotelDesk,
    alt: "Wooden work desk with two lamps, a kettle, a tea tray and bottled water",
    position: "center 50%",
    credit: "D'Lexzyle Enterprise",
    creditUrl: "",
  },
  hotelBathroom: {
    src: hotelBathroom,
    // Cropped at the sides to drop the door frame the walkthrough passes through.
    alt: "En-suite bathroom with a walk-in glass shower, towel rail and basin",
    position: "center 40%",
    credit: "D'Lexzyle Enterprise",
    creditUrl: "",
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
