import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreelanceHub - Freelance Jobs, Internships & Top Talent",
    template: "%s | FreelanceHub"
  },
  description: "FreelanceHub connects freelancers and reliable interns with clients worldwide. Post jobs or internships, submit proposals, and grow your career or business.",
  keywords: ["freelance", "freelancer", "jobs", "internships", "interns", "remote work", "hire freelancers", "hire interns", "find work", "contracts", "proposals"],
  authors: [{ name: "FreelanceHub" }],
  creator: "FreelanceHub",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "FreelanceHub - Freelance Jobs, Internships & Top Talent",
    description: "The premier platform connecting talented freelancers and ambitious interns with clients worldwide.",
    siteName: "FreelanceHub",
  },

  twitter: {
    card: "summary_large_image",
    title: "FreelanceHub - Freelance Jobs, Internships & Top Talent",
    description: "The premier platform connecting talented freelancers and ambitious interns with clients worldwide.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

import { ToastProvider } from "@/components/ui/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
