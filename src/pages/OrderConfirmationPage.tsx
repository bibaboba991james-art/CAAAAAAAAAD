import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ShoppingBag } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  const { t } = useTranslation();
  const orderNumber = '149274158';
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto bg-white/75 backdrop-blur-sm rounded-lg shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-100 text-success-600 mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{t('orderConfirmation.title')}</h1>
        <p className="text-primary-600 text-lg mb-6">{t('orderConfirmation.thanks')}</p>
        
        <div className="bg-secondary-50 rounded-md p-6 mb-8">
          <p className="text-primary-600 mb-4">{t('orderConfirmation.emailSent')}</p>
          <div className="flex items-center justify-center space-x-2 text-lg">
            <span className="text-primary-600">{t('orderConfirmation.orderNumber')}:</span>
            <span className="font-semibold">{orderNumber}</span>
          </div>
        </div>
        
        <Link to="/" className="btn btn-primary inline-flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5" />
          <span>{t('orderConfirmation.continueShopping')}</span>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;