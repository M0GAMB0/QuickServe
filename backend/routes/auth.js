const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const rateLimit = require('express-rate-limit');
const verifyToken = require('../middlewares/authMiddleware');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 12;
const JWT_SECRET =
  process.env.JWT_SECRET ||
  '5e884898da28047151d0e56f8dc5e4dff24f3a5b5ab04b2807a01d3f69825f7f';

// Helper function to detect device type
const detectDeviceType = userAgent =>
  /android/i.test(userAgent) ? 'android' : 'ios';

// Rate limiter for signup
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {error: 'Too many signup attempts, please try again later.'},
});

// Signup route
router.post(
  '/signup',
  signupLimiter,
  [
    body('fullName').isLength({min: 3}).trim().escape(),
    body('phoneNumber').isNumeric().isLength({min: 10, max: 10}),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 6}),
    body('location').optional().trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {fullName, phoneNumber, email, password, location} = req.body;
    const deviceType = detectDeviceType(req.headers['user-agent']);

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({email});
      if (existingUser) {
        return res.status(409).json({error: 'User already exists'});
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Create a new user
      const newUser = new User({
        fullName,
        phoneNumber,
        email,
        password: hashedPassword,
        location,
        deviceType,
      });

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({userId: newUser._id}, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({message: 'User created successfully', token});
    } catch (error) {
      console.error('Signup error:', error.message);
      res.status(500).json({error: 'Internal server error'});
    }
  },
);

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({error: 'User not found'});

    res.json(user);
  } catch (error) {
    console.error('Profile error:', error.message);
    res.status(500).json({error: 'Internal server error'});
  }
});

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 6}),
  ],
  async (req, res) => {
    const {email, password} = req.body;

    try {
      const user = await User.findOne({email});
      if (!user) {
        return res.status(404).json({error: 'User not found'});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({error: 'Invalid credentials'});
      }

      // Generate JWT token
      const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '1h'});

      res.json({message: 'Login successful', token});
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({error: 'Internal server error'});
    }
  },
);

module.exports = router;
