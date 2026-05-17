import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
