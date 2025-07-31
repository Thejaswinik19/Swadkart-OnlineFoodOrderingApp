const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
//const foodRoutes = require('./routes/foodRoutes'); 
const cartRoutes = require('./routes/cartRoutes');
const categoryFoodRoutes = require('./routes/categoryFoodRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
const analyticsRoutes = require('./routes/analyticsRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL, // your React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));

// Routes
app.use('/api', authRoutes);
//app.use('/api/food', foodRoutes);
app.use('/images', express.static('images')); // Assuming 'images' folder is in your root project directory
app.use('/api/cart', cartRoutes);
app.use('/api/category-foods', categoryFoodRoutes);
app.use('/api/orders', orderRoutes);
//const userRoutes = require('./routes/userRoutes');

app.use('/api/users', authRoutes); // << this must be present
app.use('/api/analytics', analyticsRoutes);
app.use("/api/payment", require("./routes/payment"));
//app.use('/uploads', express.static('uploads'));


// Start Server
const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
