export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  description: string;
  type: 'unit' | 'weight';
  unitType?: 'pcs' | 'kg' | 'g' | 'l';
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  weight?: number;
}

export const CATEGORIES = [
  'Almacén',
  'Bebidas',
  'Verdulería',
  'Carnicería',
  'Limpieza',
  'Congelados',
  'Mascotas',
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pan Integral',
    brand: 'Bimbo',
    image: 'https://images.unsplash.com/photo-1586985289688-cacf913bb194?w=400&h=400&fit=crop',
    price: 2.50,
    category: 'Almacén',
    description: 'Pan integral fresco, hecho con granos naturales',
    type: 'unit',
    unitType: 'pcs',
    rating: 4.5,
    reviews: [
      { id: '1', author: 'Juan', rating: 5, text: 'Muy fresco y sabroso', date: '2024-01-15' },
      { id: '2', author: 'María', rating: 4, text: 'Buena calidad', date: '2024-01-10' },
    ],
  },
  {
    id: '2',
    name: 'Leche Descremada',
    brand: 'Ilolay',
    image: 'https://images.unsplash.com/photo-1563056169-642fe16d90a0?w=400&h=400&fit=crop',
    price: 1.80,
    category: 'Almacén',
    description: 'Leche descremada, pasteurizada, 1 litro',
    type: 'unit',
    unitType: 'l',
    rating: 4.8,
    reviews: [
      { id: '1', author: 'Carlos', rating: 5, text: 'Excelente calidad', date: '2024-01-12' },
    ],
  },
  {
    id: '3',
    name: 'Manzanas',
    brand: 'Orgánico',
    image: 'https://images.unsplash.com/photo-1560806e75-1cac8b9f5eef?w=400&h=400&fit=crop',
    price: 3.50,
    category: 'Verdulería',
    description: 'Manzanas frescas y crujientes',
    type: 'weight',
    unitType: 'kg',
    rating: 4.6,
    reviews: [
      { id: '1', author: 'Ana', rating: 5, text: 'Muy frescas', date: '2024-01-14' },
      { id: '2', author: 'Luis', rating: 4, text: 'Buena calidad', date: '2024-01-08' },
    ],
  },
  {
    id: '4',
    name: 'Tomates',
    brand: 'Local',
    image: 'https://images.unsplash.com/photo-1592924357228-91ec8b3be3a7?w=400&h=400&fit=crop',
    price: 2.99,
    category: 'Verdulería',
    description: 'Tomates rojos maduros',
    type: 'weight',
    unitType: 'kg',
    rating: 4.4,
    reviews: [
      { id: '1', author: 'Sofia', rating: 4, text: 'Buen sabor', date: '2024-01-13' },
    ],
  },
  {
    id: '5',
    name: 'Pechuga de Pollo',
    brand: 'Premium',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop',
    price: 7.99,
    category: 'Carnicería',
    description: 'Pechuga de pollo fresca, sin hueso',
    type: 'weight',
    unitType: 'kg',
    rating: 4.7,
    reviews: [
      { id: '1', author: 'Roberto', rating: 5, text: 'Muy fresco', date: '2024-01-11' },
    ],
  },
  {
    id: '6',
    name: 'Carne Molida',
    brand: 'Carnicería',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop',
    price: 8.50,
    category: 'Carnicería',
    description: 'Carne molida magra, lista para cocinar',
    type: 'weight',
    unitType: 'kg',
    rating: 4.5,
    reviews: [
      { id: '1', author: 'Pedro', rating: 5, text: 'Excelente', date: '2024-01-09' },
    ],
  },
  {
    id: '7',
    name: 'Detergente Líquido',
    brand: 'Ariel',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop',
    price: 4.99,
    category: 'Limpieza',
    description: 'Detergente líquido concentrado, 2L',
    type: 'unit',
    unitType: 'l',
    rating: 4.3,
    reviews: [
      { id: '1', author: 'Rosa', rating: 4, text: 'Buena limpieza', date: '2024-01-07' },
    ],
  },
  {
    id: '8',
    name: 'Pizza Congelada',
    brand: 'La Criolla',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=400&h=400&fit=crop',
    price: 5.99,
    category: 'Congelados',
    description: 'Pizza de queso congelada, lista para hornear',
    type: 'unit',
    unitType: 'pcs',
    rating: 4.2,
    reviews: [
      { id: '1', author: 'Diego', rating: 4, text: 'Rica y práctica', date: '2024-01-06' },
    ],
  },
  {
    id: '9',
    name: 'Alimento para Perros',
    brand: 'Purina',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop',
    price: 12.99,
    category: 'Mascotas',
    description: 'Alimento seco para perros, sabor pollo, 10kg',
    type: 'unit',
    unitType: 'kg',
    rating: 4.6,
    reviews: [
      { id: '1', author: 'Martín', rating: 5, text: 'Mi perro lo adora', date: '2024-01-05' },
    ],
  },
  {
    id: '10',
    name: 'Agua Mineral',
    brand: 'Serena',
    image: 'https://images.unsplash.com/photo-1610286099012-a5aabb2d1d94?w=400&h=400&fit=crop',
    price: 1.50,
    category: 'Bebidas',
    description: 'Agua mineral sin gas, 1.5L',
    type: 'unit',
    unitType: 'l',
    rating: 4.7,
    reviews: [
      { id: '1', author: 'Elena', rating: 5, text: 'Excelente calidad', date: '2024-01-04' },
    ],
  },
];
