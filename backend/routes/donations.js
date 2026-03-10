import express from 'express';
import { query } from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, amount, type } = req.body;
  const donationId = 'DON-' + Math.floor(Math.random() * 1000000);
  
  try {
    await query(
      'INSERT INTO donations (id, name, email, amount, type, status) VALUES ($1, $2, $3, $4, $5, $6)',
      [donationId, name, email, amount, type, 'Completed']
    );
    
    console.log(`New donation from ${name} (${email}): KES ${amount} for ${type}`);
    res.status(200).json({ 
      message: 'Donation request received successfully',
      donationId: donationId 
    });
  } catch (err) {
    console.error('Error saving donation:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
