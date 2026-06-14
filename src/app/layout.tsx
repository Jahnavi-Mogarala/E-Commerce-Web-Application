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

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "NEXT STORE | Premium E-Commerce",
  description: "A premium full stack e-commerce web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Global Navbar */}
        <nav className="fixed w-full z-50 glass px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-gradient tracking-tighter cursor-pointer">NEXT STORE</h1>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
            <button className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
