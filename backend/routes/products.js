import express from 'express';
import { query } from '../db.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;
  const category = req.query.category;
  const search = req.query.search;
  const minPrice = parseInt(req.query.minPrice) || 0;
  const maxPrice = parseInt(req.query.maxPrice) || 999999;

  try {
    let whereConditions = [];
    let filterParams = [];
    let paramIndex = 1;

    // Add filters to query
    if (category && category !== 'all') {
      whereConditions.push(`category = $${paramIndex}`);
      filterParams.push(category);
      paramIndex++;
    }

    if (search) {
      whereConditions.push(`(name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`);
      filterParams.push(`%${search}%`);
      paramIndex++;
    }

    // Always add price filter
    whereConditions.push(`price >= $${paramIndex} AND price <= $${paramIndex + 1}`);
    filterParams.push(minPrice);
    filterParams.push(maxPrice);
    paramIndex += 2;

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count with filters
    const countQuery = `SELECT COUNT(*) FROM products ${whereClause}`;
    const { rows: countRows } = await query(countQuery, filterParams);
    const total = parseInt(countRows[0].count);

    // Build full parameter list for products query (filters + pagination)
    const allParams = [...filterParams, limit, offset];

    // Get paginated products with filters
    const productsQuery = `SELECT * FROM products ${whereClause} ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    const { rows: products } = await query(productsQuery, allParams);

    res.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
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

router.patch('/:id', async (req, res) => {
  const { name, description, price, image, category, in_stock, stock_quantity, discount_percentage, original_price } = req.body;
  
  try {
    // Build update query dynamically based on what fields are provided
    const updates = [];
    const params = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex}`);
      params.push(name);
      paramIndex++;
    }

    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      params.push(description);
      paramIndex++;
    }

    if (price !== undefined) {
      updates.push(`price = $${paramIndex}`);
      params.push(price);
      paramIndex++;
    }

    if (image !== undefined) {
      updates.push(`image = $${paramIndex}`);
      params.push(image);
      paramIndex++;
    }

    if (category !== undefined) {
      updates.push(`category = $${paramIndex}`);
      params.push(category);
      paramIndex++;
    }

    if (in_stock !== undefined) {
      updates.push(`in_stock = $${paramIndex}`);
      params.push(in_stock);
      paramIndex++;
    }

    if (stock_quantity !== undefined) {
      updates.push(`stock_quantity = $${paramIndex}`);
      params.push(stock_quantity);
      paramIndex++;
    }

    if (discount_percentage !== undefined) {
      updates.push(`discount_percentage = $${paramIndex}`);
      params.push(discount_percentage);
      paramIndex++;
    }

    if (original_price !== undefined) {
      updates.push(`original_price = $${paramIndex}`);
      params.push(original_price);
      paramIndex++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    // Add product ID to params
    params.push(req.params.id);
    
    const updateQuery = `UPDATE products SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
    const { rows } = await query(updateQuery, params);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error('Error updating product:', err.message);
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
