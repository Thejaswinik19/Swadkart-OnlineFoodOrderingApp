const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// @route POST /api/signup
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ msg: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error.' });
  }
});

// ✅ @route POST /api/signin
const jwt = require('jsonwebtoken');
const JWT_SECRET = '0aa87d8bc3a4f731693d1303c925cb80a86e14234544c2ce839f6f0b8329fe1e3861bd82b2c66f1f90830d2cb036c8eac16e44b289f36974c4465da9bdc01cf4'; // Move to .env in production

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: 'Please enter all fields.' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid credentials.' });

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
  msg: 'Sign in successful!',
  token,
  user: { 
    _id: user._id,      // <-- add this
    name: user.name, 
    email: user.email 
  }
});
  } catch (err) {
    res.status(500).json({ msg: 'Server error.' });
  }
});
// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch users' });
  }
});
// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete user' });
  }
});


module.exports = router;
