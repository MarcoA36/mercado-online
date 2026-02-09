'use client';

import { Header } from '@/components/header';
import { CartProvider } from '@/lib/cart-context';
import { ProductCard } from '@/components/product-card';
import { PRODUCTS } from '@/lib/products';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);

  const filteredProducts = PRODUCTS.filter((product) => {
    const searchLower = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
          <ArrowLeft className="w-5 h-5" />
          Atrás
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-4">Resultados de búsqueda</h1>

        {/* Search Input */}
        <div className="flex items-center gap-2 bg-input rounded-lg px-4 py-3 border border-border mb-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar productos, marcas..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
          />
        </div>

        {query && (
          <p className="text-muted-foreground">
            <strong>{filteredProducts.length}</strong> resultado{filteredProducts.length !== 1 ? 's' : ''} para "{query}"
          </p>
        )}
      </div>

      {/* Results */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No encontramos productos</h2>
          <p className="text-muted-foreground mb-6">
            Intenta con otras palabras clave o explora nuestras categorías
          </p>
          <Link
            href="/gondolas"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90"
          >
            Ver todas las categorías
          </Link>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💡</div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Busca algo para empezar</h2>
          <p className="text-muted-foreground">Encontraremos los mejores productos para ti</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <CartProvider>
      <Header />
      <main className="bg-background min-h-screen">
        <Suspense fallback={<div className="h-screen" />}>
          <SearchContent />
        </Suspense>
      </main>
    </CartProvider>
  );
}
