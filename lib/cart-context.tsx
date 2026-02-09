'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { CartItem } from './products';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; productId: string; quantity?: number; weight?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'UPDATE_WEIGHT'; productId: string; weight: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.productId === action.productId);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === action.productId
              ? {
                  ...item,
                  quantity: item.quantity + (action.quantity || 1),
                  weight: action.weight ? action.weight : item.weight,
                }
              : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            productId: action.productId,
            quantity: action.quantity || 1,
            weight: action.weight,
          },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.productId !== action.productId),
      };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: Math.max(0, action.quantity) }
            : item
        ),
      };
    case 'UPDATE_WEIGHT':
      return {
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, weight: action.weight }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
