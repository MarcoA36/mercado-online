'use client';

import { Header } from '@/components/header';
import { CartProvider } from '@/lib/cart-context';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const featuredProducts = PRODUCTS.slice(0, 6);
  const specialOffers = [
    { id: 1, title: '2x1 en Bebidas', discount: 'Compra 2 y paga 1', image: 'https://images.unsplash.com/photo-1610286099012-a5aabb2d1d94?w=800&h=300&fit=crop' },
    { id: 2, title: 'Descuento 30% en Verduras', discount: 'Verdulería fresca', image: 'https://images.unsplash.com/photo-1466637574161-c3aad5f15243?w=800&h=300&fit=crop' },
  ];

  return (
    <CartProvider>
      <Header />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {specialOffers.map((offer) => (
              <div
                key={offer.id}
                className="relative rounded-lg overflow-hidden shadow-sm h-40 md:h-48"
              >
                <Image
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                  <h2 className="text-white font-bold text-xl">{offer.title}</h2>
                  <p className="text-white/90 text-sm">{offer.discount}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Offers */}
        <section className="max-w-7xl mx-auto px-4 py-8 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Ofertas Destacadas</h2>
              <p className="text-sm text-muted-foreground">Los mejores descuentos de la semana</p>
            </div>
            <Link href="/offers" className="text-primary hover:text-primary font-medium text-sm">
              Ver todas →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Featured Combo Deals */}
        <section className="max-w-7xl mx-auto px-4 py-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Combos Especiales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { 
                title: 'Desayuno Completo', 
                items: ['Pan Integral', 'Leche', 'Frutas'], 
                price: 12.99,
                image: 'https://images.unsplash.com/photo-1533189751851-6a9bc676d437?w=500&h=500&fit=crop'
              },
              { 
                title: 'Limpieza del Hogar', 
                items: ['Detergente', 'Limpiador', 'Desinfectante'], 
                price: 18.99,
                image: 'https://images.unsplash.com/photo-1584622180947-1cad63234f3b?w=500&h=500&fit=crop'
              },
              { 
                title: 'Cena Rápida', 
                items: ['Pollo', 'Tomates', 'Pizza'], 
                price: 22.99,
                image: 'https://images.unsplash.com/photo-1604521223040-5ab73b3f07d1?w=500&h=500&fit=crop'
              },
            ].map((combo, i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
                {/* Combo Image */}
                <div className="relative w-full aspect-video overflow-hidden bg-secondary">
                  <Image
                    src={combo.image || "/placeholder.svg"}
                    alt={combo.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Combo Info */}
                <div className="p-6">
                  <h3 className="font-bold text-foreground text-lg mb-3">{combo.title}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                    {combo.items.map((item) => (
                      <li key={item}>✓ {item}</li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${combo.price}</span>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gondolas Preview */}
        <section className="max-w-7xl mx-auto px-4 py-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Nuestras Góndolas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Almacén', 'Bebidas', 'Verdulería', 'Carnicería', 'Limpieza', 'Congelados', 'Mascotas'].map((category) => (
              <Link
                key={category}
                href={`/gondolas?category=${encodeURIComponent(category)}`}
                className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">🛒</div>
                <p className="font-medium text-foreground text-sm">{category}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* How We Work Section */}
        <section className="max-w-7xl mx-auto px-4 py-8 border-t border-border mb-8">
          <div className="bg-secondary rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Cómo Trabajamos</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Conoce nuestro proceso de entrega transparente y confiable. Desde que recibes tu
              pedido hasta que llega a tu puerta.
            </p>
            <Link
              href="/como-trabajamos"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
            >
              Ver Nuestro Proceso →
            </Link>
          </div>
        </section>
      </main>
    </CartProvider>
  );
}
