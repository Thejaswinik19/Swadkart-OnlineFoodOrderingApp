// models/CategoryFood.js
const mongoose = require('mongoose');

const categoryFoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String, // e.g., "Snacks", "Desserts"
  veg: { type: Boolean, default: true },
  restaurant: String, // e.g., "Domino's", "McDonald's"
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
});

module.exports = mongoose.model('CategoryFood', categoryFoodSchema);
