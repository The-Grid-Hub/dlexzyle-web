import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
    default: "Car Hire in Asaba, Delta State | D'Lexzyle Enterprises",
    template: "%s | D'Lexzyle Enterprises",
  },
  description:
    "Car hire and vehicle leasing in Asaba, Delta State. D'Lexzyle Enterprises serves individuals, companies, government agencies and NGOs across South-South and South-East Nigeria.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo_.png", type: "image/png" },
      { url: "/logo_.png", sizes: "32x32", type: "image/png" },
      { url: "/logo_.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/logo_.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/logo_.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Car Hire in Asaba, Delta State | D'Lexzyle Enterprises",
    description:
      "Car hire and vehicle leasing for individuals, organisations, agencies and NGOs across South-South and South-East Nigeria.",
    url: "/",
    siteName: site.name,
    locale: "en_NG",
    images: [{ url: "/logo_.png", width: 512, height: 512, alt: "D'Lexzyle Enterprises logo" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Car Hire in Asaba, Delta State | D'Lexzyle Enterprises",
    description:
      "Car hire and vehicle leasing for individuals, organisations, agencies and NGOs across South-South and South-East Nigeria.",
    images: ["/logo_.png"],
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
        <StructuredData />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
