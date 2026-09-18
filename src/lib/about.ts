/**
 * Content for the About page. Everything in this file marked PLACEHOLDER is
 * draft copy written so the layout can be reviewed: confirm each item with
 * management and replace it before the page goes live.
 *
 * The About page follows the reference layout: `intro` (hero), `statement`,
 * `storyPanel`, `goals`, `keyAdvantages`, `mission`, `tagline` and `facts`,
 * in that order. `bookingSteps` is shown on the Request a Quote page and
 * `established` also drives the home page ticker. The remaining exports
 * (`story`, `milestones`, `team`, `standards`, `clientStories`, `faqs`) are
 * kept as confirmed-copy stock for a future page; nothing renders them today.
 */

/** PLACEHOLDER: the year the business was registered. Drives "years operating". */
export const established = 2016;

/** When the figures below were last checked. Shown beneath them. */
export const figuresUpdated = new Date(2026, 8, 1);

/** PLACEHOLDER narrative. Keep it to three short paragraphs. */
export const story = [
  "D'Lexzyle Enterprise began in Asaba with a handful of vehicles and a simple promise: turn up on time, in a clean car, with a driver who knows the road. Most of our early work was airport runs and day trips for families and local businesses.",
  "Word travelled. Development organisations running programmes across Delta, Anambra and the neighbouring states needed vehicles they could book for weeks at a time, with drivers who could handle long interstate journeys. That work shaped the company we are today.",
  "We still answer every enquiry ourselves, and the founder still checks the fleet. What has changed is scale: more vehicles, more drivers, and clients who book us year after year.",
];

/** PLACEHOLDER milestones, oldest first. */
export const milestones = [
  {
    year: 2016,
    title: "Registered in Asaba",
    detail:
      "Started with two Toyota saloon cars and a focus on airport transfers.",
  },
  {
    year: 2018,
    title: "First long-term contract",
    detail:
      "Took on a month-long field-visit schedule for an international NGO.",
  },
  {
    year: 2020,
    title: "Sienna buses join the fleet",
    detail: "Group travel and team shuttles became a core service.",
  },
  {
    year: 2023,
    title: "Vehicle leasing launched",
    detail:
      "Long-term leases with maintenance included, for organisations that need a car on hand.",
  },
  {
    year: 2025,
    title: "Twelve vehicles and counting",
    detail:
      "Drivers now cover all thirty-six states in Nigeria, including FCT.",
  },
];

/** Whole years since `established`, for the facts and the story panel. */
export const yearsOperating = new Date().getFullYear() - established;

/**
 * PLACEHOLDER hero copy. `caption` completes the business name printed above
 * it ("D'Lexzyle Enterprise is a car hire..."), so it starts lower-case.
 */
export const intro = {
  caption:
    "is a car hire and vehicle leasing company in Asaba, with a professional driver on every hire.",
  paragraphs: [
    "We serve individuals, companies, government agencies and NGOs across the South-South and South-East, and across Nigeria, from a one-hour airport run to a two-year lease.",
    "Safety comes first on every trip. Our drivers are vetted, trained and experienced on long interstate routes, every vehicle is inspected before it leaves the yard, and a named contact stays reachable for the whole journey.",
  ],
};

/** PLACEHOLDER. The large statement read word by word after the hero. Two short paragraphs. */
export const statement = [
  "Turn up on time, in a clean car, with a driver who knows the road and gets you there safely. That was the promise when we started, and it still is.",
  "Development organisations, banks, hotels and families across thirty-six states in Nigeria, including FCT, book us because we keep it.",
];

/**
 * PLACEHOLDER. The dark "Why us?" panel. `lead` completes the business name
 * printed as the panel's title, so it starts lower-case.
 */
export const storyPanel = {
  lead: [
    "is a reliable car hire and leasing partner for executive travel, field work and long-term vehicle needs.",
    "We provide the full range: airport transfers, city and interstate trips, team shuttles, event fleets and leases with maintenance included.",
  ],
  caption: `Operating since ${established}, with ${yearsOperating}+ years on the road, we guarantee punctuality, safety and a straight answer at every step.`,
  paragraphs: [
    "Our team is made up of experienced drivers and a responsive office that answers every enquiry itself, united by one goal: get every client to their destination safely and on time.",
    "We keep improving through scheduled servicing, pre-trip inspections, flight tracking for airport pickups and a named contact for every booking.",
  ],
};

