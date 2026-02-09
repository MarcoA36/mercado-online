'use client';

import { useCart } from '@/lib/cart-context';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const { state } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = state.items.length;

  return (
    <>
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                F
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:inline">FreshMart</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary text-sm font-medium">
                Home
              </Link>
              <Link href="/gondolas" className="text-foreground hover:text-primary text-sm font-medium">
                Góndolas
              </Link>
              <Link href="/offers" className="text-foreground hover:text-primary text-sm font-medium">
                Ofertas
              </Link>
            </nav>

            {/* Cart Icon */}
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-foreground hover:text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <form
            action="/search"
            method="GET"
            className="flex items-center gap-2 bg-input rounded-lg px-4 py-2"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              name="q"
              placeholder="Buscar productos, marcas..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground text-sm"
            />
          </form>

          {/* Delivery Info */}
          <div className="mt-2 text-xs text-muted-foreground">
            Entrega estimada: Mañana en 2 horas
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="flex flex-col gap-2 p-4">
              <Link href="/" className="text-foreground hover:text-primary py-2 font-medium">
                Home
              </Link>
              <Link href="/gondolas" className="text-foreground hover:text-primary py-2 font-medium">
                Góndolas
              </Link>
              <Link href="/offers" className="text-foreground hover:text-primary py-2 font-medium">
                Ofertas
              </Link>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
