import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Wrench, Truck } from 'lucide-react';
import PaymentMethods from '../ui/PaymentMethods';
import TrustBadges from '../ui/TrustBadges';
import CompanyInfo from '../ui/CompanyInfo';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/95 border-t border-white/10 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Wrench className="h-6 w-6 text-primary-800" />
              </div>
              <span className="font-bold text-xl text-white">{t('general.appName')}</span>
            </div>
            <p className="text-secondary-400 mb-6 leading-relaxed">
              {t('general.tagline')}
            </p>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary-400" />
              <a
                href="mailto:info@prowerkgm.ch"
                className="text-secondary-300 hover:text-primary-400 transition-colors font-medium"
              >
                {t('footer.email')}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">{t('nav.products')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products?category=drills"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('products.categories.drills')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=saws"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('products.categories.saws')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=sanders"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('products.categories.sanders')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=lasers"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('products.categories.lasers')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=outdoor"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('products.categories.outdoor')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=RobotVacuums"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('products.categories.robotVacuums')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white">{t('footer.links')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/return-policy"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('footer.returnPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('nav.cart')}
                </Link>
              </li>
              <li>
                <Link
                  to="/agb"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-400 hover:text-primary-400 transition-colors font-medium"
                >
                  {t('footer.privacy')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 pt-8">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full">
              <CompanyInfo />
            </div>

            <div className="w-full mb-4">
              <TrustBadges variant="horizontal" className="justify-center" />
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-center space-x-3 text-secondary-300">
                <Truck className="h-6 w-6 text-primary-400" />
                <span className="font-medium">{t('footer.freeShipping')}</span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-secondary-300 mb-4 text-center">
                  {t('footer.paymentMethods')}
                </h4>
                <PaymentMethods variant="footer" />
              </div>
            </div>

            <p className="text-center text-secondary-500 text-sm pt-4">
              {t('footer.copyright').replace('2025', currentYear.toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;