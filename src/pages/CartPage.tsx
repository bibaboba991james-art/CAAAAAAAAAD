import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const CartPage: React.FC = () => {
  const { t } = useTranslation();
  const { items, getProduct, updateQuantity, removeFromCart, getCartTotal, promoCode, applyPromoCode, getDiscountedTotal } = useCart();
  const { format } = useCurrency();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const totalAmount = getDiscountedTotal();

  const handleApplyPromoCode = () => {
    if (promoCodeInput.trim()) {
      const success = applyPromoCode(promoCodeInput.trim());
      if (success) {
        setPromoError('');
        setPromoSuccess('Gutscheincode erfolgreich angewendet!');
        setPromoCodeInput('');
      } else {
        setPromoError('Ungültiger Gutscheincode');
        setPromoSuccess('');
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-primary-300 mb-4" />
          <h1 className="text-2xl font-bold mb-4">{t('cart.empty')}</h1>
          <p className="text-primary-600 mb-8">{t('cart.continueShopping')}</p>
          <Link to="/products" className="btn btn-primary">
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">{t('cart.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {items.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              const itemTotal = product.price * item.quantity;

              return (
                <div key={item.productId} className="border-b border-secondary-200 last:border-b-0 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-24 h-24 flex-shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <Link to={`/products/${product.id}`} className="text-lg font-semibold text-primary-800 hover:text-primary-600 transition-colors">
                          {product.name}
                        </Link>
                        <p className="font-bold text-lg text-right">{format(itemTotal)}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex items-center mb-3 sm:mb-0">
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center border border-secondary-300 rounded-l-md bg-secondary-100 hover:bg-secondary-200">
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)} className="h-8 w-12 border-y border-secondary-300 text-center focus:outline-none" />
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center border border-secondary-300 rounded-r-md bg-secondary-100 hover:bg-secondary-200">
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.productId)} className="text-error-600 hover:text-error-800 transition-colors flex items-center">
                          <Trash2 className="h-4 w-4 mr-1" />
                          {t('cart.remove')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Link to="/products" className="text-primary-600 hover:text-primary-800 transition-colors flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">{t('cart.orderSummary')}</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-primary-600">{t('cart.subtotal')}</span>
                <span className="font-medium">{format(getCartTotal())}</span>
              </div>

              {promoCode && (
                <div className="flex justify-between text-success-600">
                  <span>Rabatt ({(promoCode.discount * 100)}%)</span>
                  <span>-{format(getCartTotal() * promoCode.discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-primary-600">{t('cart.shipping')}</span>
                <span className="text-success-600 font-medium">{t('cart.free')}</span>
              </div>

              <div className="border-t border-secondary-200 pt-4 flex justify-between">
                <span className="font-semibold">{t('cart.total')}</span>
                <span className="font-bold text-xl">{format(totalAmount)}</span>
              </div>
            </div>

            {!promoCode && (
              <div className="mb-6">
                <div className="flex space-x-2">
                  <input type="text" value={promoCodeInput} onChange={(e) => { setPromoCodeInput(e.target.value); setPromoError(''); setPromoSuccess(''); }} placeholder={t('checkout.fields.promoCode')} className="input-field flex-1" />
                  <button onClick={handleApplyPromoCode} className="btn btn-secondary">Anwenden</button>
                </div>
                {promoError && <p className="text-error-600 text-sm mt-2">{promoError}</p>}
                {promoSuccess && <p className="text-success-600 text-sm mt-2">{promoSuccess}</p>}
              </div>
            )}

            {promoCode && (
              <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-success-700 font-medium">Gutscheincode: {promoCode.code}</span>
                  <span className="text-success-600">-{(promoCode.discount * 100)}%</span>
                </div>
              </div>
            )}

            <Link to="/checkout" className="btn btn-primary w-full">{t('cart.proceedToCheckout')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
