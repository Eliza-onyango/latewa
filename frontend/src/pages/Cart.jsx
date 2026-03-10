import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, increase, decrease, removeItem, subtotal, shipping, total } = useCart();

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-modern-black">Shopping Cart</h1>
            <Link 
              to="/store" 
              className="btn-primary flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Continue Shopping</span>
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold text-modern-black mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to your cart to get started</p>
              <Link 
                to="/store" 
                className="btn-primary inline-block"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-modern-black mb-1">{item.name}</h3>
                            <p className="text-modern-red font-bold">KES {item.price.toLocaleString()}</p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)} 
                            className="text-gray-400 hover:text-red-600 p-1"
                            aria-label="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button 
                              onClick={() => decrease(item.id)} 
                              className="px-3 py-2 hover:bg-gray-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="px-4 py-2 font-semibold text-modern-black">{item.qty}</span>
                            <button 
                              onClick={() => increase(item.id)} 
                              className="px-3 py-2 hover:bg-gray-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <div className="text-sm text-gray-600">
                            Subtotal: <span className="font-semibold">KES {(item.price * item.qty).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-modern-black mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                      <span>KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Shipping</span>
                      <span>KES {shipping.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-modern-black text-lg">
                      <span>Total</span>
                      <span>KES {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link 
                      to="/checkout" 
                      className="btn-primary w-full py-3 text-center block font-semibold"
                    >
                      Proceed to Checkout
                    </Link>
                    <Link 
                      to="/store" 
                      className="w-full py-3 text-center block border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  <div className="mt-4 text-xs text-gray-500 text-center">
                    <p>Shipping calculated at checkout</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}