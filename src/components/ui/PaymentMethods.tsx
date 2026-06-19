import React, { useState } from 'react';
import { CreditCard, AlertCircle, X } from 'lucide-react';

interface PaymentMethodsProps {
  variant?: 'footer' | 'checkout';
  className?: string;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ variant = 'footer', className = '' }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handlePaymentClick = (method: string) => {
    if (method === 'visa') {
      setModalMessage('Diese Zahlungsmethode ist derzeit nicht verfügbar. Bitte verwenden Sie eine andere Methode. Derzeit ist nur Vorkasse verfügbar.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const isFooter = variant === 'footer';
  const iconSize = isFooter ? 'h-8 w-8' : 'h-10 w-10';
  const containerClass = isFooter 
    ? 'flex items-center space-x-6' 
    : 'grid grid-cols-2 gap-4';

  return (
    <>
      <div className={`${containerClass} ${className}`}>
        {/* VISA - Неактивная */}
        <div 
          className={`flex items-center ${isFooter ? 'text-secondary-300' : 'bg-secondary-100 p-4 rounded-lg border-2 border-secondary-200'} cursor-pointer hover:opacity-75 transition-opacity`}
          onClick={() => handlePaymentClick('visa')}
          title="Derzeit nicht verfügbar"
        >
          <div className={`${iconSize} ${isFooter ? 'mr-2' : 'mr-3'} bg-blue-600 text-white rounded flex items-center justify-center font-bold text-sm`}>
            VISA
          </div>
          {!isFooter && (
            <div>
              <span className="font-medium text-secondary-500">VISA</span>
              <div className="flex items-center mt-1">
                <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-xs text-orange-600">Nicht verfügbar</span>
              </div>
            </div>
          )}
          {isFooter && <span>VISA</span>}
        </div>

        {/* Vorkasse - Активная */}
        <div className={`flex items-center ${isFooter ? 'text-secondary-300' : 'bg-success-50 p-4 rounded-lg border-2 border-success-200'}`}>
          <CreditCard className={`${iconSize} ${isFooter ? 'mr-2' : 'mr-3'} ${isFooter ? '' : 'text-success-600'}`} />
          {!isFooter && (
            <div>
              <span className="font-medium text-success-700">Vorkasse</span>
              <div className="flex items-center mt-1">
                <div className="h-2 w-2 bg-success-500 rounded-full mr-1"></div>
                <span className="text-xs text-success-600">Verfügbar</span>
              </div>
            </div>
          )}
          {isFooter && <span>Vorkasse</span>}
        </div>
      </div>

      {/* Modal для сообщений об ошибках */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-orange-500 mr-3" />
                <h3 className="text-lg font-semibold text-primary-800">
                  Zahlungsmethode nicht verfügbar
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-secondary-400 hover:text-secondary-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-primary-600 mb-6">
              {modalMessage}
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="btn btn-primary"
              >
                Verstanden
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethods;