import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "ridelab · Cycling Experience Demo",
  description:
    "A showcase of personalization, search and PIM intelligence for cycling e-commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
          <Header />
          {children}
          <Analytics />
        </body>
    </html>
  );
}
