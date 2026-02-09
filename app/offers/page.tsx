'use client';

import { Header } from '@/components/header';
import { CartProvider } from '@/lib/cart-context';
import { ProductCard } from '@/components/product-card';
import { PRODUCTS } from '@/lib/products';

export default function OffersPage() {
  // Products with special discount badges
  const specialOffers = [
    { ...PRODUCTS[0], discount: 20 },
    { ...PRODUCTS[1], discount: 15 },
    { ...PRODUCTS[2], discount: 25 },
    { ...PRODUCTS[3], discount: 10 },
    { ...PRODUCTS[4], discount: 30 },
    { ...PRODUCTS[5], discount: 18 },
    { ...PRODUCTS[6], discount: 12 },
    { ...PRODUCTS[7], discount: 22 },
  ];

  const combos = [
    {
      id: 1,
      title: '🍳 Pack Desayuno Completo',
      description: 'Pan + Leche + Frutas + Café',
      items: ['Pan Integral', 'Leche Descremada', 'Manzanas', 'Café'],
      originalPrice: 18.99,
      salePrice: 12.99,
      savings: 6.0,
    },
    {
      id: 2,
      title: '🧹 Pack Limpieza del Hogar',
      description: 'Detergente + Limpiador + Desinfectante',
      items: ['Detergente', 'Limpiador Multiusos', 'Desinfectante', 'Guantes'],
      originalPrice: 24.99,
      salePrice: 16.99,
      savings: 8.0,
    },
    {
      id: 3,
      title: '🍝 Pack Cena Rápida',
      description: 'Pollo + Verduras + Pizza',
      items: ['Pechuga de Pollo', 'Tomates', 'Cebolla', 'Pizza Congelada'],
      originalPrice: 28.99,
      salePrice: 19.99,
      savings: 9.0,
    },
    {
      id: 4,
      title: '🥗 Pack Verduras Frescas',
      description: 'Selección de verduras de temporada',
      items: ['Manzanas', 'Tomates', 'Lechuga', 'Zanahorias'],
      originalPrice: 15.99,
      salePrice: 10.99,
      savings: 5.0,
    },
    {
      id: 5,
      title: '🥩 Pack BBQ',
      description: 'Carnes seleccionadas para parrilla',
      items: ['Pechuga de Pollo', 'Carne Molida', 'Chorizo', 'Verduras'],
      originalPrice: 32.99,
      salePrice: 22.99,
      savings: 10.0,
    },
    {
      id: 6,
      title: '🐕 Pack Mascotas',
      description: 'Alimentos y accesorios para tus mascotas',
      items: ['Alimento para Perros', 'Alimento para Gatos', 'Juguetes', 'Correa'],
      originalPrice: 29.99,
      salePrice: 19.99,
      savings: 10.0,
    },
  ];

  return (
    <CartProvider>
      <Header />
      <main className="bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Ofertas Especiales</h1>
            <p className="text-muted-foreground text-lg">
              Descubre las mejores ofertas y combos especiales de esta semana
            </p>
          </div>

          {/* Individual Discounted Products */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Productos en Descuento</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {specialOffers.slice(0, 8).map((product, index) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold text-sm">
                    -{specialOffers[index].discount}%
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Combo Deals */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Combos Especiales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {combos.map((combo) => (
                <div key={combo.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
                    <h3 className="text-xl font-bold mb-1">{combo.title}</h3>
                    <p className="text-sm opacity-90">{combo.description}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Items List */}
                    <div className="bg-secondary rounded-lg p-4">
                      <p className="text-sm font-semibold text-foreground mb-2">Incluye:</p>
                      <ul className="space-y-1">
                        {combo.items.map((item) => (
                          <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="text-primary">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing */}
                    <div className="border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground mb-1">Precio original</p>
                      <p className="text-sm line-through text-muted-foreground mb-2">
                        ${combo.originalPrice.toFixed(2)}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">
                          ${combo.salePrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          Ahorras ${combo.savings.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                      Agregar combo al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Banner */}
          <section className="mt-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-8 border border-primary/30 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">¿Busca aún más ofertas?</h2>
            <p className="text-muted-foreground mb-6">
              Suscríbete a nuestras notificaciones para recibir las mejores ofertas directamente en tu dispositivo
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90">
              Habilitar notificaciones
            </button>
          </section>
        </div>
      </main>
    </CartProvider>
  );
}
