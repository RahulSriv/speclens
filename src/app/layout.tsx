import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpecLens — Catch ambiguities before code is written",
  description: "AI-powered spec ambiguity detector. Paste any PRD, user story, or requirements doc and find gaps, contradictions, and missing edge cases — before they cost you a sprint.",
  openGraph: {
    title: "SpecLens",
    description: "AI-powered spec ambiguity detector",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
