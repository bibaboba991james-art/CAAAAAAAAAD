import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Menu, X, Wrench } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import CurrencySelector from '../ui/CurrencySelector';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b-2 border-primary-200'
          : 'bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 shadow-md'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`flex items-center space-x-3 font-bold text-xl transition-all duration-300 ${
              isScrolled ? 'text-secondary-900 hover:text-primary-600' : 'text-white hover:scale-105'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              isScrolled ? 'bg-primary-100' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Wrench className={`h-6 w-6 transition-colors duration-300 ${
                isScrolled ? 'text-primary-600' : 'text-white'
              }`} />
            </div>
            <span className="hidden sm:inline">{t('general.appName')}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 font-semibold transition-all duration-300 rounded-xl ${
                isScrolled
                  ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 font-semibold transition-all duration-300 rounded-xl ${
                isScrolled
                  ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {t('nav.products')}
            </Link>
            <Link
              to="/return-policy"
              className={`px-4 py-2 font-semibold transition-all duration-300 rounded-xl ${
                isScrolled
                  ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {t('nav.returnPolicy')}
            </Link>
            <Link
              to="/agb"
              className={`px-4 py-2 font-semibold transition-all duration-300 rounded-xl ${
                isScrolled
                  ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              AGB
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <CurrencySelector />
            <Link
              to="/cart"
              className={`relative p-2 transition-all duration-300 rounded-xl ${
                isScrolled
                  ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className={`md:hidden p-2 transition-all duration-300 rounded-xl ${
                isScrolled
                  ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden border-t py-4 slide-up ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-primary-200'
            : 'bg-primary-700/95 backdrop-blur-md border-white/20'
        }`}>
          <div className="container-custom">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-2 font-semibold transition-all duration-300 rounded-xl ${
                  isScrolled
                    ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/products"
                className={`px-4 py-2 font-semibold transition-all duration-300 rounded-xl ${
                  isScrolled
                    ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {t('nav.products')}
              </Link>
              <Link
                to="/return-policy"
                className={`px-4 py-2 font-semibold transition-all duration-300 rounded-xl ${
                  isScrolled
                    ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {t('nav.returnPolicy')}
              </Link>
              <Link
                to="/agb"
                className={`px-4 py-2 font-semibold transition-all duration-300 rounded-xl ${
                  isScrolled
                    ? 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                AGB
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;