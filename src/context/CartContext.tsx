import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, PromoCode } from '../types';
import { products } from '../data/products';
import { validatePromoCode } from '../data/promoCodes';

interface CartContextType {
  items: CartItem[];
  promoCode: PromoCode | null;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getProduct: (productId: string) => Product | undefined;
  applyPromoCode: (code: string) => boolean;
  getDiscountedTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: string, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === productId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getDiscountedTotal = () => {
    const subtotal = getCartTotal();
    if (promoCode) {
      return subtotal * (1 - promoCode.discount);
    }
    return subtotal;
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const applyPromoCode = (code: string): boolean => {
    const validPromoCode = validatePromoCode(code);
    if (validPromoCode) {
      setPromoCode(validPromoCode);
      return true;
    }
    return false;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        promoCode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getProduct,
        applyPromoCode,
        getDiscountedTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};