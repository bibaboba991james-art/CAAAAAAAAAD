import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Plus, Minus, ShieldCheck, Truck, Award, ChevronLeft } from 'lucide-react';
import ProductGallery from '../components/ui/ProductGallery';
import ProductCard from '../components/ui/ProductCard';
import TrustBadges from '../components/ui/TrustBadges';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const { format } = useCurrency();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const currentProduct = products.find((p) => p.id === productId);
    if (!currentProduct) {
      navigate('/not-found');
      return;
    }
    
    setProduct(currentProduct);
    
    // Find related products (same category)
    const related = products
      .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
      .slice(0, 4);
    setRelatedProducts(related);
  }, [productId, navigate]);

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      navigate('/cart');
    }
  };

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-lg">{t('general.loading')}</p>
      </div>
    );
  }

  // price display handled by useCurrency

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link
          to="/products"
          className="text-primary-600 hover:text-primary-800 transition-colors flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t('goBack')}
        </Link>
      </div>

      <div className="bg-white/75 backdrop-blur-sm rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

            <div className="mb-6">
              <p className="text-3xl font-bold">{format(product.price)}</p>
            </div>

            <div className="mb-6">
              <p className="text-primary-700 mb-4">{product.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {product.inStock ? (
                  <span className="badge badge-primary">
                    {t('product.inStock')}
                  </span>
                ) : (
                  <span className="badge bg-error-100 text-error-700">
                    {t('product.outOfStock')}
                  </span>
                )}
                <span className="badge badge-primary">{t('product.warranty')}</span>
                <span className="badge badge-primary">{t('product.original')}</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{t('product.warranty')}</span>
                </div>
                <div className="flex items-center">
                  
                  <Truck className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{t('product.delivery')}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-primary-600 mr-3" />
                  <span>{t('product.original')}</span>
                </div>
              </div>
            </div>

            {product.inStock && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="h-10 w-10 flex items-center justify-center border border-secondary-300 rounded-l-md bg-secondary-100 hover:bg-secondary-200"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="h-10 w-16 border-y border-secondary-300 text-center focus:outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="h-10 w-10 flex items-center justify-center border border-secondary-300 rounded-r-md bg-secondary-100 hover:bg-secondary-200"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t('product.addToCart')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mb-8">
        <TrustBadges variant="horizontal" className="justify-center" />
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white/75 backdrop-blur-sm rounded-lg shadow-sm p-6 mb-8">
        <div className="border-b border-secondary-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 font-medium text-lg ${
                activeTab === 'description'
                  ? 'text-primary-800 border-b-2 border-primary-800'
                  : 'text-secondary-500 hover:text-primary-600'
              }`}
            >
              {t('product.features')}
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 font-medium text-lg ${
                activeTab === 'specifications'
                  ? 'text-primary-800 border-b-2 border-primary-800'
                  : 'text-secondary-500 hover:text-primary-600'
              }`}
            >
              {t('product.specifications')}
            </button>
          </div>
        </div>

        <div>
          {activeTab === 'description' && (
            <div>
              <ul className="list-disc pl-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-primary-700">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div key={index} className="border-b border-secondary-100 pb-2">
                  <span className="font-medium text-primary-800">{key}:</span>{' '}
                  <span className="text-primary-600">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">{t('product.relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;