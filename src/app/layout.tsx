import type { Metadata } from "next";
import { Archivo, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import SiteMotion from "@/components/SiteMotion";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { site } from "@/lib/site";

// Archivo for body copy; Bebas Neue (one weight, always uppercase) for every
// headline, button and menu label through the `font-display` utility.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Runs before first paint. Marks the document as having JavaScript (so the
 * CSS may hide elements the intro will reveal) and decides whether this is
 * the first load of the session, which gets the full preloader.
 */
const introScript = `document.documentElement.classList.add("js");try{var k="dlexzyle-intro";document.documentElement.dataset.intro=sessionStorage.getItem(k)?"short":"full";sessionStorage.setItem(k,"1")}catch(e){document.documentElement.dataset.intro="short"}`;

export const metadata: Metadata = {
  // Makes every relative URL below (OG images, canonicals) resolve to an
  // absolute one, which crawlers require. Driven by `site.url`.
  metadataBase: new URL(site.url),
  title: {
    default: "Car Hire in Asaba, Delta State | D'Lexzyle Enterprise",
    template: "%s | D'Lexzyle Enterprise",
  },
  description:
    "Safe, reliable car hire and vehicle leasing in Asaba, Delta State, with a vetted driver on every hire. D'Lexzyle Enterprise serves individuals, companies, government agencies and NGOs across the South-South and South-East, and across Nigeria.",
  alternates: {
    canonical: "/",
  },
  icons: {
    // favicon.ico is also published automatically by Next.js. Both assets
    // contain our logo; declared dimensions must match the actual PNG.
    icon: [
      { url: "/logo-square.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/logo-square.png", sizes: "512x512", type: "image/png" }],
    shortcut: ["/logo-square.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Car Hire in Asaba, Delta State | D'Lexzyle Enterprise",
    description:
      "Safe, reliable car hire and vehicle leasing with a vetted driver on every hire, for individuals, organisations, agencies and NGOs across the South-South and South-East, and across Nigeria.",
    url: "/",
    siteName: site.name,
    locale: "en_NG",
    images: [{ url: "/logo-square.png", width: 512, height: 512, alt: "D'Lexzyle Enterprise logo" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Car Hire in Asaba, Delta State | D'Lexzyle Enterprise",
    description:
      "Safe, reliable car hire and vehicle leasing with a vetted driver on every hire, for individuals, organisations, agencies and NGOs across the South-South and South-East, and across Nigeria.",
    images: ["/logo-square.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <body className={`${archivo.variable} ${bebas.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
    `}
        </Script>
        <StructuredData />
        <SiteMotion />
        <Navbar />
        <SmoothScroll>
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
