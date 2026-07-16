import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./expanded.css";
import "./social.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Motos House Kenitra — Machines d’exception", template: "%s — Motos House" },
  description: "Motos premium, équipement et accompagnement personnalisé à Kénitra, Maroc.",
  keywords: ["moto Kenitra", "motos Maroc", "équipement moto", "moto premium"],
  openGraph: { title: "Motos House Kenitra", description: "Ride beyond limits.", type: "website", locale: "fr_MA" },
  twitter: { card: "summary_large_image", title: "Motos House Kenitra", description: "Machines d’exception à Kénitra." },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
