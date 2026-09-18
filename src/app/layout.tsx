import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative URL below (OG images, canonicals) resolve to an
  // absolute one, which crawlers require. Driven by `site.url`.
  metadataBase: new URL(site.url),
  title: {
    default: "Car Hire in Asaba, Delta State | D'Lexzyle Enterprise",
    template: "%s | D'Lexzyle Enterprise",
  },
  description:
    "Car hire and vehicle leasing in Asaba, Delta State. D'Lexzyle Enterprise serves individuals, companies, government agencies and NGOs across South-South and South-East Nigeria.",
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
      "Car hire and vehicle leasing for individuals, organisations, agencies and NGOs across South-South and South-East Nigeria.",
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
      "Car hire and vehicle leasing for individuals, organisations, agencies and NGOs across South-South and South-East Nigeria.",
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
    <html lang="en-NG">
      <body className={`${inter.variable} antialiased`}>
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
