import { Header } from '@/components/header';
import { CartProvider } from '@/lib/cart-context';
import { GondolasClient } from '@/components/gondolas-client';
import { Suspense } from 'react';

export default function GondolasPage() {
  return (
    <CartProvider>
      <Header />
      <main className="bg-background">
        <Suspense fallback={<div className="h-screen" />}>
          <GondolasClient />
        </Suspense>
      </main>
    </CartProvider>
  );
}
