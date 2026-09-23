import type { Metadata } from "next";
import { Caveat, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { ContentProvider } from "@/lib/ContentContext";
import { getContent } from "@/lib/getContent";
import "./globals.css";

const display = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Abhiram — Full-Stack & GenAI Developer",
  description:
    "Shipped platforms, real production fixes, and GenAI systems built outside the classroom.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetched here, server-side, before any HTML is sent — this is what makes
  // the real content show up instantly with no client-side flash, and what
  // lets search engines see the real page content on first crawl.
  const initialContent = await getContent();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-ink bg-dot-grid bg-[length:22px_22px] font-sans text-paper antialiased">
        <ContentProvider initialContent={initialContent}>{children}</ContentProvider>
      </body>
    </html>
  );
}