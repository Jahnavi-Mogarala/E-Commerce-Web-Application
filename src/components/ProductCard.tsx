"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/store/useCart";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const images = JSON.parse(product.images);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  };

  return (
    <div className="glass-card group flex flex-col overflow-hidden">
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
        <button 
          onClick={handleAddToCart}
          className="w-full py-3 bg-surface hover:bg-white/10 border border-white/5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
