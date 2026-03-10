import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card-hover flex flex-col h-full group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-modern-red/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-modern-black group-hover:text-modern-red transition-colors">
            {product.name}
          </h3>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl font-extrabold text-modern-red">
              KES {product.price.toLocaleString()}
            </span>
          </motion.div>
        </div>
        
        <p className="text-modern-gray text-base leading-relaxed flex-1 mb-6">
          {product.description}
        </p>
        
        {/* Action Button */}
        <motion.button
          onClick={() => onAdd(product)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary w-full py-3 text-lg font-semibold group/btn"
        >
          <span className="group-hover/btn:translate-x-2 transition-transform inline-flex items-center">
            Add to Cart
            <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
