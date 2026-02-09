'use client';

import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Minus, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block overflow-hidden bg-secondary">
        <div className="relative w-full aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <Link href={`/product/${product.id}`} className="block hover:text-primary">
          <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.round(product.rating)
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews.length})</span>
        </div>

        {/* Price */}
        <div className="bg-secondary rounded-md p-2">
          {product.type === 'weight' ? (
            <div className="space-y-2">
              <p className="text-lg font-bold text-foreground">
                ${(product.price * weight).toFixed(2)}/{weight}
                {product.unitType}
              </p>
              <div className="flex gap-1 flex-wrap">
                {weightOptions.map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`text-xs px-2 py-1 rounded ${
                      weight === w
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-foreground border border-border'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
          )}
        </div>

        {/* Add to Cart / Quantity Controls */}
        <div className="space-y-2">
          {product.type === 'unit' && !isInCart && (
            <div className="flex items-center gap-2 bg-background border border-border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex-1 p-2 hover:bg-secondary transition-colors"
              >
                <Minus className="w-4 h-4 mx-auto text-foreground" />
              </button>
              <span className="flex-1 text-center text-sm font-medium text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex-1 p-2 hover:bg-secondary transition-colors"
              >
                <Plus className="w-4 h-4 mx-auto text-foreground" />
              </button>
            </div>
          )}

          {isInCart ? (
            <div className="flex items-center gap-2 bg-accent text-accent-foreground rounded-md p-2">
              <button
                onClick={() =>
                  handleQuantityChange((cartItem?.quantity || 1) - 1)
                }
                className="flex-1 p-1 hover:bg-opacity-80 transition-colors"
              >
                <Minus className="w-4 h-4 mx-auto" />
              </button>
              <span className="flex-1 text-center font-medium">
                {cartItem?.quantity}
              </span>
              <button
                onClick={() =>
                  handleQuantityChange((cartItem?.quantity || 1) + 1)
                }
                className="flex-1 p-1 hover:bg-opacity-80 transition-colors"
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
