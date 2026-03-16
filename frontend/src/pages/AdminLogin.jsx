import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function AdminLogin() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    setMessage('Authenticating...');

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        setMessage('Accessing Dashboard...');
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 500);
      } else {
        setLoginError(data.message || 'Invalid credentials');
        setMessage('');
        setIsLoading(false);
      }
    } catch {
      setLoginError('Connection error. Please try again.');
      setMessage('');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-modern-red/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-modern-red/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-hard relative z-10 border border-gray-100">
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
            Click below to manage your organization
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {message && (
            <div className={`p-4 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-100`}>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {message}
              </div>
            </div>
          )}

          {loginError && (
            <div className="p-4 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-100">
              {loginError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-modern-red focus:border-transparent"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-modern-red focus:border-transparent"
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-black bg-modern-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-modern-red transition-all duration-200 shadow-lg shadow-modern-red/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Authenticating...
                </div>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <a href="/" className="text-sm font-medium text-modern-red hover:text-red-700 transition-colors">
            Return to homepage
          </a>
        </div>
      </div>
    </div>
  );
}
