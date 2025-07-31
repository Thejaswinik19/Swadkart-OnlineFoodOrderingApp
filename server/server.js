const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
// const foodRoutes = require('./routes/foodRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryFoodRoutes = require('./routes/categoryFoodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Adjust as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));

// API Routes
app.use('/api', authRoutes);
// app.use('/api/food', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/category-foods', categoryFoodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/payment', require('./routes/payment'));

// Serve static files (images, uploads, etc.)
app.use('/images', express.static('images'));
// app.use('/uploads', express.static('uploads'));

// Serve React frontend build
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
