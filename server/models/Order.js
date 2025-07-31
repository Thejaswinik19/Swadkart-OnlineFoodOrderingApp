const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  phone: String,
  address: String,
  paymentMethod: String,
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Delivered'],
    default: 'Pending',
  },
  paymentInfo: {
    razorpay_payment_id: String,
    razorpay_order_id: String,
    razorpay_signature: String,
  },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
      name: String,
      imageUrl: String,
      price: Number,
      quantity: Number,
      restaurantName: String,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
