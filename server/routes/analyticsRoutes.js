// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
//const Food = require('../models/Food');
const CategoryFood = require('../models/CategoryFood'); // ✅ Import to count unique restaurants

// GET /api/analytics/summary
router.get('/summary', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: ["$items.price", "$items.quantity"]
            }
          }
        }
      }
    ]);

    const totalUsers = await User.countDocuments();
    const totalFoods = await CategoryFood.countDocuments();

    // ✅ Count unique restaurants from CategoryFood
    const restaurantData = await CategoryFood.distinct("restaurant");
    const totalRestaurants = restaurantData.length;

    res.json({
      totalOrders,
      revenue: revenueData[0]?.total || 0,
      totalUsers,
      totalFoods,
      totalRestaurants // ✅ Include in response
    });

  } catch (err) {
    console.error('Summary fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch analytics summary' });
  }
});

// GET /api/analytics/top-items
router.get('/top-items', async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Failed to get analytics data" });
  }
});
router.get('/top-ordered', async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.foodId",
          totalQuantity: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "categoryfoods", // 🔁 Make sure this matches your MongoDB collection name
          localField: "_id",
          foreignField: "_id",
          as: "food"
        }
      },
      { $unwind: "$food" },
      {
        $replaceRoot: { newRoot: "$food" }
      }
    ]);

    res.json(data);
  } catch (err) {
    console.error('Top ordered fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch top ordered items' });
  }
});

// GET /api/analytics/filters
router.get('/filters', async (req, res) => {
  try {
    const restaurants = await CategoryFood.distinct('restaurant');
    const categories = await CategoryFood.distinct('category');

    res.json({ restaurants, categories });
  } catch (err) {
    console.error('Filter fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch filter options' });
  }
});

module.exports = router;
