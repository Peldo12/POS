export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: number;
  paymentMethod: 'cash' | 'card';
}

export type Category = 'All' | 'Beverages' | 'Food' | 'Snacks' | 'Merchandise';
