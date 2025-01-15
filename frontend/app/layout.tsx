import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { PageTransition } from "@/components/PageTransition";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "SCANUEV - Advanced Conversational AI Platform",
  description:
    "SCANUEV is an advanced conversational AI platform that allows users to interact with different types of AI agents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <Navigation />
        <Suspense fallback={<Loading />}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
      </body>
    </html>
  );
}
