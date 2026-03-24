import express from 'express';
import { query } from '../db.js';
import { sendInvolvementEmail } from '../utils/email.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { organization, contactName, email, phone, organizationType, partnershipInterest, message } = req.body;
  const partnerId = 'PTR-' + Math.floor(Math.random() * 1000000);
  
  try {
    await query(
      'INSERT INTO partners (id, organization, contact_name, email, phone, organization_type, partnership_interest, message, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [partnerId, organization, contactName, email, phone, organizationType, partnershipInterest, message, 'Pending']
    );
    
    // Send thank you email
    await sendInvolvementEmail(contactName, email, 'partner');
    
    res.status(200).json({ 
      message: 'Partnership request received successfully',
      partnerId: partnerId 
    });
  } catch (err) {
    console.error('Error saving partner:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
