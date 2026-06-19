import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Product } from '../../types';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const { format } = useCurrency();
  const { id, name, price, images, inStock } = product;

  return (
    <div className="glass-card group overflow-hidden">
      <Link to={`/products/${id}`} className="block">
        <div className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 right-3 transform transition-all duration-300 group-hover:scale-110">
            {inStock ? (
              <div className="flex items-center space-x-1 bg-gradient-to-r from-accent-500 to-accent-600 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-xs font-bold shadow-lg border border-accent-400/30">
                <CheckCircle className="h-4 w-4" />
                <span>{t('product.inStock')}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 bg-gradient-to-r from-error-500 to-error-600 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-xs font-bold shadow-lg border border-error-400/30">
                <XCircle className="h-4 w-4" />
                <span>{t('product.outOfStock')}</span>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </Link>
      <div className="p-6">
        <Link to={`/products/${id}`} className="block">
          <h3 className="font-bold text-lg mb-3 text-secondary-900 line-clamp-2 hover:text-primary-600 transition-colors duration-300 group-hover:translate-x-1">
            {name}
          </h3>
        </Link>
        <div className="mb-5 pb-5 border-b-2 border-gradient-to-r from-primary-200 to-accent-200">
          <p className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700">
            {format(price)}
          </p>
        </div>
        <Link
          to={`/products/${id}`}
          className="btn btn-primary w-full flex items-center justify-center space-x-2 text-sm group-hover:shadow-2xl"
        >
          <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          <span>{t('product.addToCart')}</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
