// pages/Store.jsx
import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Store() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 12;

  // Categories
  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'Jewelry', name: 'Jewelry', icon: '💍' },
    { id: 'Sculpture', name: 'Sculpture', icon: '🗿' },
    { id: 'Wall Art', name: 'Wall Art', icon: '🎨' },
    { id: 'Fashion', name: 'Fashion', icon: '👔' },
    { id: 'Accessories', name: 'Accessories', icon: '✨' },
    { id: 'Home Decor', name: 'Home Decor', icon: '🏠' },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Build query parameters
    const params = new URLSearchParams({
      page: currentPage,
      limit: pageSize,
      category: selectedCategory,
      search: searchQuery,
      minPrice: priceRange.min,
      maxPrice: priceRange.max
    });

    fetch(`${API_URL}/products?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setTotalItems(data.total || 0);
        setLoading(false);
        setCurrentPage(1); // Reset to first page when filters change
        // Scroll to top of results when filters change
        window.scrollTo({ top: 300, behavior: 'smooth' });
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [currentPage, selectedCategory, searchQuery, priceRange]);

  // Sort products client-side (backend returns pre-filtered)
  const sortedProducts = useMemo(() => {
    let sorted = [...products];

    // Sort based on selection
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'popular':
        sorted.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      default:
        // featured - keep original order
        break;
    }

    return sorted;
  }, [products, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section 
        variants={fadeInUp}
        className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Artisan Collection
            </motion.h1>
            <motion.div 
              variants={fadeInUp}
              className="w-24 h-1 bg-white mx-auto mb-6"
            ></motion.div>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-red-100 max-w-2xl mx-auto"
            >
              Discover unique handmade pieces crafted by our community artisans. 
              Every purchase directly supports our programs and empowers local creators.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Main Store Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters Bar */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
              >
                <option value="featured">✨ Featured</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💰 Price: High to Low</option>
                <option value="newest">🆕 Newest First</option>
                <option value="popular">🔥 Most Popular</option>
              </select>

              {/* Price Range (simplified) */}
              <select
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-').map(Number);
                  setPriceRange({ min, max });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
              >
                <option value="0-100000">💵 All Prices</option>
                <option value="0-5000">Under 5,000 KES</option>
                <option value="5000-15000">5,000 - 15,000 KES</option>
                <option value="15000-30000">15,000 - 30,000 KES</option>
                <option value="30000-100000">Above 30,000 KES</option>
              </select>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-full">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')} className="ml-2 hover:text-red-200">
                    ×
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-full">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="ml-2 hover:text-red-200">
                    ×
                  </button>
                </span>
              )}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div 
            variants={fadeInUp}
            className="flex justify-between items-center mb-6"
          >
            <p className="text-gray-600">
              Showing <span className="font-bold text-red-600">{sortedProducts.length}</span> of <span className="font-bold text-red-600">{totalItems}</span> products
            </p>
            <p className="text-sm text-gray-500">
              Every purchase supports our community
            </p>
          </motion.div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-50 text-red-600 p-8 rounded-2xl max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-semibold mb-2">Oops! Something went wrong</p>
                <p className="mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : sortedProducts.length === 0 ? (
            <motion.div 
              variants={fadeInUp}
              className="text-center py-20 bg-white rounded-2xl shadow-lg"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setPriceRange({ min: 0, max: 100000 });
                  setSortBy('featured');
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              >
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={fadeInUp}
                  >
                    <ProductCard product={product} onAdd={addItem} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <motion.div 
                  variants={fadeInUp}
                  className="flex justify-center items-center gap-4 mt-8"
                >
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page, index, arr) => {
                        // Add ellipsis if there's a gap
                        if (index > 0 && page - arr[index - 1] > 1) {
                          return (
                            <span key={`ellipsis-${page}`} className="px-2 py-2 text-gray-500">
                              ...
                            </span>
                          );
                        }
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-red-600 text-white'
                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </>
          )}

          {/* Impact Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100+ Artisans</h3>
              <p className="text-gray-600">Supported by our community program</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">80% to Programs</h3>
              <p className="text-gray-600">Of every sale goes to community initiatives</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Sustainable materials and practices</p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Want to Become an <span className="text-red-600">Artisan Partner?</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Join our community of creators and showcase your work to a global audience. 
                We provide training, materials, and a platform to sell your crafts.
              </p>
              <Link
                to="/get-involved"
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}