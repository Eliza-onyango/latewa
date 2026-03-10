import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { query } from '../db.js';

dotenv.config();
const router = express.Router();

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CALLBACK_URL
} = process.env;

// Utility to generate authentication token
const getAccessToken = async () => {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  const response = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return response.data.access_token;
};

// Initiate STK Push
router.post('/stkpush', async (req, res) => {
  const { phone, amount, orderData } = req.body;
  
  // Format phone to 2547XXXXXXXX
  const formattedPhone = phone.startsWith('0') ? '254' + phone.slice(1) : phone;

  // Check if credentials are configured
  if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET || !MPESA_SHORTCODE || !MPESA_PASSKEY) {
    console.log('M-Pesa credentials not configured. Using simulation mode.');
    
    // Simulate successful STK push for development
    const simulatedCheckoutId = 'sim_' + Date.now();
    
    try {
      await query(
        'INSERT INTO payments (checkout_request_id, status, phone, amount, order_data) VALUES ($1, $2, $3, $4, $5)',
        [simulatedCheckoutId, 'pending', formattedPhone, amount, JSON.stringify(orderData)]
      );
      
      // Simulate payment completion after 10 seconds
      setTimeout(async () => {
        try {
          await query(
            'UPDATE payments SET status = $1, mpesa_receipt_number = $2, completed_at = $3 WHERE checkout_request_id = $4 AND status = $5',
            ['completed', 'SIM' + Date.now(), new Date().toISOString(), simulatedCheckoutId, 'pending']
          );
          console.log(`Simulated payment completed for ${simulatedCheckoutId}`);
        } catch (err) {
          console.error('Error updating simulated payment:', err.message);
        }
      }, 10000);
      
      return res.status(200).json({
        CheckoutRequestID: simulatedCheckoutId,
        CustomerMessage: 'Simulated STK push sent. Check your phone.',
        ResponseCode: '0',
        ResponseDescription: 'Success. Request accepted for simulation',
        MerchantRequestID: 'sim_merchant_' + Date.now()
      });
    } catch (err) {
      console.error('Error initiating simulated payment:', err.message);
      return res.status(500).json({ error: 'Failed to initiate simulated payment' });
    }
  }

  try {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

    const stkResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: MPESA_CALLBACK_URL || 'https://your-domain.com/api/mpesa/callback',
        AccountReference: 'Latewa CBO',
        TransactionDesc: 'Payment for order/donation'
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (stkResponse.data.CheckoutRequestID) {
      await query(
        'INSERT INTO payments (checkout_request_id, status, phone, amount, order_data) VALUES ($1, $2, $3, $4, $5)',
        [stkResponse.data.CheckoutRequestID, 'pending', formattedPhone, amount, JSON.stringify(orderData)]
      );
    }

    res.status(200).json(stkResponse.data);
  } catch (error) {
    console.error('M-Pesa STK Push error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to initiate M-Pesa payment', details: error.response?.data || error.message });
  }
});

// Check payment status
router.get('/status/:checkoutRequestId', async (req, res) => {
  const { checkoutRequestId } = req.params;
  
  try {
    const { rows } = await query('SELECT * FROM payments WHERE checkout_request_id = $1', [checkoutRequestId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ status: 'not_found', error: 'Payment request not found' });
    }
    
    const payment = rows[0];
    res.json({
      status: payment.status,
      mpesaReceiptNumber: payment.mpesa_receipt_number,
      amount: payment.amount,
      phone: payment.phone,
      error: payment.error
    });
  } catch (err) {
    console.error('Error fetching payment status:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Callback endpoint for M-Pesa
router.post('/callback', async (req, res) => {
  const { Body } = req.body;
  console.log('M-Pesa Callback Received:', JSON.stringify(Body, null, 2));
  
  if (Body && Body.stkCallback) {
    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback;
    
    try {
      if (ResultCode === 0) {
        // Payment successful
        const mpesaReceiptNumber = CallbackMetadata?.Item?.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
        
        await query(
          'UPDATE payments SET status = $1, mpesa_receipt_number = $2, completed_at = $3 WHERE checkout_request_id = $4',
          ['completed', mpesaReceiptNumber, new Date().toISOString(), CheckoutRequestID]
        );
        
        console.log(`Payment completed for ${CheckoutRequestID}. Receipt: ${mpesaReceiptNumber}`);
      } else {
        // Payment failed
        await query(
          'UPDATE payments SET status = $1, error = $2, failed_at = $3 WHERE checkout_request_id = $4',
          ['failed', ResultDesc, new Date().toISOString(), CheckoutRequestID]
        );
        
        console.log(`Payment failed for ${CheckoutRequestID}. Reason: ${ResultDesc}`);
      }
    } catch (err) {
      console.error('Error processing callback:', err.message);
    }
  }
  
  res.status(200).send('OK');
});

// Query STK Push status (direct query to M-Pesa)
router.post('/query', async (req, res) => {
  const { checkoutRequestId } = req.body;
  
  if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET || !MPESA_SHORTCODE || !MPESA_PASSKEY) {
    try {
      const { rows } = await query('SELECT * FROM payments WHERE checkout_request_id = $1', [checkoutRequestId]);
      return res.json({
        status: rows[0]?.status || 'not_found',
        mpesaReceiptNumber: rows[0]?.mpesa_receipt_number
      });
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  try {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

    const queryResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
      {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.status(200).json(queryResponse.data);
  } catch (error) {
    console.error('M-Pesa Query error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to query payment status' });
  }
});

export default router;