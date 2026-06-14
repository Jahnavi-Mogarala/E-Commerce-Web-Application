"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/useCart";

export default function Navbar() {
  const items = useCart((state) => state.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed w-full z-50 glass px-6 py-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold text-gradient tracking-tighter">NEXT STORE</h1>
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/shop" className="hover:text-primary transition-colors font-semibold">Shop</Link>
        <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
        <button className="relative hover:scale-110 transition-transform">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