/** PLACEHOLDER goals. Each `verb` heads a card and `detail` completes the sentence. */
export const goals = [
  {
    verb: "Deliver",
    detail: "every passenger safely and on time, in a clean, inspected vehicle, on every trip.",
  },
  {
    verb: "Handle",
    detail: "the driver, the fuel, the route and the paperwork, so clients can focus on the journey.",
  },
  {
    verb: "Offer",
    detail: "clear pricing and flexible terms, from one airport run to a multi-year lease.",
  },
];

/**
 * PLACEHOLDER. The six numbered promises in the pinned "Our key advantages"
 * list. They overlap with `advantages` (advantages.ts) on the home page and
 * with `standards` below, so change all three together.
 */
export const keyAdvantages = [
  "Passenger safety first, and guaranteed punctuality, on every hire.",
  "Competitive pricing and clear terms, with nothing hidden in the quote.",
  "Tailor-made hire and leasing for organisations of any size.",
  "Flight-tracked airport pickups and a named contact for every booking.",
  "Serviced, insured and inspected vehicles, with a replacement if one develops a fault.",
  "Drivers who know the roads across all thirty-six states in Nigeria, including FCT.",
];

/** PLACEHOLDER mission. Two short paragraphs, read word by word. */
export const mission = [
  "To build reliable, long-term relationships with the organisations and families that keep the South-South, the South-East and the rest of Nigeria moving.",
  "We add vehicles, train drivers and refine how we work, so that every trip is safer and simpler than the last.",
];

/** PLACEHOLDER. The pale panel's header row and its one-line tagline. */
export const tagline = {
  head: ["Car hire", "Leasing", `Since ${established}`],
  title: "Safe, on-time travel across the South-South and South-East, and across Nigeria.",
};

/**
 * PLACEHOLDER facts. Only publish numbers the company can substantiate, and
 * update `figuresUpdated` whenever these change.
 */
export const facts = [
  {
    value: `${yearsOperating}+`,
    detail: `Over ${yearsOperating} years of car hire and leasing across Nigeria.`,
  },
  // {
  //   value: "12",
  //   detail: "Twelve vehicles across saloon, SUV and bus, all with a driver.",
  // },
  {
    value: "5,000+",
    detail: "Over 5,000 trips completed across thirty-six states in Nigeria, including FCT.",
  },
  {
    value: "100%",
    detail: `Every passenger delivered safely, on every trip, since ${established}.`,
  },
];

/** PLACEHOLDER team. Names are left blank on purpose; add photos in images.ts. */
export const team = [
  {
    name: "[Full name]",
    role: "Founder & Managing Director",
    bio: "Started the company and still signs off every corporate booking.",
  },
  {
    name: "[Full name]",
    role: "Operations Manager",
    bio: "Your first point of contact. Handles quotes, scheduling and driver assignments.",
  },
  {
    name: "[Full name]",
    role: "Fleet Supervisor",
    bio: "Keeps the service records, inspects each vehicle before it goes out and manages our drivers.",
  },
];

/** PLACEHOLDER standards. Every line is a promise, so confirm each one. */
export const standards = [
  {
    group: "Drivers",
    items: [
      {
        title: "Licensed and vetted",
        detail:
          "Every driver holds a valid driver's licence and passes identity and guarantor checks before joining.",
      },
      {
        title: "Reachable for the whole trip",
        detail:
          "You have the driver's number and a manager's number from pickup to drop-off, and the driver checks in on long journeys.",
      },
      {
        title: "Experienced on long routes",
        detail:
          "Interstate trips go to drivers with at least five years on the road.",
      },
      {
        title: "Presentable and punctual",
        detail:
          "Drivers wear a uniform, arrive early and keep the vehicle clean throughout the trip.",
      },
    ],
  },
  {
    group: "Vehicles",
    items: [
      {
        title: "Serviced on schedule",
        detail:
          "Each vehicle follows the manufacturer's service intervals, and we keep the records.",
      },
      {
        title: "Inspected before every trip",
        detail:
          "Tyres, brakes, air conditioning, fuel and documents are checked before a vehicle leaves the yard.",
      },
      {
        title: "Insured and documented",
        detail:
          "Valid insurance, roadworthiness and registration papers travel with every vehicle.",
      },
    ],
  },
  {
    group: "Support",
    items: [
      {
        title: "One number for everything",
        detail:
          "Bookings, changes and questions all go through the same WhatsApp line.",
      },
      {
        title: "A named contact for every booking",
        detail:
          "You get the driver's name and number before pickup, and a manager's number for anything else.",
      },
      {
        title: "A replacement, not an apology",
        detail:
          "If a vehicle develops a fault on a trip, we send another one.",
      },
    ],
  },
];

