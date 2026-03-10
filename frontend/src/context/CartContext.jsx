import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { API_URL } from '../config';

/*
CartContext provides global cart state and actions.
- items: [{ id, name, price, image, description, qty }]
- addItem(product, qty = 1)
- removeItem(id)
- increase(id)
- decrease(id)
- clear()
- subtotal, total, itemCount
- simulatePayment(provider, payload): resolves success for now

Future integrations:
- Wire to Stripe and M-Pesa SDKs from here so UI remains unchanged
- Attach authenticated user for Admin modules later
*/

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const cached = localStorage.getItem('latewa_cart_v1');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('latewa_cart_v1', JSON.stringify(items));
    } catch {}
  }, [items]);

  const itemCount = useMemo(() => items.reduce((acc, it) => acc + it.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((acc, it) => acc + it.price * it.qty, 0), [items]);
  const shipping = useMemo(() => (items.length > 0 ? 300 : 0), [items]); // KES 300 flat for demo
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const increase = (id) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const decrease = (id) => setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p)));
  const clear = () => setItems([]);

  // Simulated payment flow; integrate real SDKs later
  const simulatePayment = async (provider, payload) => {
    // provider: 'mpesa' | 'stripe'
    if (provider === 'mpesa') {
      try {
        const response = await fetch(`${API_URL}/mpesa/stkpush`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: payload.phone, amount: payload.amount })
        });
        const data = await response.json();
        if (response.ok) {
          return { success: true, provider, reference: data.CheckoutRequestID };
        } else {
          return { success: false, error: data.error };
        }
      } catch (error) {
        console.error('M-Pesa error:', error);
        return { success: false, error: 'Connection error' };
      }
    }
    // For demo, wait and resolve success
    await new Promise((res) => setTimeout(res, 1200));
    return { success: true, provider, reference: `SIM-${Date.now()}` };
  };

  const value = {
    items,
    addItem,
    removeItem,
    increase,
    decrease,
    clear,
    itemCount,
    subtotal,
    shipping,
    total,
    simulatePayment,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
