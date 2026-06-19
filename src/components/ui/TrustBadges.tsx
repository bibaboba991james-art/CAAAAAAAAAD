import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Truck, Award, Lock, RefreshCw, Headphones } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid';
  className?: string;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ variant = 'horizontal', className = '' }) => {
  const { t } = useTranslation();
  
  const badges = [
    {
      icon: Shield,
      title: t('trustBadges.warranty.title'),
      description: t('trustBadges.warranty.description'),
      color: 'text-success-600'
    },
    {
      icon: Award,
      title: t('trustBadges.original.title'),
      description: t('trustBadges.original.description'),
      color: 'text-primary-600'
    },
    {
      icon: Truck,
      title: t('trustBadges.shipping.title'),
      description: t('trustBadges.shipping.description'),
      color: 'text-blue-600'
    },
    {
      icon: Lock,
      title: t('trustBadges.payment.title'),
      description: t('trustBadges.payment.description'),
      color: 'text-purple-600'
    },
    {
      icon: RefreshCw,
      title: t('trustBadges.returns.title'),
      description: t('trustBadges.returns.description'),
      color: 'text-orange-600'
    },
    {
      icon: Headphones,
      title: t('trustBadges.support.title'),
      description: t('trustBadges.support.description'),
      color: 'text-indigo-600'
    }
  ];

  const containerClass = variant === 'grid' 
    ? 'grid grid-cols-2 md:grid-cols-3 gap-4'
    : 'flex flex-wrap justify-center gap-4 md:gap-6';

  return (
    <div className={`${containerClass} ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className={`flex items-center ${variant === 'grid' ? 'flex-col text-center p-4' : 'flex-row'} bg-white/75 backdrop-blur-sm rounded-lg shadow-sm border border-secondary-100 hover:shadow-md transition-shadow duration-300 ${variant === 'grid' ? 'min-h-[120px]' : 'px-4 py-3'}`}
          >
            <div className={`${variant === 'grid' ? 'mb-3' : 'mr-3'} flex-shrink-0`}>
              <div className={`w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center ${badge.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className={variant === 'grid' ? 'text-center' : 'text-left'}>
              <h4 className="font-semibold text-primary-800 text-sm mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-primary-600">
                {badge.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;