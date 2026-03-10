import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config';

export default function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [provider, setProvider] = useState('mpesa');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [mpesaWaiting, setMpesaWaiting] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Format phone number to 2547XXXXXXXX
  const formatPhone = (phone) => {
    let formatted = phone.replace(/\s+/g, '');
    if (formatted.startsWith('0')) {
      formatted = '254' + formatted.slice(1);
    } else if (formatted.startsWith('+254')) {
      formatted = formatted.slice(1);
    }
    return formatted;
  };

  // Initiate M-Pesa STK Push
  const initiateMpesaPayment = async (orderItems) => {
    try {
      const formattedPhone = formatPhone(form.phone);
      
      const response = await fetch(`${API_URL}/mpesa/stkpush`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: formattedPhone, 
          amount: total,
          orderData: {
            name: form.name,
            email: form.email,
            phone: formattedPhone,
            address: form.address,
            items: orderItems,
            total: total,
            provider: 'M-Pesa'
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.CheckoutRequestID) {
        setMpesaWaiting(true);
        setMessage('Please check your phone and enter your M-Pesa PIN to complete the payment...');
        
        // Poll for payment status
        return await pollPaymentStatus(data.CheckoutRequestID, orderItems);
      } else {
        throw new Error(data.error || 'Failed to initiate M-Pesa payment');
      }
    } catch (error) {
      console.error('M-Pesa error:', error);
      throw error;
    }
  };

  // Poll for payment status
  const pollPaymentStatus = async (checkoutId, orderItems) => {
    const maxAttempts = 30; // 30 attempts x 3 seconds = 90 seconds max
    let attempts = 0;

    const poll = async () => {
      attempts++;
      
      try {
        const response = await fetch(`${API_URL}/mpesa/status/${checkoutId}`);
        const data = await response.json();

        if (data.status === 'completed') {
          // Payment successful - create order
          const orderResponse = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              phone: formatPhone(form.phone),
              address: form.address,
              items: orderItems,
              total: total,
              provider: 'M-Pesa',
              paymentRef: data.mpesaReceiptNumber || checkoutId
            })
          });

          const orderData = await orderResponse.json();
          
          if (orderResponse.ok) {
            setOrderId(orderData.orderId);
            setMessage('Payment successful! Your order has been placed.');
            clear();
            return { success: true };
          }
        } else if (data.status === 'failed') {
          setMessage('Payment failed: ' + (data.error || 'Please try again.'));
          return { success: false };
        } else if (attempts < maxAttempts) {
          // Continue polling
          await new Promise(resolve => setTimeout(resolve, 3000));
          return poll();
        } else {
          setMessage('Payment timeout. If you completed the payment, please contact support with your M-Pesa receipt.');
          return { success: false };
        }
      } catch (error) {
        console.error('Polling error:', error);
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 3000));
          return poll();
        }
        setMessage('Connection error. Please check if payment was processed and contact support if needed.');
        return { success: false };
      }
    };

    return poll();
  };

  const placeOrder = async () => {
    setMessage('');
    setOrderId(null);
    
    if (!form.name || !form.email || !form.phone || !form.address) {
      setMessage('Please fill all required fields.');
      return;
    }
    if (items.length === 0) {
      setMessage('Your cart is empty.');
      return;
    }

    // Validate phone for M-Pesa
    if (provider === 'mpesa') {
      const phoneRegex = /^(0|254|\+254)[17]\d{8}$/;
      const cleanPhone = form.phone.replace(/\s+/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        setMessage('Please enter a valid Kenyan phone number (e.g., 0712 345 678)');
        return;
      }
    }

    setLoading(true);

    try {
      // Prepare order items
      const orderItems = items.map(item => ({
        name: item.name,
        quantity: item.qty,
        price: item.price
      }));

      if (provider === 'mpesa') {
        await initiateMpesaPayment(orderItems);
      } else {
        // Card payment (Stripe) - simulated for now
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await fetch(`${API_URL}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            items: orderItems,
            total: total,
            provider: 'Card (Stripe)',
            paymentRef: 'SIM-' + Date.now()
          })
        });

        const data = await response.json();
        
        if (response.ok) {
          setOrderId(data.orderId);
          setMessage('Payment successful! Your order has been placed.');
          clear();
        } else {
          setMessage('Order saved but there was an issue. Please contact support.');
        }
      }
    } catch (e) {
      console.error('Order error:', e);
      setMessage(e.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      setMpesaWaiting(false);
    }
  };

  // Show success screen after order is placed
  if (orderId) {
    return (
      <section className="py-12 bg-gray-50 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-hard p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-modern-black mb-2">Order Confirmed!</h2>
            <p className="text-modern-gray mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-modern-gray mb-1">Your Order ID</p>
              <p className="text-2xl font-bold text-modern-red">{orderId}</p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-800 text-left">
                  <strong>Save your Order ID!</strong> You'll need it along with your email address to track your order status.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <a 
                href="/track-order" 
                className="block w-full py-3 bg-modern-red text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
              >
                Track Your Order
              </a>
              <button 
                onClick={() => navigate('/')} 
                className="block w-full py-3 border border-gray-300 text-modern-black font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-brand-black mb-4">Checkout</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input 
                name="name" 
                value={form.name} 
                onChange={onChange} 
                disabled={mpesaWaiting}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-red disabled:bg-gray-100" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
              <input 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={onChange} 
                disabled={mpesaWaiting}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-red disabled:bg-gray-100" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
              <input 
                name="phone" 
                value={form.phone} 
                onChange={onChange} 
                disabled={mpesaWaiting}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-red disabled:bg-gray-100" 
                placeholder="e.g., 0712 345 678" 
              />
              {provider === 'mpesa' && (
                <p className="text-xs text-gray-500 mt-1">M-Pesa payment will be sent to this number</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address *</label>
              <textarea 
                name="address" 
                value={form.address} 
                onChange={onChange} 
                rows="4" 
                disabled={mpesaWaiting}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-red disabled:bg-gray-100" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Method</label>
              <div className="flex gap-3">
                <label className={`px-4 py-3 border rounded-lg cursor-pointer flex-1 ${provider === 'mpesa' ? 'border-brand-red bg-red-50' : ''} ${mpesaWaiting ? 'opacity-50 pointer-events-none' : ''}`}>
                  <input 
                    type="radio" 
                    name="provider" 
                    value="mpesa" 
                    className="mr-2" 
                    checked={provider === 'mpesa'} 
                    onChange={() => setProvider('mpesa')} 
                    disabled={mpesaWaiting}
                  />
                  <span className="font-medium">M-Pesa (Kenya)</span>
                </label>
                <label className={`px-4 py-3 border rounded-lg cursor-pointer flex-1 ${provider === 'stripe' ? 'border-brand-red bg-red-50' : ''} ${mpesaWaiting ? 'opacity-50 pointer-events-none' : ''}`}>
                  <input 
                    type="radio" 
                    name="provider" 
                    value="stripe" 
                    className="mr-2" 
                    checked={provider === 'stripe'} 
                    onChange={() => setProvider('stripe')} 
                    disabled={mpesaWaiting}
                  />
                  <span className="font-medium">Card (Stripe)</span>
                </label>
              </div>
            </div>

            {message && !orderId && (
              <div className={`p-4 rounded-lg flex items-start gap-2 ${message.includes('check your phone') || message.includes('successful') ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
                {message.includes('check your phone') && (
                  <svg className="w-5 h-5 animate-spin flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span className="text-sm">{message}</span>
              </div>
            )}

            <button 
              onClick={placeOrder} 
              disabled={loading || mpesaWaiting} 
              className="w-full py-3 rounded-lg bg-brand-red text-white font-semibold hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading || mpesaWaiting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {mpesaWaiting ? 'Waiting for M-Pesa...' : 'Processing...'}
                </>
              ) : (
                <>
                  {provider === 'mpesa' ? 'Pay with M-Pesa' : 'Place Order'}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="text-xl font-bold text-brand-black mb-4">Order Summary</h3>
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-600">No items in cart.</p>
            ) : (
              items.map((it) => (
                <div key={it.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <div className="font-semibold text-brand-black">{it.name}</div>
                    <div className="text-sm text-gray-600">Qty: {it.qty}</div>
                  </div>
                  <div className="font-semibold">KES {(it.price * it.qty).toLocaleString()}</div>
                </div>
              ))
            )}
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
          </div>

          {/* M-Pesa Instructions */}
          {provider === 'mpesa' && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                M-Pesa Instructions
              </h4>
              <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                <li>Enter your phone number in the field above</li>
                <li>Click "Pay with M-Pesa"</li>
                <li>Check your phone for the M-Pesa prompt</li>
                <li>Enter your M-Pesa PIN to confirm</li>
                <li>Wait for payment confirmation</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}