import express from 'express';
import { query } from '../db.js';
import { sendInvolvementEmail } from '../utils/email.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, amount, type, donor_type } = req.body;
  const donationId = 'DON-' + Math.floor(Math.random() * 1000000);
  
  try {
    await query(
      'INSERT INTO donations (id, name, email, amount, type, status, donor_type) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [donationId, name, email, amount, type, 'Completed', donor_type || 'individual']
    );
    
    // Send thank you email
    await sendInvolvementEmail(name, email, 'donor');
    
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
