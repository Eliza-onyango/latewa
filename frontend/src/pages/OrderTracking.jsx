import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../config';

export default function OrderTracking() {
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderIdParam = params.get('orderId');
    const emailParam = params.get('email');

    if (orderIdParam && emailParam) {
      setOrderId(orderIdParam);
      setEmail(emailParam);
      performTracking(orderIdParam, emailParam);
    }
  }, [location.search]);

  const performTracking = async (id, mail) => {
    setError('');
    setOrder(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/orders/lookup?orderId=${encodeURIComponent(id)}&email=${encodeURIComponent(mail)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Order not found');
      }

      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const trackOrder = (e) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) {
      setError('Please enter both Order ID and email address.');
      return;
    }
    performTracking(orderId, email);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivering':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusStep = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 1;
      case 'processing':
        return 2;
      case 'delivering':
        return 3;
      case 'completed':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="section-alt min-h-[80vh]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-modern-red/10 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-modern-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="heading-xl text-modern-black mb-4">
            Track Your <span className="text-gradient">Order</span>
          </h1>
          <p className="text-body-lg text-modern-gray max-w-2xl mx-auto">
            Enter your Order ID and the email address used during checkout to see your order status.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-hard p-8 mb-8"
        >
          <form onSubmit={trackOrder} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-modern-black mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g., ORD-123456"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-modern-red focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-modern-black mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., john@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-modern-red focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-modern-red text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-modern-red/20"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking...
                </span>
              ) : (
                'Track Order'
              )}
            </button>
          </form>
        </motion.div>

        {/* Order Results */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Order Status Card */}
            <div className="bg-white rounded-2xl shadow-hard p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-modern-black">Order {order.id}</h2>
                  <p className="text-modern-gray">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`mt-2 md:mt-0 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                  <div 
                    className="absolute top-5 left-0 h-1 bg-modern-red -z-10 transition-all duration-500"
                    style={{ width: `${((getStatusStep(order.status) - 1) / 3) * 100}%` }}
                  ></div>
                  
                  {['Order Placed', 'Processing', 'Delivering', 'Completed'].map((step, index) => (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        getStatusStep(order.status) > index 
                          ? 'bg-modern-red text-white' 
                          : getStatusStep(order.status) === index + 1
                            ? 'bg-modern-red text-white'
                            : 'bg-gray-200 text-gray-500'
                      }`}>
                        {getStatusStep(order.status) > index + 1 ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className={`mt-2 text-xs font-medium ${
                        getStatusStep(order.status) >= index + 1 ? 'text-modern-black' : 'text-gray-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-modern-gray uppercase tracking-wide mb-2">Shipping Address</h3>
                  <p className="text-modern-black">{order.name}</p>
                  <p className="text-modern-gray">{order.address}</p>
                  <p className="text-modern-gray">{order.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-modern-gray uppercase tracking-wide mb-2">Payment Method</h3>
                  <p className="text-modern-black">{order.provider}</p>
                  {order.paymentRef && (
                    <p className="text-modern-gray text-sm">Ref: {order.paymentRef}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-hard p-8">
              <h3 className="text-xl font-bold text-modern-black mb-6">Order Items</h3>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-semibold text-modern-black">{item.name}</p>
                      <p className="text-sm text-modern-gray">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-modern-black">KES {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-modern-black">Total</span>
                  <span className="text-2xl font-bold text-modern-red">KES {order.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-gradient-to-r from-modern-red to-red-600 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Need Help With Your Order?</h3>
              <p className="text-red-100 mb-4">
                If you have any questions about your order, please contact our support team.
              </p>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 bg-white text-modern-red font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}