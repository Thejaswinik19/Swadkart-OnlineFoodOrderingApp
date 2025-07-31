const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  name: String,
  imageUrl: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  restaurant: String,
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);
