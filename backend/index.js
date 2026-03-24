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
import uploadRoutes from './routes/upload.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('Latewa CBO Backend API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
