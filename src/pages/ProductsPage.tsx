import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products, categories } from '../data/products';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [sortOption, setSortOption] = useState<string>('newest');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Filter by price
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortOption) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        // Keep original order for 'newest'
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, sortOption]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (e.target.name === 'min') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 20000]);
    setSortOption('newest');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="container-custom py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-2">{t('products.title')}</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full mb-8" />

        {/* Filters Panel - Top */}
        <div className="bg-white p-6 rounded-xl shadow-elegant border border-secondary-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {t('products.filters.category')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="input-field w-full py-2.5 px-3 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {t('products.filters.price')}
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    name="min"
                    placeholder="Min CHF"
                    value={priceRange[0]}
                    onChange={handlePriceChange}
                    min="0"
                    max={priceRange[1]}
                    className="input-field w-full py-2.5 px-3"
                  />
                </div>
                <div className="flex items-center text-secondary-400">-</div>
                <div className="flex-1">
                  <input
                    type="number"
                    name="max"
                    placeholder="Max CHF"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    min={priceRange[0]}
                    className="input-field w-full py-2.5 px-3"
                  />
                </div>
              </div>
            </div>

            {/* Sort */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {t('products.sort.title') || 'Sortieren'}
              </label>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="input-field w-full py-2.5 pl-3 pr-10 appearance-none"
                >
                  <option value="newest">{t('products.sort.newest')}</option>
                  <option value="priceAsc">{t('products.sort.priceAsc')}</option>
                  <option value="priceDesc">{t('products.sort.priceDesc')}</option>
                </select>
                <SlidersHorizontal className="absolute right-3 top-3.5 h-4 w-4 text-primary-600 pointer-events-none" />
              </div>
            </div>

            {/* Reset Button */}
            <div>
              <button
                onClick={resetFilters}
                className="btn btn-secondary w-full lg:w-auto whitespace-nowrap"
              >
                <X className="h-4 w-4 mr-2 inline" />
                {t('products.filters.reset')}
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-primary-600 mb-4">{t('products.noResults')}</p>
            <button onClick={resetFilters} className="btn btn-primary">
              {t('products.filters.reset')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;