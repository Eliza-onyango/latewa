import express from 'express';
import { query } from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, interest, skills, availability } = req.body;
  const volunteerId = 'VOL-' + Math.floor(Math.random() * 1000000);
  
  try {
    await query(
      'INSERT INTO volunteers (id, name, email, phone, interest, skills, availability, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [volunteerId, name, email, phone, interest, skills, availability, 'Pending']
    );
    
    res.status(200).json({ 
      message: 'Volunteer application received successfully',
      volunteerId: volunteerId 
    });
  } catch (err) {
    console.error('Error saving volunteer:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
