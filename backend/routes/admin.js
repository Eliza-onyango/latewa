import express from 'express';
import { query } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'latewa-cbo-secret-key-2024';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Setup initial admin user (run once)
router.post('/setup', async (req, res) => {
  try {
    // Check if admin already exists
    const { rows } = await query('SELECT * FROM admin_users WHERE username = $1', ['admin']);
    
    if (rows.length > 0) {
      return res.json({ message: 'Admin user already exists' });
    }

    // Create admin user with hashed password
    const passwordHash = await bcrypt.hash('admin123', 10);
    await query(
      'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
      ['admin', passwordHash]
    );
    
    res.json({ message: 'Admin user created successfully' });
  } catch (err) {
    console.error('Error setting up admin:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin user
    const { rows } = await query('SELECT * FROM admin_users WHERE username = $1', [username]);
    
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, admin.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    await query('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [admin.id]);

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, username: admin.username });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify token endpoint
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Logout endpoint (client-side handles token removal, this is for any server-side cleanup)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Protected routes - require authentication
// Get all donations
router.get('/donations', authenticateToken, async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM donations ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching donations:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contacts
router.get('/contacts', authenticateToken, async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching contacts:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update contact status
router.patch('/contacts/:id', authenticateToken, async (req, res) => {
  const { status } = req.body;
  try {
    const { rows, rowCount } = await query(
      'UPDATE contacts SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (rowCount > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error('Error updating contact status:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/orders/:id', authenticateToken, async (req, res) => {
  const { status } = req.body;
  try {
    const { rows, rowCount } = await query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (rowCount > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    console.error('Error updating order status:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all volunteers
router.get('/volunteers', authenticateToken, async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM volunteers ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching volunteers:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add volunteer
router.post('/volunteers', authenticateToken, async (req, res) => {
  const { name, email, phone, area, availability } = req.body;
  const id = 'VOL-' + Date.now();
  try {
    const { rows } = await query(
      'INSERT INTO volunteers (id, name, email, phone, area, availability, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, name, email, phone, area, availability, 'Pending']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error adding volunteer:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update volunteer status
router.patch('/volunteers/:id', authenticateToken, async (req, res) => {
  const { status } = req.body;
  try {
    const { rows, rowCount } = await query(
      'UPDATE volunteers SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (rowCount > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Volunteer not found' });
    }
  } catch (err) {
    console.error('Error updating volunteer status:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all gallery images
router.get('/gallery', authenticateToken, async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM gallery ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching gallery images:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add gallery image
router.post('/gallery', authenticateToken, async (req, res) => {
  const { url, caption } = req.body;
  try {
    const { rows } = await query(
      'INSERT INTO gallery (url, caption) VALUES ($1, $2) RETURNING *',
      [url, caption]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error adding gallery image:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete gallery image
router.delete('/gallery/:id', authenticateToken, async (req, res) => {
  try {
    const { rowCount } = await query('DELETE FROM gallery WHERE id = $1', [req.params.id]);
    if (rowCount > 0) {
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (err) {
    console.error('Error deleting gallery image:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const donationsResult = await query('SELECT COALESCE(SUM(amount), 0) as total FROM donations');
    const ordersResult = await query('SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as revenue FROM orders');
    const volunteersResult = await query("SELECT COUNT(*) as count FROM volunteers WHERE status = 'Active'");
    const contactsResult = await query("SELECT COUNT(*) as count FROM contacts WHERE status = 'New'");
    const pendingOrdersResult = await query("SELECT COUNT(*) as count FROM orders WHERE status = 'Pending'");

    const stats = {
      totalDonations: parseFloat(donationsResult.rows[0].total),
      totalOrders: parseInt(ordersResult.rows[0].count),
      totalVolunteers: parseInt(volunteersResult.rows[0].count),
      totalContacts: parseInt(contactsResult.rows[0].count),
      pendingOrders: parseInt(pendingOrdersResult.rows[0].count),
      totalRevenue: parseFloat(ordersResult.rows[0].revenue),
    };
    res.json(stats);
  } catch (err) {
    console.error('Error fetching dashboard stats:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
