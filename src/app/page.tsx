import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";

export default async function Home() {
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gradient tracking-tighter">NEXT STORE</h1>
        <div className="flex gap-6 items-center">
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
          <button className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            ✨ New Collection Available
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Elevate Your <br />
            <span className="text-gradient">Digital Lifestyle</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl leading-relaxed">
            Discover our premium selection of tech, fashion, and accessories designed for the modern creator.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-1">
              Explore Products
            </button>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 blur-[100px] -z-10 rounded-full" />
          <Image src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hero" width={600} height={600} className="rounded-3xl shadow-2xl border border-white/10" priority />
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-center">Featured Products</h3>
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
