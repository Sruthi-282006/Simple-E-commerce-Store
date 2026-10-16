export interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  details: string[];
  dimensions: string;
  materials: string;
  origin: string;
  inStock: boolean;
  stockCount: number;
  image: string;
  variants?: {
    name: string;
    options: string[];
  }[];
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderReceipt {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  discountCode?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  deliveryEstimate: string;
}
