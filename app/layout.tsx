import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeTransitionOverlay } from "@/components/theme-transition-overlay";
import { InitialLoadingScreen } from "@/components/initial-loading-screen";
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
  title: "Personal Portfolio",
  description:
    "Minimal personal portfolio template built with Next.js, ready for custom content.",
  icons: {
    icon: "/icon",
    shortcut: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50`}
      >
        <ThemeProvider>
          <InitialLoadingScreen />
          {children}
          <ThemeTransitionOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
