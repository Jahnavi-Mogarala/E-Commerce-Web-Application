import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

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
            <Link href="/shop" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 block text-center">
              Explore Products
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 blur-[100px] -z-10 rounded-full" />
          <Image src="https://pngimg.com/uploads/macbook/macbook_PNG8.png" alt="Hero Product" width={600} height={600} className="drop-shadow-2xl hover:scale-105 transition-transform duration-700" priority />
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-center">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </section>
    </main>
  );
}
