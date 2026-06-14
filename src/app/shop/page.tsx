import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Filter } from "lucide-react";

export default async function Shop() {
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">All Products</h1>
          <p className="text-text-muted">Browse our entire collection of premium items.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-surface border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const images = JSON.parse(product.images);
          return (
            <div key={product.id} className="glass-card group flex flex-col overflow-hidden">
              <div className="relative h-56 overflow-hidden bg-white/5">
                <Image 
                  src={images[0]} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold">{product.name}</h4>
                  <span className="text-primary font-semibold">${product.price}</span>
                </div>
                <p className="text-text-muted text-xs mb-4 line-clamp-2 flex-1">{product.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400 text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3" />
                  </div>
                  <span className="text-[10px] text-text-muted">(128)</span>
                </div>
                <button className="w-full py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
