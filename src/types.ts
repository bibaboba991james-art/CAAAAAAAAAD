export interface Product {
  id: string;
  name: string;
  model: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
  address: string;
  promoCode: string;
}

export interface PromoCode {
  code: string;
  discount: number;
}