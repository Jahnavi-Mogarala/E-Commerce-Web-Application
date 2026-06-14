import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";

export default async function Shop() {
  // Fetch all products for the shop page
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar - Kept identical to home page so we don't change anything else */}
      <nav className="fixed w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gradient tracking-tighter">NEXT STORE</h1>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/shop" className="hover:text-primary transition-colors text-primary font-semibold">Shop</Link>
          <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
          <button className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </button>
        </div>
      </nav>

      {/* Shop Header & Products Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">All Products</h2>
          <p className="text-text-muted text-lg">Browse our complete collection of premium items.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const images = JSON.parse(product.images);
            return (
              <div key={product.id} className="glass-card group flex flex-col overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image src={images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{product.name}</h4>
                    <span className="text-primary font-semibold">${product.price}</span>
                  </div>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400 text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-text-muted">(128 reviews)</span>
                  </div>
                  <button className="w-full py-3 bg-surface hover:bg-white/10 border border-white/5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
