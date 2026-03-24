import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { getImageUrl } from '../config';

const ProductCard = memo(function ProductCard({ product, onAdd }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Calculate discounted price
  const discountPercentage = product.discount_percentage || 0;
  const originalPrice = product.original_price || product.price;
  const discountedPrice = discountPercentage > 0 
    ? Math.round(product.price * (1 - discountPercentage / 100))
    : product.price;

  const isInStock = product.in_stock !== false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col h-full transition-all duration-300 ${
        !isInStock ? 'opacity-75' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-2xl bg-gray-100 aspect-[3/4]">
        {/* Shimmer Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer"></div>
          </div>
        )}

        {/* Product Image */}
        <img 
          src={getImageUrl(product.image)} 
          alt={product.name} 
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ${
            !isInStock ? 'grayscale' : ''
          }`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        <motion.div 
          className="absolute top-4 left-4 z-10"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
            {product.category}
          </span>
        </motion.div>

        {/* Wishlist Button */}
        <motion.button
          onClick={handleWishlist}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-colors ${
            isWishlisted 
              ? 'bg-red-600 text-white' 
              : 'bg-white/80 text-gray-800 hover:bg-white'
          }`}
        >
          <Heart 
            className="w-5 h-5" 
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </motion.button>

        {/* Stock Status Badge */}
        <div className={`absolute bottom-4 right-4 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
          isInStock ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {isInStock ? '✓ In Stock' : '✗ Out of Stock'}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category Tag (small) */}
        <div className="mb-2">
          <span className="inline-block text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating Section */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm">★</span>
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">(48 reviews)</span>
        </div>
        
        {/* Description - truncated */}
        <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price Section */}
        <motion.div 
          className="mb-4 pb-4 border-b border-gray-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-red-600">
              KES {discountedPrice.toLocaleString()}
            </span>
            {discountPercentage > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  KES {originalPrice.toLocaleString()}
                </span>
                <span className="ml-auto text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                  Save {discountPercentage}%
                </span>
              </>
            )}
          </div>
        </motion.div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            onClick={() => onAdd(product)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isInStock}
            className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group/btn ${
              isInStock 
                ? 'bg-gradient-to-r from-red-600 to-red-700 hover:scale-105' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
            <span>{isInStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </motion.button>

          <motion.button
            onClick={() => navigate(`/product/${product.id}`)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductCard;
