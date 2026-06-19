import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container-custom py-16">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-9xl font-bold text-primary-300 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">{t('general.notFound')}</h2>
        <p className="text-primary-600 mb-8">
          Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          to="/"
          className="btn btn-primary inline-flex items-center space-x-2"
        >
          <Home className="h-5 w-5" />
          <span>{t('general.goHome')}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;