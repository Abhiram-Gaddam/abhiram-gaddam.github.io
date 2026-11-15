// import type { Metadata } from "next";
// import { Caveat, Work_Sans, IBM_Plex_Mono } from "next/font/google";
// import { ContentProvider } from "@/lib/ContentContext";
// import { getContent } from "@/lib/getContent";
// import "./globals.css";

// const display = Caveat({
//   subsets: ["latin"],
//   weight: ["600", "700"],
//   variable: "--font-display",
// });

// const sans = Work_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
//   variable: "--font-sans",
// });

// const mono = IBM_Plex_Mono({
//   subsets: ["latin"],
//   weight: ["400", "500"],
//   variable: "--font-mono",
// });

// export const metadata: Metadata = {
//   title: "Abhiram — Full-Stack & GenAI Developer",
//   description:
//     "Shipped platforms, real production fixes, and GenAI systems built outside the classroom.",
// };

// export default async function RootLayout({ children }: { children: React.ReactNode }) {
//   // Fetched here, server-side, before any HTML is sent — this is what makes
//   // the real content show up instantly with no client-side flash, and what
//   // lets search engines see the real page content on first crawl.
//   const initialContent = await getContent();

//   return (
//     <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
//       <body className="bg-ink bg-dot-grid bg-[length:22px_22px] font-sans text-paper antialiased">
//         <ContentProvider initialContent={initialContent}>{children}</ContentProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Caveat, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { ContentProvider } from "@/lib/ContentContext";
import { getContent } from "@/lib/getContent";
import "./globals.css";

const SITE_URL = "https://abhiram-gaddam.vercel.app";

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
  metadataBase: new URL(SITE_URL),
  title: "Abhiram Gaddam | Full-Stack & GenAI Developer",
  description:
    "Portfolio of Abhiram Gaddam (Gaddam Bhanu Venkata Abhiram), a full-stack developer building Next.js platforms, production fixes and GenAI systems.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Abhiram Gaddam",
    title: "Abhiram Gaddam | Full-Stack & GenAI Developer",
    description:
      "Shipped platforms, real production fixes, and GenAI systems built outside the classroom.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhiram Gaddam | Full-Stack & GenAI Developer",
    description:
      "Shipped platforms, real production fixes, and GenAI systems built outside the classroom.",
  },
  // Paste the token from Search Console's "HTML tag" method here later
  verification: { google: "RDtvYwgzZaMYIUdYw3J-69iMuof3S3B8q8xbD46MPEU" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Abhiram Gaddam",
    alternateName: ["Gaddam Abhiram", "Gaddam Bhanu Venkata Abhiram"],
    url: SITE_URL,
    jobTitle: "Full-Stack & GenAI Developer",
    sameAs: [
      "https://www.linkedin.com/in/abhiramgaddam",
      "https://github.com/Abhiram-Gaddam",
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialContent = await getContent();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <meta name="google-site-verification" content="RDtvYwgzZaMYIUdYw3J-69iMuof3S3B8q8xbD46MPEU" />
      <body className="bg-ink bg-dot-grid bg-[length:22px_22px] font-sans text-paper antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        <ContentProvider initialContent={initialContent}>{children}</ContentProvider>
      </body>
    </html>
  );
}