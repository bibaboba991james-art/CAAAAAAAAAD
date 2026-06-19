import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { CartProvider } from '../../context/CartContext';
import { CurrencyProvider } from '../../context/CurrencyContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CurrencyProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </CurrencyProvider>
  );
};

export default Layout;