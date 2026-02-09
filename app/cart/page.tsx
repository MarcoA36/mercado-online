'use client';

import { Header } from '@/components/header';
import { CartProvider, useCart } from '@/lib/cart-context';
import { PRODUCTS } from '@/lib/products';
import { Trash2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function CartContent() {
  const { state, dispatch } = useCart();

  const cartItemsWithProducts = state.items
    .map((item) => ({
      ...item,
      product: PRODUCTS.find((p) => p.id === item.productId),
    }))
    .filter((item) => item.product);

  const subtotal = cartItemsWithProducts.reduce((sum, item) => {
    if (item.product?.type === 'weight' && item.weight) {
      return sum + item.product.price * item.weight * item.quantity;
    }
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cartItemsWithProducts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8">Comienza a comprar y agrega productos a tu carrito</p>
        <Link
          href="/gondolas"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90"
        >
          <ArrowLeft className="w-5 h-5" />
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItemsWithProducts.map((item) => {
            const product = item.product!;
            const itemTotal =
              product.type === 'weight' && item.weight
                ? product.price * item.weight * item.quantity
                : product.price * item.quantity;

            return (
              <div
                key={item.productId}
                className="bg-card border border-border rounded-lg p-4 flex gap-4"
              >
                {/* Product Image */}
                <Link href={`/product/${product.id}`} className="flex-shrink-0">
                  <div className="relative w-24 h-24 bg-secondary rounded-lg overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>

                  {/* Quantity and Weight Info */}
                  <div className="mt-2 text-sm text-foreground">
                    {product.type === 'weight' && item.weight ? (
                      <p>
                        {item.weight}
                        {product.unitType} × {item.quantity} = ${itemTotal.toFixed(2)}
                      </p>
                    ) : (
                      <p>Cantidad: {item.quantity}</p>
                    )}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex flex-col items-end justify-between">
                  <p className="text-lg font-bold text-primary">${itemTotal.toFixed(2)}</p>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: item.productId })}
                    className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Resumen del Pedido</h2>

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Impuestos (10%)</span>
                <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-foreground font-medium text-green-600">Gratis</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Proceder al pago
            </button>

            <Link
              href="/gondolas"
              className="w-full bg-secondary text-foreground py-3 rounded-lg font-medium text-center hover:bg-muted transition-colors"
            >
              Continuar comprando
            </Link>

            {/* Delivery Info */}
            <div className="bg-secondary rounded-lg p-4 text-sm">
              <p className="font-medium text-foreground mb-2">📦 Entrega Estimada</p>
              <p className="text-muted-foreground">Mañana en 2 horas</p>
              <p className="text-muted-foreground text-xs mt-1">Horario de entrega: 8:00 - 22:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <Header />
      <main className="bg-background min-h-screen">
        <CartContent />
      </main>
    </CartProvider>
  );
}
