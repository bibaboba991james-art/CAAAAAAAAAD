import React, { createContext, useContext, useState } from 'react';

export type Currency = 'CHF' | 'EUR';

const EUR_RATE = 1.07;

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (chfPrice: number) => string;
  convert: (chfPrice: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('currency') as Currency) || 'CHF';
  });

  const handleSetCurrency = (c: Currency) => {
    localStorage.setItem('currency', c);
    setCurrency(c);
  };

  const convert = (chfPrice: number) =>
    currency === 'EUR' ? chfPrice * EUR_RATE : chfPrice;

  const format = (chfPrice: number) => {
    const amount = convert(chfPrice);
    return currency === 'EUR'
      ? `€${amount.toFixed(2)}`
      : `CHF ${amount.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency: handleSetCurrency, format, convert, symbol: currency === 'EUR' ? '€' : 'CHF' }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
