import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Rishav Jewellers | Timeless Elegance, Made to Treasure",
  description: "Discover handcrafted luxury gold, diamond, and bridal jewellery at Rishav Jewellers. Crafted with trust, celebrating every occasion.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${cinzel.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

