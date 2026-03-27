import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "D'Lexzyle Enterprises — Logistics & Services",
  description:
    "D'Lexzyle Enterprise provides dependable car hire solutions for individuals, corporate organisations, government agencies, and NGOs across Nigeria.",
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
    title: "D'Lexzyle Enterprises — Logistics & Services",
    description:
      "Dependable car hire and logistics solutions for individuals, organisations, agencies, and NGOs across Nigeria.",
    images: [{ url: "/logo_.png", width: 512, height: 512, alt: "D'Lexzyle Enterprises logo" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "D'Lexzyle Enterprises — Logistics & Services",
    description:
      "Dependable car hire and logistics solutions for individuals, organisations, agencies, and NGOs across Nigeria.",
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
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
