import express from 'express';
const router = express.Router();
import { query } from '../db.js';
import { sendOrderEmail } from '../utils/email.js';

// Create a new order
router.post('/', async (req, res) => {
  const { name, email, phone, address, items, total, provider, paymentRef } = req.body;
  
  const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
  
  try {
    const { rows } = await query(
      `INSERT INTO orders (id, name, email, phone, address, items, total, provider, payment_ref, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [orderId, name, email, phone, address, JSON.stringify(items), total, provider, paymentRef || null, 'Paid']
    );
    
    // Send order received email
    await sendOrderEmail(rows[0], 'received');
    
    console.log(`New order placed by ${name} (${email}): Order ${orderId}, Total KES ${total} via ${provider}`);
    
    res.status(201).json({ 
      message: 'Order received successfully',
      orderId: orderId,
      order: rows[0]
    });
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Lookup order by ID and email
router.get('/lookup', async (req, res) => {
  const { orderId, email } = req.query;
  
  if (!orderId || !email) {
    return res.status(400).json({ message: 'Order ID and email are required' });
  }
  
  try {
    const { rows } = await query(
      'SELECT * FROM orders WHERE LOWER(id) = LOWER($1) AND LOWER(email) = LOWER($2)',
      [orderId, email]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Order not found. Please check your Order ID and email address.' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Error looking up order:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  
  try {
    const { rows, rowCount } = await query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    
    if (rowCount > 0) {
      const order = rows[0];
      
      // Send email notifications based on status
      if (status === 'Delivering') {
        await sendOrderEmail(order, 'delivery');
      } else if (status === 'Completed') {
        await sendOrderEmail(order, 'completed');
      }
      
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    console.error('Error updating order status:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;