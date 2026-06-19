import React from 'react';
import { useCurrency, Currency } from '../../context/CurrencyContext';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const handleToggle = () => {
    setCurrency(currency === 'CHF' ? 'EUR' : 'CHF');
  };

  const getButtonClass = (cur: Currency) =>
    `px-2 py-1 text-xs font-bold rounded-md transition-all duration-200 ${
      currency === cur
        ? 'bg-white text-primary-700 shadow-sm'
        : 'text-white/70 hover:text-white'
    }`;

  return (
    <button
      onClick={handleToggle}
      className="group flex items-center bg-primary-700/30 rounded-lg p-0.5 hover:bg-primary-700/50 transition-all duration-200"
      title="Währung wechseln"
    >
      <span className={getButtonClass('CHF')}>CHF</span>
      <span className={getButtonClass('EUR')}>EUR</span>
    </button>
  );
};

export default CurrencySelector;
