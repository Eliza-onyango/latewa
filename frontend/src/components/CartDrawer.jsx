import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, increase, decrease, removeItem, subtotal, shipping, total } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-black">Your Cart</h2>
              <button onClick={closeCart} className="p-2 rounded hover:bg-gray-100" aria-label="Close cart">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 border rounded-lg p-3">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-brand-black">{item.name}</h3>
                          <p className="text-sm text-gray-600">KES {item.price.toLocaleString()}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600" aria-label="Remove">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={() => decrease(item.id)} className="px-2 py-1 border rounded hover:bg-gray-100">-</button>
                        <span className="w-8 text-center">{item.qty}</span>
                        <button onClick={() => increase(item.id)} className="px-2 py-1 border rounded hover:bg-gray-100">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t space-y-2">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Subtotal</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Shipping</span>
                <span>KES {shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-brand-black text-lg">
                <span>Total</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="block text-center w-full mt-2 bg-brand-red text-white py-3 rounded-lg font-semibold hover:bg-red-700"
              >
                Checkout
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
