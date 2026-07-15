import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DANZ RENTAL | Premium Car Rental in Penang",
  description: "Affordable, reliable, and hassle-free car rental services in Penang. We serve tourists, students, working professionals, families, and business travelers.",
  openGraph: {
    title: "DANZ RENTAL | Premium Car Rental in Penang",
    description: "Affordable, reliable, and hassle-free car rental services in Penang. Book your premium vehicle today.",
    type: "website",
    locale: "en_MY",
  }
};

import { CarsProvider } from "@/context/CarsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-sans flex flex-col">
        <CarsProvider>
          {children}
        </CarsProvider>
      </body>
    </html>
  );
}
