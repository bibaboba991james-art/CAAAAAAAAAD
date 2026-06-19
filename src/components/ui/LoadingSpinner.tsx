import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-800 mb-4"></div>
      <p className="text-primary-600">{t('general.loading')}</p>
    </div>
  );
};

export default LoadingSpinner;