import express from 'express';
import { query } from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message, interest } = req.body;
  
  try {
    await query(
      'INSERT INTO contacts (name, email, message, interest) VALUES ($1, $2, $3, $4)',
      [name, email, message, interest]
    );
    console.log(`New contact inquiry from ${name} (${email}) about ${interest}: ${message}`);
    res.status(200).json({ message: 'Inquiry received successfully' });
  } catch (err) {
    console.error('Error saving contact inquiry:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
