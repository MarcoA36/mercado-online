import { Header } from '@/components/header';
import { CartProvider } from '@/lib/cart-context';
import { PRODUCTS } from '@/lib/products';
import { ProductDetailClient } from '@/components/product-detail-client';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <CartProvider>
      <Header />
      <main className="bg-background">
        <ProductDetailClient product={product} />
      </main>
    </CartProvider>
  );
}
