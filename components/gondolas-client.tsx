'use client';

import { ProductCard } from '@/components/product-card';
import { CATEGORIES, PRODUCTS } from '@/lib/products';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function GondolasClient() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || CATEGORIES[0];
  const [expandedCategory, setExpandedCategory] = useState(selectedCategory);

  const filteredProducts = PRODUCTS.filter((p) => p.category === expandedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Góndolas</h1>
        <p className="text-muted-foreground">Explora nuestras categorías como en un supermercado real</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg shadow-sm border border-border p-4 sticky top-24">
            <h2 className="font-bold text-foreground mb-4">Categorías</h2>
            <div className="space-y-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setExpandedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
                    expandedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-muted'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Gondola Header */}
          <div className="bg-secondary rounded-lg p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl">🛒</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{expandedCategory}</h2>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} productos disponibles
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay productos en esta categoría</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
