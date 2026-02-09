'use client';

import { Header } from '@/components/header';
import { CartProvider } from '@/lib/cart-context';
import Link from 'next/link';

export default function ComoTrabajamosPage() {
  const steps = [
    {
      title: 'Recepción del pedido',
      description: 'Recibimos y validamos tu pedido para asegurar que todo esté correcto.',
    },
    {
      title: 'Preparación',
      description: 'Los productos se embalan en cajas o conservadoras termicas según corresponda, garantizando su correcta conservación.',
    },
    {
      title: 'Transporte',
      description: 'El pedido se traslada en un vehículo adecuado, manteniendo el cuidado durante todo el recorrido.',
    },
    {
      title: 'Entrega',
      description: 'Entregamos tu pedido completo, ordenado y protegido, directamente en la puerta de tu domicilio.',
    },
  ];

  return (
    <CartProvider>
      <Header />
      <main className="bg-background">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Cómo Trabajamos</h1>
            <p className="text-lg text-muted-foreground">
              Conoce nuestro proceso simple, claro y transparente de entrega
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <h2 className="text-xl font-bold text-foreground mb-2">{step.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Message */}
          <div className="bg-secondary rounded-lg p-8 text-center mb-8">
            <p className="text-lg text-foreground font-medium mb-2">
              Cuidamos tus productos como si fueran nuestros
            </p>
            <p className="text-muted-foreground">
              Cada paso está pensado para garantizar que recibas lo mejor
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
            >
              Volver a la Tienda
            </Link>
          </div>
        </div>
      </main>
    </CartProvider>
  );
}