/**
 * PLACEHOLDER client stories and quotes. Organisations are described by type
 * only until each client has given permission to be named.
 */
export const clientStories = [
  {
    title: "Field visits across three states",
    client: "International development NGO",
    need: "A team of six had to visit programme sites in Delta, Anambra and Imo over two weeks.",
    provided:
      "A Sienna bus with a dedicated driver for 14 days, with fuel and the driver's lodging included.",
    outcome:
      "Every site visit ran to schedule. The same team now books with us each quarter.",
    quote:
      "The driver knew every road we needed and was waiting outside the hotel before we came down each morning.",
    attribution: "Programme officer, international NGO",
  },
  {
    title: "Executive airport transfers",
    client: "Regional bank",
    need: "Reliable pickups from Asaba Airport for visiting executives, often at short notice.",
    provided:
      "A Toyota saloon on standby, with a driver who tracks flight arrivals.",
    outcome: "No missed pickups in over a year of service.",
    quote:
      "We send the flight number and stop thinking about it. That is exactly what we need.",
    attribution: "Executive assistant, regional bank",
  },
  {
    title: "A vehicle for a project office",
    client: "Consultancy running a donor-funded programme",
    need: "A car for a two-year project office in Asaba, without the cost of buying one.",
    provided:
      "A leased SUV with maintenance, insurance and replacement cover.",
    outcome:
      "The office had a vehicle from day one and handed it back when the programme closed.",
    quote:
      "Leasing meant one invoice a month and nothing to sell at the end.",
    attribution: "Project manager, development consultancy",
  },
];

/** PLACEHOLDER: confirm notice periods, payment and what a quote covers. */
export const bookingSteps = [
  {
    title: "Enquire",
    detail:
      "Send your pickup point, destination, dates and number of passengers on WhatsApp or through the quote form.",
  },
  {
    title: "Get a quote",
    detail:
      "We reply the same working day with a price, the vehicle we recommend and what the price covers.",
  },
  {
    title: "Confirm",
    detail:
      "Pay the agreed deposit by bank transfer. You receive a confirmation with your driver's name and number.",
  },
  {
    title: "Pickup",
    detail:
      "Your driver arrives at the agreed time and place. For airport pickups, they track the flight.",
  },
];

/** PLACEHOLDER answers. Each one states a policy, so confirm before launch. */
export const faqs = [
  {
    question: "Do your vehicles come with a driver?",
    answer:
      "Yes. Every hire includes a professional driver. We don't offer self-drive.",
  },
  {
    question: "How do you keep passengers safe?",
    answer:
      "Every driver is licensed, vetted and experienced on the routes we cover, every vehicle is inspected before it leaves the yard, and you have the driver's and a manager's number for the whole trip. On long journeys we plan the route and departure time with you in advance.",
  },
  {
    question: "Do you do airport pickups?",
    answer:
      "Yes. Asaba Airport is our base, and we also collect from Enugu, Owerri, Benin and Port Harcourt airports. Send us the flight number and the driver will track the arrival.",
  },
  {
    question: "Can I hire a vehicle for interstate travel?",
    answer:
      "Yes. We cover all thirty-six states in Nigeria, including FCT, by arrangement. Multi-day quotes include the driver's lodging.",
  },
  {
    question: "Is fuel included in the price?",
    answer:
      "Your quote includes fuel for the agreed route. If the itinerary changes on the day, extra fuel is charged at cost.",
  },
  {
    question: "What happens if I keep the driver waiting?",
    answer:
      "Each booking includes one hour of waiting time at pickup. After that, waiting is charged per hour at the rate shown in your quote.",
  },
  {
    question: "How much notice do you need?",
    answer:
      "Twenty-four hours for trips within Asaba, and 48 hours for interstate or multi-day bookings. We can often help at shorter notice, subject to availability.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancel free of charge up to 24 hours before pickup. Later cancellations forfeit the deposit.",
  },
  {
    question: "How do I pay?",
    answer:
      "By bank transfer. A deposit confirms the booking and the balance is due on or before pickup. Organisations can be invoiced.",
  },
];
