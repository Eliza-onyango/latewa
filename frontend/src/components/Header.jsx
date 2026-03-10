import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import logo from '../assets/latewa-logo1.png';
import { useCart } from '../context/CartContext';

function CartButton() {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/cart')} 
      className="relative p-3 rounded-xl hover:bg-gray-50 transition-all focus-ring"
      aria-label="View cart"
    >
      <svg className="w-6 h-6 text-modern-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m6-9v9" />
      </svg>
      {itemCount > 0 && (
        <span 
          className="absolute -top-2 -right-2 bg-modern-red text-white text-[10px] font-black rounded-full min-w-[22px] h-[22px] px-1.5 flex items-center justify-center shadow-xl border-2 border-white ring-1 ring-modern-red/20"
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}

function TrackOrderButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/track-order')} 
      className="p-3 rounded-xl hover:bg-gray-50 transition-all focus-ring group"
      aria-label="Track your order"
      title="Track Order"
    >
      <svg className="w-6 h-6 text-modern-black group-hover:text-modern-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    </button>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simplified navigation structure without dropdowns
  const navigation = {
    main: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/programs', label: 'Programs' },
      { to: '/get-involved', label: 'Get Involved' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/contact', label: 'Contact' },
    ],
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-modern-red/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative group">
              <div className="absolute inset-0 bg-modern-red/10 rounded-xl blur-xl scale-150 animate-pulse-slow"></div>
              <img
                src={logo}
                alt="Latewa International NGO Logo"
                className="h-16 w-auto rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow relative z-10"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-modern-black leading-tight tracking-tight">
                Latewa
              </span>
              <span className="text-xs font-semibold text-modern-red uppercase tracking-wider">
                International NGO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.main.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `nav-item transition-all ${
                    isActive 
                      ? 'text-modern-red bg-red-50' 
                      : 'text-modern-black hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Store Button */}
            <div className="ml-4">
              <Link
                to="/store"
                className="btn-primary flex items-center space-x-3 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Store</span>
              </Link>
            </div>

            <TrackOrderButton />
            <CartButton />
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <TrackOrderButton />
            <CartButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-xl text-modern-black hover:bg-gray-50 transition-all focus-ring"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <nav
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-gray-100">
                {navigation.main.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-semibold transition-colors hover:bg-red-50 hover:text-modern-red ${
                        isActive ? 'text-modern-red bg-red-50' : 'text-modern-black'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                
                {/* Mobile Store Button */}
                <Link
                  to="/store"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary flex items-center space-x-3 mx-4 mt-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Visit Our Store</span>
                </Link>

                {/* Mobile Track Order Button */}
                <Link
                  to="/track-order"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 mx-4 mt-2 px-4 py-3 border border-gray-200 rounded-xl text-modern-black font-semibold hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Track Order</span>
                </Link>
              </div>
            </nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
