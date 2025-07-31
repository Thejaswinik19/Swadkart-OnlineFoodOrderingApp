// backend/routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/create', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // in paise
    currency: 'INR',
    receipt: 'order_rcptid_' + Math.floor(Math.random() * 1000),
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send('Payment initiation failed');
  }
});

module.exports = router;
