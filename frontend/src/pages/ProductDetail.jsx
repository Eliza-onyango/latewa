import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ArrowLeft, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_URL, getImageUrl } from '../config';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        const products = data.products || data;
        const found = products.find(p => p.id === id);
        setProduct(found);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/store')}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const discountPercentage = product.discount_percentage || 0;
  const originalPrice = product.original_price || product.price;
  const discountedPrice = discountPercentage > 0 
    ? Math.round(product.price * (1 - discountPercentage / 100))
    : product.price;
  const isInStock = product.in_stock !== false;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/store')}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-red-600 font-semibold mb-8 hover:text-red-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Store
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl shadow-lg p-6 lg:p-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]">
              {/* Shimmer Placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
              )}

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                className={`w-full h-full object-cover ${
                  !isInStock ? 'grayscale' : ''
                }`}
              />

              {/* Stock Status Badge */}
              <div className={`absolute top-6 right-6 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                isInStock ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {isInStock ? '✓ In Stock' : '✗ Out of Stock'}
              </div>

              {/* Wishlist Button */}
              <motion.button
                onClick={() => setIsWishlisted(!isWishlisted)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute top-6 left-6 p-3 rounded-full shadow-lg backdrop-blur-sm transition-colors ${
                  isWishlisted 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/80 text-gray-800 hover:bg-white'
                }`}
              >
                <Heart 
                  className="w-6 h-6" 
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </motion.button>

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <motion.div
                  initial={{ rotate: -12, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="absolute bottom-6 left-6 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                >
                  Save {discountPercentage}%
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              {/* Category */}
              <div className="mb-4">
                <span className="inline-block bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-sm font-bold">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-yellow-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">(48 customer reviews)</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Price Section */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-4xl font-extrabold text-red-600">
                    KES {discountedPrice.toLocaleString()}
                  </span>
                  {discountPercentage > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        KES {originalPrice.toLocaleString()}
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        Save KES {(originalPrice - discountedPrice).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-sm text-green-600 font-semibold">Special promotion: {discountPercentage}% off!</p>
                )}
              </div>

              {/* Stock Info */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-3">
                  Availability: <span className={`font-bold ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                    {isInStock ? `${product.stock_quantity || 'Multiple'} units available` : 'Currently out of stock'}
                  </span>
                </p>
              </div>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              {isInStock && (
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                  <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-none focus:ring-0 font-semibold"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!isInStock}
                whileHover={isInStock ? { scale: 1.05, y: -2 } : {}}
                whileTap={isInStock ? { scale: 0.95 } : {}}
                className={`w-full py-4 px-6 font-bold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isInStock
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {isInStock ? `Add ${quantity} to Cart` : 'Out of Stock'}
              </motion.button>

              {/* Wishlist Button */}
              <motion.button
                onClick={() => setIsWishlisted(!isWishlisted)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 font-bold rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-red-50 border-red-600 text-red-600'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-red-600 hover:bg-red-50'
                }`}
              >
                <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
        >
          {/* Feature 1 */}
          <div className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
            <Truck className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over KES 5,000</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
            <Shield className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600">100% protected transactions</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
            <RefreshCw className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Easy Returns</h3>
            <p className="text-sm text-gray-600">30-day return policy</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
