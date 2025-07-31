const express = require('express');
const router = express.Router();
const CategoryFood = require('../models/CategoryFood');

const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);// e.g., 169100123.png
  }
});

const upload = multer({ storage });

// @route GET /api/category-foods
// @desc Fetch filtered food items
router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      category = '',
      veg = '',
      minPrice = 0,
      maxPrice = 1000,
      restaurant = '',
      minRating = 0
    } = req.query;

    const query = {
      name: { $regex: search, $options: 'i' },
      price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
      rating: { $gte: parseFloat(minRating) }
    };

    if (category) query.category = category;
    if (veg === 'true') query.veg = true;
    if (restaurant) query.restaurant = restaurant;

    const foods = await CategoryFood.find(query);
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching foods' });
  }

});
// POST - Add new food
// POST - Add new food
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, veg, restaurant, rating, numReviews } = req.body;

    const imagePath = req.file ? `http://localhost:5000/images/${req.file.filename}` : '';

   const newFood = new CategoryFood({
  name,
  description,
  price,
  category,
  veg,
  restaurant,
  rating,
  numReviews,
  image: imagePath
});


    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to add food item' });
  }
});

// PUT - Update food
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, veg, restaurant, rating, numReviews } = req.body;

const updatedData = {
  name,
  description,
  price,
  category,
  veg,
  restaurant,
  rating,
  numReviews
};


    if (req.file) {
      updatedData.image = `http://localhost:5000/images/${req.file.filename}`;
    }

    const updated = await CategoryFood.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update food item' });
  }
});



// DELETE - Delete food
router.delete('/:id', async (req, res) => {
  try {
    await CategoryFood.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
});



module.exports = router;
