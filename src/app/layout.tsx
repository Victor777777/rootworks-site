import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Root Works — AI-Powered Agency",
  description:
    "We design, build, and ship from concept to code. Websites, apps, automations, and AI training — shipped in days, not months.",
  icons: {
    icon: "/logo-sprout.png",
    apple: "/logo-sprout.png",
  },
  openGraph: {
    title: "Root Works — AI-Powered Agency",
    description:
      "We design, build, and ship from concept to code. Senior team, AI-native edge, soul-driven craft.",
    url: "https://rootworks.ai",
    siteName: "Root Works",
    locale: "en_US",
    type: "website",
    images: ["/logo-full.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Root Works — AI-Powered Agency",
    description:
      "We design, build, and ship from concept to code. Shipped in days, not months.",
    images: ["/logo-full.png"],
  },
  metadataBase: new URL("https://rootworks.ai"),
  alternates: {
    canonical: "https://rootworks.ai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Root Works",
  url: "https://rootworks.ai",
  description:
    "AI-powered full-service agency. Websites, apps, automations, SEO systems, and AI training programs.",
  email: "victor@rootworks.io",
  sameAs: ["https://github.com", "https://linkedin.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
