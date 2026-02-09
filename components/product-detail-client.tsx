'use client';

import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { state, dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(0.5);

  const cartItem = state.items.find((item) => item.productId === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    if (product.type === 'weight') {
      dispatch({
        type: 'ADD_ITEM',
        productId: product.id,
        quantity: 1,
        weight,
      });
    } else {
      dispatch({
        type: 'ADD_ITEM',
        productId: product.id,
        quantity,
      });
    }
  };

  const handleRemoveFromCart = () => {
    dispatch({
      type: 'REMOVE_ITEM',
      productId: product.id,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart();
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        productId: product.id,
        quantity: newQuantity,
      });
    }
  };

  const weightOptions = product.type === 'weight' ? [0.25, 0.5, 0.75, 1, 1.5, 2] : [];
  const estimatedPrice = product.type === 'weight'
    ? (product.price * weight).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-secondary rounded-lg overflow-hidden h-96 md:h-full">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-primary font-bold text-sm mb-2">{product.category}</p>
            <p className="text-muted-foreground text-sm mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
            <p className="text-foreground text-base leading-relaxed">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} de 5 ({product.reviews.length} comentarios)
            </span>
          </div>

          {/* Price Section */}
          <div className="bg-secondary rounded-lg p-6 border border-border">
            {product.type === 'weight' ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Selecciona el peso</p>
                  <div className="flex gap-2 flex-wrap">
                    {weightOptions.map((w) => (
                      <button
                        key={w}
                        onClick={() => setWeight(w)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          weight === w
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background text-foreground border border-border hover:border-primary'
                        }`}
                      >
                        {w}
                        {product.unitType}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-muted-foreground text-sm mb-2">Precio estimado</p>
                  <p className="text-4xl font-bold text-primary">${estimatedPrice}</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Precio por unidad</p>
                <p className="text-4xl font-bold text-primary">${estimatedPrice}</p>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-3">
            {product.type === 'unit' && !isInCart && (
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-foreground">Cantidad:</p>
                <div className="flex items-center gap-2 bg-secondary border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-5 h-5 text-foreground" />
                  </button>
                  <span className="flex-1 text-center font-medium text-foreground min-w-12">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </div>
            )}

            {isInCart ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-accent text-accent-foreground rounded-lg p-4">
                  <button
                    onClick={() =>
                      handleQuantityChange((cartItem?.quantity || 1) - 1)
                    }
                    className="p-2 hover:bg-opacity-80"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="flex-1 text-center font-medium">
                    {cartItem?.quantity} en carrito
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange((cartItem?.quantity || 1) + 1)
                    }
                    className="p-2 hover:bg-opacity-80"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleRemoveFromCart}
                  className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg font-bold hover:opacity-90"
                >
                  Eliminar del carrito
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90"
              >
                <ShoppingCart className="w-6 h-6" />
                Agregar al carrito
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="border-t border-border pt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Comentarios de Clientes</h2>

        {product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No hay comentarios aún. ¡Sé el primero!</p>
        )}
      </div>
    </div>
  );
}
