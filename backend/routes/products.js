import express from 'express';
import { query } from '../db.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name, description, price, image, category } = req.body;
  const id = 'art-' + Date.now();
  
  try {
    const { rows } = await query(
      'INSERT INTO products (id, name, description, price, image, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, name, description, price, image, category]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await query('DELETE FROM products WHERE id = $1', [req.params.id]);
    if (rowCount > 0) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
