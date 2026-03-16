import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js';
import contactRoutes from './routes/contact.js';
import orderRoutes from './routes/orders.js';
import donationRoutes from './routes/donations.js';
import volunteerRoutes from './routes/volunteers.js';
import partnerRoutes from './routes/partners.js';
import mpesaRoutes from './routes/mpesa.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Latewa CBO Backend API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
