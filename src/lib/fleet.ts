import type { Photo } from "./images";

export type Vehicle = {
  id: "saloon" | "sienna" | "seater";
  name: string;
  summary: string;
  seats: string;
  luggage: string;
  bestFor: string;
  amenities: string;
  /**
   * Photo of the actual vehicle. Leave it undefined until a real photo is
   * available: the About page then shows a placeholder frame and the Services
   * page falls back to its stock stand-in. See the plate rule in images.ts.
   */
  photo?: Photo;
};

/**
 * The vehicles we hire out, shared by the Services and About pages. The
 * matching labels in QuoteForm's `vehicleTypes` are not shared, so change
 * them together. Specifications are PLACEHOLDER: confirm each against the
 * real vehicles.
 */
export const fleet: Vehicle[] = [
  {
    id: "saloon",
    name: "Toyota Saloon Vehicles",
    summary:
      "Clean, comfortable saloon cars for executive travel, airport runs and day-to-day movement.",
    seats: "4 passengers",
    luggage: "2 large suitcases",
    bestFor: "Executive travel, airport pickups",
    amenities: "Air conditioning, phone charging",
  },
  {
    id: "sienna",
    name: "Sienna Space Buses",
    summary:
      "Toyota Sienna buses for family trips, group travel and airport transfers.",
    seats: "7 passengers",
    luggage: "4 large suitcases",
    bestFor: "Family trips, field teams",
    amenities: "Air conditioning, phone charging, tinted windows",
  },
  {
    id: "seater",
    name: "6/7-Seater Passenger Vehicles",
    summary:
      "Six- and seven-seat vehicles for team transport, event shuttles and larger groups.",
    seats: "6 to 7 passengers",
    luggage: "5 suitcases",
    bestFor: "Team transport, event shuttles",
    amenities: "Air conditioning, phone charging",
  },
];
