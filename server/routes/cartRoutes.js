const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add item to cart
router.post('/add', async (req, res) => {
  const { userId, item } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [item] });
  } else {
    //const existingItem = cart.items.find(i => i.foodId === item.foodId);
    const existingItem = cart.items.find(i => i.foodId.toString() === item.foodId.toString());

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push(item);
    }
  }

  await cart.save();
  res.json(cart);
});

// Get user's cart
router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { userId: req.params.userId, items: [] });
});

// Update quantity
// Update quantity
router.put('/:userId/update', async (req, res) => {
  const { userId } = req.params;
  const { foodId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      const item = cart.items.find(i => i.foodId.toString() === foodId.toString());

      if (item) {
        item.quantity = quantity;
        await cart.save();
        return res.json(cart);
      } else {
        return res.status(404).json({ error: 'Item not found in cart' });
      }
    }

    res.status(404).json({ error: 'Cart not found' });
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Remove item
router.delete('/:userId/remove/:foodId', async (req, res) => {
  const { userId, foodId } = req.params;
  const cart = await Cart.findOne({ userId });

  if (cart) {
    cart.items = cart.items.filter(i => i.foodId.toString() !== foodId);
    await cart.save();
    return res.json(cart);
  }

  res.status(404).json({ error: 'Cart not found' });
});




module.exports = router;
