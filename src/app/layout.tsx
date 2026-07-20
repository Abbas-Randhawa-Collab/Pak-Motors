import type { Metadata } from "next";
import { Oswald, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Pak Motors Bahawalpur | Buy, Sell & Import Cars",
  description:
    "Bahawalpur's dealership for buying, selling, exchanging and importing vehicles — run by Nasir Chattha and Ali Sultan Chattha.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body>
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
