'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">FreshMart</h3>
            <p className="text-sm text-muted-foreground">
              Cuidamos tus productos como si fueran nuestros
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-3">
            <Link
              href="/como-trabajamos"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Cómo trabajamos
            </Link>
            <Link
              href="#contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contacto
            </Link>
            <Link
              href="#terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Términos y condiciones
            </Link>
          </div>

          {/* Trust Message */}
          <div className="text-right">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Entrega segura y confiable en tu puerta
            </p>
          </div>
        </div>

        {/* Bottom Divider and Copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-center">
            © 2026 FreshMart. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
