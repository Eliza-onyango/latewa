import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL, getImageUrl } from '../config';

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Helper function for authenticated fetch
const authFetch = async (url, options = {}) => {
  const headers = {
    ...options.headers,
    ...getAuthHeader(),
    'Content-Type': 'application/json',
  };
  return fetch(url, { ...options, headers });
};

// Sidebar Component
function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'products', label: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'orders', label: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { id: 'donations', label: 'Donations', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { id: 'volunteers', label: 'Volunteers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'contacts', label: 'Contacts', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'gallery', label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="h-10 w-10 bg-red-600 rounded-xl flex items-center justify-center">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h1 className="text-white font-bold text-lg">Latewa CBO</h1>
          <p className="text-gray-400 text-xs">Admin Panel</p>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

// Stats Card Component
function StatsCard({ title, value, icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// Dashboard Overview
function DashboardOverview() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalOrders: 0,
    totalVolunteers: 0,
    totalContacts: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    authFetch(`${API_URL}/admin/stats`)
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Revenue"
          value={`KES ${stats.totalRevenue.toLocaleString()}`}
          icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          color="bg-green-500"
        />
        <StatsCard
          title="Total Donations"
          value={`KES ${stats.totalDonations.toLocaleString()}`}
          icon="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          color="bg-red-500"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          color="bg-blue-500"
        />
        <StatsCard
          title="Active Volunteers"
          value={stats.totalVolunteers}
          icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          color="bg-purple-500"
        />
        <StatsCard
          title="New Contacts"
          value={stats.totalContacts}
          icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          color="bg-orange-500"
        />
        <StatsCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          color="bg-yellow-500"
        />
      </div>

      {/* Recent Donations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Donations</h3>
            <button
              onClick={() => setActiveTab('donations')}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              View All →
            </button>
          </div>
          <RecentDonationsList />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Contacts</h3>
            <button
              onClick={() => setActiveTab('contacts')}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              View All →
            </button>
          </div>
          <RecentContactsList />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('products')}
            className="bg-red-50 border border-red-200 rounded-xl p-4 hover:bg-red-100 transition-colors"
          >
            <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900">Manage Products</p>
          </button>
          
          <button
            onClick={() => setActiveTab('orders')}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 hover:bg-blue-100 transition-colors"
          >
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900">Manage Orders</p>
          </button>
          
          <button
            onClick={() => setActiveTab('volunteers')}
            className="bg-purple-50 border border-purple-200 rounded-xl p-4 hover:bg-purple-100 transition-colors"
          >
            <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900">Manage Volunteers</p>
          </button>
          
          <button
            onClick={() => setActiveTab('gallery')}
            className="bg-green-50 border border-green-200 rounded-xl p-4 hover:bg-green-100 transition-colors"
          >
            <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900">Manage Gallery</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// Recent Donations List Component
function RecentDonationsList() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    authFetch(`${API_URL}/admin/donations`)
      .then((res) => res.json())
      .then((data) => {
        // Sort by date and take last 5
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        setDonations(sorted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-3">
      {donations.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent donations</p>
      ) : (
        donations.map((donation) => (
          <div key={donation.id} className="flex justify-between items-center py-2 border-b border-gray-50">
            <div>
              <p className="font-medium text-gray-900">{donation.name}</p>
              <p className="text-sm text-gray-500">{donation.type}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">KES {donation.amount.toLocaleString()}</p>
              <p className="text-xs text-gray-400">{donation.date}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Recent Contacts List Component
function RecentContactsList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    authFetch(`${API_URL}/admin/contacts`)
      .then((res) => res.json())
      .then((data) => {
        // Sort by date and take last 5
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        setContacts(sorted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-3">
      {contacts.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent contacts</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id} className="flex justify-between items-center py-2 border-b border-gray-50">
            <div>
              <p className="font-medium text-gray-900">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.interest}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                contact.status === 'New' ? 'bg-red-100 text-red-800' : 
                contact.status === 'Read' ? 'bg-blue-100 text-blue-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {contact.status}
              </span>
              <p className="text-xs text-gray-400">{contact.date}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Products Management
function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editUploading, setEditUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    in_stock: true,
    stock_quantity: 0,
    discount_percentage: 0,
    original_price: 0,
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Jewelry',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [editImagePreview, setEditImagePreview] = useState('');

  useEffect(() => {
    authFetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || data))
      .catch(console.error);
  }, []);

  // Handle image file selection for add form
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Store file for upload
      setNewProduct({ ...newProduct, imageFile: file });
    }
  };

  // Handle image file selection for edit form
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Store file for upload
      setEditForm({ ...editForm, imageFile: file });
    }
  };

  // Upload image to server
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      return data.path;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imagePath = newProduct.image;
      
      // Upload image if a file was selected
      if (newProduct.imageFile) {
        setUploading(true);
        imagePath = await uploadImage(newProduct.imageFile);
        setUploading(false);
      }
      
      const res = await authFetch(`${API_URL}/products`, {
        method: 'POST',
        body: JSON.stringify({
          ...newProduct,
          image: imagePath,
          price: Number(newProduct.price),
        }),
      });
      const product = await res.json();
      setProducts([...products, product]);
      setShowForm(false);
      setNewProduct({ name: '', description: '', price: '', image: '', category: 'Jewelry' });
      setImagePreview('');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      image: product.image || '',
      category: product.category || 'Jewelry',
      in_stock: product.in_stock !== false,
      stock_quantity: product.stock_quantity || 0,
      discount_percentage: product.discount_percentage || 0,
      original_price: product.original_price || product.price,
    });
    setEditImagePreview(product.image || '');
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      let imagePath = editForm.image;
      
      // Upload image if a file was selected
      if (editForm.imageFile) {
        setEditUploading(true);
        imagePath = await uploadImage(editForm.imageFile);
        setEditUploading(false);
      }
      
      const res = await authFetch(`${API_URL}/products/${editingProduct.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          price: Number(editForm.price),
          image: imagePath,
          category: editForm.category,
          in_stock: editForm.in_stock,
          stock_quantity: Number(editForm.stock_quantity),
          discount_percentage: Number(editForm.discount_percentage),
          original_price: Number(editForm.original_price),
        }),
      });
      const updated = await res.json();
      setProducts(products.map((p) => (p.id === editingProduct.id ? updated : p)));
      setShowEditModal(false);
      setEditingProduct(null);
      setEditImagePreview('');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await authFetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Jewelry">Jewelry</option>
                  <option value="Wall Art">Wall Art</option>
                  <option value="Sculpture">Sculpture</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="3"
                  required
                />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setImagePreview('');
                    setNewProduct({ name: '', description: '', price: '', image: '', category: 'Jewelry' });
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Stock & Discount Modal */}
      <AnimatePresence>
        {showEditModal && editingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Product</h3>
              
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Price (KES)</label>
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Jewelry">Jewelry</option>
                      <option value="Wall Art">Wall Art</option>
                      <option value="Sculpture">Sculpture</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Home Decor">Home Decor</option>
                      <option value="Fashion">Fashion</option>
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {editImagePreview && (
                      <div className="mt-3">
                        <img 
                          src={editImagePreview} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      rows="3"
                      required
                    />
                  </div>

                  {/* Stock Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editForm.in_stock}
                        onChange={(e) => setEditForm({ ...editForm, in_stock: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-600">
                        {editForm.in_stock ? '✓ In Stock' : '✗ Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {/* Stock Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.stock_quantity}
                      onChange={(e) => setEditForm({ ...editForm, stock_quantity: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Original Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (KES)</label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.original_price}
                      onChange={(e) => setEditForm({ ...editForm, original_price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Discount Percentage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage (%)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editForm.discount_percentage}
                        onChange={(e) => setEditForm({ ...editForm, discount_percentage: e.target.value })}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      {editForm.discount_percentage > 0 && (
                        <div className="bg-green-50 px-3 py-2 rounded-xl flex items-center">
                          <span className="text-sm font-semibold text-green-600">
                            Save {editForm.discount_percentage}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={editUploading}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editUploading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditImagePreview('');
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600">Product</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600">Price</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600">Stock</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600">Discount</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">KES {product.price.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                    product.in_stock 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.in_stock ? '✓ In Stock' : '✗ Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {product.discount_percentage > 0 ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                      Save {product.discount_percentage}%
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">No discount</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Orders Management
function OrdersManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    authFetch(`${API_URL}/admin/orders`)
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await authFetch(`${API_URL}/admin/orders/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      const updated = await res.json();
      setOrders(orders.map((o) => (o.id === id ? updated : o)));
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Processing: 'bg-blue-100 text-blue-800',
      Paid: 'bg-green-100 text-green-800',
      Shipped: 'bg-purple-100 text-purple-800',
      Delivered: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Items</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Total</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Payment</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.name}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-gray-600">
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    KES {order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{order.provider}</p>
                      <p className="text-gray-500 text-xs">{order.paymentRef}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Paid">Paid</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Donations Management
function DonationsManagement() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    authFetch(`${API_URL}/admin/donations`)
      .then((res) => res.json())
      .then(setDonations)
      .catch(console.error);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Failed: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Donations</h2>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Donor</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {donations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{donation.name}</p>
                    <p className="text-sm text-gray-500">{donation.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 rounded-full text-sm font-medium text-purple-800">
                    {donation.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  KES {donation.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-600">{donation.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
                    {donation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Volunteers Management
function VolunteersManagement() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    authFetch(`${API_URL}/admin/volunteers`)
      .then((res) => res.json())
      .then(setVolunteers)
      .catch(console.error);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await authFetch(`${API_URL}/admin/volunteers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      const updated = await res.json();
      setVolunteers(volunteers.map((v) => (v.id === id ? updated : v)));
    } catch (error) {
      console.error('Error updating volunteer:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Inactive: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Volunteers</h2>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Contact</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Area</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Availability</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {volunteers.map((volunteer) => (
              <tr key={volunteer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{volunteer.name}</td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-gray-600">{volunteer.email}</p>
                    <p className="text-gray-500">{volunteer.phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 rounded-full text-sm font-medium text-blue-800">
                    {volunteer.area}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{volunteer.availability}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(volunteer.status)}`}>
                    {volunteer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={volunteer.status}
                    onChange={(e) => updateStatus(volunteer.id, e.target.value)}
                    className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Contacts Management
function ContactsManagement() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    authFetch(`${API_URL}/admin/contacts`)
      .then((res) => res.json())
      .then(setContacts)
      .catch(console.error);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await authFetch(`${API_URL}/admin/contacts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      const updated = await res.json();
      setContacts(contacts.map((c) => (c.id === id ? updated : c)));
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      New: 'bg-red-100 text-red-800',
      Read: 'bg-blue-100 text-blue-800',
      Replied: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Inquiries</h2>
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{contact.email}</p>
                <span className="inline-block px-3 py-1 bg-purple-100 rounded-full text-xs font-medium text-purple-800 mb-3">
                  {contact.interest}
                </span>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-xl">{contact.message}</p>
                <p className="text-xs text-gray-400 mt-2">{contact.date}</p>
              </div>
              <select
                value={contact.status}
                onChange={(e) => updateStatus(contact.id, e.target.value)}
                className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
              >
                <option value="New">New</option>
                <option value="Read">Read</option>
                <option value="Replied">Replied</option>
              </select>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Gallery Management
function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newImage, setNewImage] = useState({ url: '', caption: '' });
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    file: null
  });

  useEffect(() => {
    authFetch(`${API_URL}/admin/gallery`)
      .then((res) => res.json())
      .then(setImages)
      .catch(console.error);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch(`${API_URL}/admin/gallery`, {
        method: 'POST',
        body: JSON.stringify(newImage),
      });
      const image = await res.json();
      setImages([...images, image]);
      setShowForm(false);
      setNewImage({ url: '', caption: '' });
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await authFetch(`${API_URL}/admin/gallery/${id}`, { method: 'DELETE' });
        setImages(images.filter((img) => img.id !== id));
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setUploadForm(prev => ({ ...prev, file }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Image
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Image</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter photo title"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Description
                  </label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Describe this photo..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Upload Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => document.querySelector('input[type="file"]').click()}
                      className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 text-center mb-4">
                  {uploadForm.file ? `Selected: ${uploadForm.file.name}` : "Drag and drop an image here, or click to browse"}
                </p>
                <p className="text-xs text-gray-400">Supported formats: JPG, PNG, GIF</p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id || index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
          >
            <div className="relative h-48">
              <img
                src={getImageUrl(image.url)}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="font-semibold text-gray-900">{image.caption || `Gallery Image ${index + 1}`}</p>
              <p className="text-sm text-gray-500">{image.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Handle logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'products':
        return <ProductsManagement />;
      case 'orders':
        return <OrdersManagement />;
      case 'donations':
        return <DonationsManagement />;
      case 'volunteers':
        return <VolunteersManagement />;
      case 'contacts':
        return <ContactsManagement />;
      case 'gallery':
        return <GalleryManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <main className="ml-64 p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}
