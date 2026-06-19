import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, Truck, Headphones, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import TrustBadges from '../components/ui/TrustBadges';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const featuredProducts = products.slice(0, 8);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden">
        <div
          className="w-full h-[600px]"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img
            src="/image.png"
            alt="ProWerk Tools Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80">
          <div className="container-custom h-full flex items-center">
            <div
              className="max-w-2xl"
              style={{
                transform: `translateY(${scrollY * -0.2}px)`,
                opacity: 1 - scrollY / 600,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-secondary-100">
                {t('home.hero.subtitle')}
              </p>
              <Link to="/products" className="btn btn-secondary text-primary-900 font-semibold">
                {t('home.hero.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100 relative">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(226, 232, 240, 0.8) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(203, 213, 225, 0.8) 0%, transparent 50%)',
            transform: `translateY(${(scrollY - 600) * 0.3}px)`
          }}
        />
        <div className="container-custom relative z-10">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
                {t('home.featured.title')}
              </h2>
              <div className="w-12 h-1 bg-primary-600 rounded-full" />
            </div>
            <Link
              to="/products"
              className="hidden md:flex text-primary-700 hover:text-primary-800 font-semibold transition-colors items-center space-x-1 px-4 py-2 rounded-lg hover:bg-white/50"
            >
              <span>{t('home.featured.viewAll')}</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="md:hidden flex justify-center mt-8">
            <Link
              to="/products"
              className="btn btn-primary flex items-center space-x-2"
            >
              <span>{t('home.featured.viewAll')}</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section with Glassmorphism */}
      <section className="py-20 bg-gradient-to-br from-gray-100 via-slate-100 to-slate-200 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(148, 163, 184, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(203, 213, 225, 0.6) 0%, transparent 50%)',
            transform: `translateY(${(scrollY - 1200) * -0.2}px)`
          }}
        />
        <div className="container-custom relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4 text-center">
            {t('home.benefits.title')}
          </h2>
          <p className="text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            Trusted by professionals and businesses worldwide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 glass-card rounded-xl hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 text-primary-700 mb-6 shadow-lg">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                {t('home.benefits.quality.title')}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {t('home.benefits.quality.description')}
              </p>
            </div>

            <div className="text-center p-8 glass-card rounded-xl hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 text-primary-700 mb-6 shadow-lg">
                <Truck className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                {t('home.benefits.delivery.title')}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {t('home.benefits.delivery.description')}
              </p>
            </div>

            <div className="text-center p-8 glass-card rounded-xl hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 text-primary-700 mb-6 shadow-lg">
                <Headphones className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                {t('home.benefits.support.title')}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {t('home.benefits.support.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(226, 232, 240, 0.8) 0%, transparent 70%)',
            transform: `scale(${1 + (scrollY - 1800) * 0.0001})`
          }}
        />
        <div className="container-custom relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-12 text-center">
            {t('home.trustBadges.title')}
          </h2>
          <TrustBadges variant="grid" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;