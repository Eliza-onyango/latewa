import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setMessage('Logged in successfully. Redirecting...');
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1000);
    } else {
      setMessage('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-modern-red/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-modern-red/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-hard relative z-10 border border-gray-100"
      >
        <div>
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-modern-red/10 rounded-2xl flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-modern-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-center text-3xl font-extrabold text-modern-black tracking-tight">
            Admin Portal
          </h1>
          <p className="mt-2 text-center text-sm text-modern-gray">
            Sign in to manage your organization
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-semibold text-modern-black mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-modern-black rounded-xl focus:outline-none focus:ring-2 focus:ring-modern-red focus:border-transparent transition-all duration-200 sm:text-sm"
                placeholder="admin@latewa.org"
              />
            </div>
            <div>
              <label htmlFor="password" name="password-label" className="block text-sm font-semibold text-modern-black mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-modern-black rounded-xl focus:outline-none focus:ring-2 focus:ring-modern-red focus:border-transparent transition-all duration-200 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {message && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-xl text-sm font-medium ${
                message.includes('Logged in') 
                  ? 'bg-green-50 text-green-700 border border-green-100' 
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {message.includes('Logged in') ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                {message}
              </div>
            </motion.div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-modern-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-modern-red transition-all duration-200 shadow-lg shadow-modern-red/20"
            >
              Sign In
            </motion.button>
          </div>
        </form>

        <div className="text-center">
          <a href="/" className="text-sm font-medium text-modern-red hover:text-red-700 transition-colors">
            Return to homepage
          </a>
        </div>
      </motion.div>
    </div>
  );
}
