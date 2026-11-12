import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KumbhConnect 2027 — Haridwar Ardh Kumbh Travel & Business Super-App",
  description: "Complete spiritual companion, temple guide, Snan calendar, verified hotel booking & transport marketplace for Haridwar Ardh Kumbh 2027.",
  manifest: "/manifest.json",
  icons: {
    icon: "/next.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#F47A20",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FFFCF8]">{children}</body>
    </html>
  );
}
