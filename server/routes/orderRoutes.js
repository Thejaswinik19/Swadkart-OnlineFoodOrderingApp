// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      address,
      paymentMethod,
      items,
      paymentInfo // ✅ receive it here
    } = req.body;

    if (!userId || !name || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing fields or cart is empty' });
    }

    const order = new Order({
      userId,
      name,
      phone,
      address,
      paymentMethod,
      items: items.map(item => ({
        ...item,
        restaurantName: item.restaurant
      })),
      paymentInfo, // ✅ save payment info to DB
      createdAt: new Date()
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ message: 'Order failed' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    res.status(500).json({ message: 'Could not retrieve orders' });
  }
});
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching all orders:', err);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
});

// Update order status (for admin)
router.put('/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();
    res.json({ message: 'Status updated successfully', order });
  } catch (err) {
    console.error('Failed to update status:', err);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});
module.exports = router;
