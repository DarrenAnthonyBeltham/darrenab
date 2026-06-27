import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Darren Beltham | Personal Universe",
  description: "Crafting experiences through code, motion, and obsession.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col relative selection:bg-universe-glow/30 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}