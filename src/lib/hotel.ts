import { photos, type Photo } from "./images";

/**
 * Content for the Hotel page (/hotel) and the home page's HotelTeaser.
 * Everything marked PLACEHOLDER is draft copy written from the walkthrough
 * video so the layout can be reviewed: confirm each item with management
 * before launch. Rates are deliberately absent; the booking form asks for
 * them on WhatsApp, as the car hire forms do.
 */

/** PLACEHOLDER: where the rooms are. Used in the page copy and metadata. */
export const hotelLocation = "Asaba, Delta State";

/** Hero copy. PLACEHOLDER. */
export const hotelIntro =
  "A quiet suite with a separate lounge, a king-size bed and an en-suite shower, booked on the same WhatsApp line as your car. Add an airport pickup and the driver brings you straight to the door.";

/** The large statement read word by word after the hero. PLACEHOLDER. */
export const hotelStatement = [
  "For years we have met guests at the airport and driven them to someone else's hotel.",
  "Now the car and the room come from the same people, on one booking.",
];

export type SuiteSpace = {
  name: string;
  /** One line on what is in it; only what the walkthrough shows. */
  detail: string;
  photo: Photo;
};

/**
 * The stops on the suite tour, in the order you walk through it. Every
 * detail here is visible in the walkthrough video; add nothing that isn't
 * confirmed. PLACEHOLDER: "Executive suite" is our name for it until
 * management gives the room types their real names.
 */
export const suite = {
  name: "Executive suite",
  spaces: [
    {
      name: "The lounge",
      detail: "A tufted sofa, an armchair and a coffee table, with its own wall-mounted TV and air conditioning.",
      photo: photos.hotelLounge,
    },
    {
      name: "The bedroom",
      detail: "A king-size bed against a padded headboard and a wood-panelled wall, with a wardrobe and a bedside phone.",
      photo: photos.hotelBedroom,
    },
    {
      name: "The desk",
      detail: "A long work desk with two lamps, a kettle, a tea and coffee tray and bottled water.",
      photo: photos.hotelDesk,
    },
    {
      name: "The bathroom",
      detail: "An en-suite with a walk-in glass shower, a basin and fresh towels.",
      photo: photos.hotelBathroom,
    },
  ] satisfies SuiteSpace[],
};

/**
 * What the suite has, as seen in the walkthrough. PLACEHOLDER: Wi-Fi, power
 * back-up, parking, breakfast and security are likely but not shown, so they
 * are left out until management confirms them.
 */
export const amenities = [
  "Separate lounge",
  "King-size bed",
  "En-suite glass shower",
  "Air conditioning in every room",
  "TV in the lounge and bedroom",
  "Work desk with lamps",
  "Kettle, tea and coffee",
  "Bottled water",
  "Wardrobe",
  "Bedside phone",
];

/**
 * The three steps of a Stay + Ride booking: the car service and the hotel on
 * one booking. The airports are the ones in `homeServices` (services.ts);
 * change them together.
 */
export const stayRide = [
  {
    title: "Met at the airport",
    detail: "Your driver tracks the flight and waits at arrivals in Asaba, Enugu, Owerri, Benin or Port Harcourt.",
  },
  {
    title: "Straight to your room",
    detail: "The suite is ready when you arrive. No taxi queue, and no directions to give.",
  },
  {
    title: "A car while you stay",
    detail: "Keep a driver on call for meetings and errands, and a drop-off at the airport when you leave.",
  },
];

/** The airports offered on the booking form's pickup option. */
export const pickupAirports = ["Asaba", "Enugu", "Owerri", "Benin", "Port Harcourt"];

/** "What happens next" beside the booking form. PLACEHOLDER: confirm how a room is held. */
export const stayBookingSteps = [
  {
    title: "We check the dates",
    detail: "We reply on WhatsApp with availability and the nightly rate, the same working day.",
  },
  {
    title: "You confirm",
    detail: "Once you confirm, we hold the room in your name.",
  },
  {
    title: "Your driver is booked",
    detail: "If you added a pickup, you get the driver's name and number the day before you arrive.",
  },
];
