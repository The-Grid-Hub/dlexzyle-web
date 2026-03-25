import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Request A Quote — D'Lexzyle Enterprises",
  description:
    "Request a car hire quote from D'Lexzyle Enterprises. Fill in your trip details and we'll get back to you.",
};

const inputBase =
  "w-full rounded-[10px] border border-gray-300 bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green";

const labelBase = "mb-1.5 block text-sm font-medium text-text-primary";

export default function RequestQuotePage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-brand-light py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Request A Quote"
            subtitle="Tell us about your trip and we'll provide a tailored quote."
          />
        </Container>
      </section>

      {/* Form */}
      <section className="py-16 sm:py-20">
        <Container className="max-w-2xl">
          <form
            onSubmit={undefined}
            className="grid gap-6 sm:grid-cols-2"
            aria-label="Request a quote form"
          >
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className={labelBase}>
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                required
                className={inputBase}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelBase}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                required
                className={inputBase}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelBase}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={inputBase}
              />
            </div>

            {/* Pickup */}
            <div>
              <label htmlFor="pickup" className={labelBase}>
                Pickup Location
              </label>
              <input
                id="pickup"
                name="pickup"
                type="text"
                placeholder="e.g. Lagos, Ikeja"
                required
                className={inputBase}
              />
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="destination" className={labelBase}>
                Destination
              </label>
              <input
                id="destination"
                name="destination"
                type="text"
                placeholder="e.g. Abuja, Wuse"
                required
                className={inputBase}
              />
            </div>

            {/* Date & Time */}
            <div>
              <label htmlFor="datetime" className={labelBase}>
                Date &amp; Time
              </label>
              <input
                id="datetime"
                name="datetime"
                type="datetime-local"
                required
                className={inputBase}
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label htmlFor="vehicleType" className={labelBase}>
                Vehicle Type
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                required
                className={inputBase}
                defaultValue=""
              >
                <option value="" disabled>
                  Select vehicle
                </option>
                <option value="saloon">Toyota Saloon</option>
                <option value="sienna">Sienna Space Bus</option>
                <option value="passenger">6/7-Seater Passenger</option>
              </select>
            </div>

            {/* Trip Type */}
            <div>
              <label htmlFor="tripType" className={labelBase}>
                Trip Type
              </label>
              <select
                id="tripType"
                name="tripType"
                required
                className={inputBase}
                defaultValue=""
              >
                <option value="" disabled>
                  Select trip type
                </option>
                <option value="one-way">One-Way</option>
                <option value="round-trip">Round Trip</option>
                <option value="multi-day">Multi-Day</option>
              </select>
            </div>

            {/* Notes */}
            <div className="sm:col-span-2">
              <label htmlFor="notes" className={labelBase}>
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Any special requirements or details..."
                className={inputBase}
              />
            </div>

            {/* Submit */}
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary" className="w-full">
                Submit Quote Request
              </Button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}
