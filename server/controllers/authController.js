// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword, phoneNumber });

        // --- SEND WELCOME EMAIL ---
        try {
            await sendEmail({
                email: user.email,
                subject: 'Welcome to Apsara Cafe! ☕',
                message: `<h1>Hi ${user.name},</h1><p>Thank you for joining Apsara Cafe. You can now place your drive-through orders online!</p>`,
            });
        } catch (emailError) {
            console.error('Email could not be sent:', emailError);
            // Don't block the registration if email fails. Just log it.
        }
        // --- END OF EMAIL LOGIC ---

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
exports.getUserProfile = async (req, res) => {
    // req.user is available from the 'protect' middleware
    res.json(req.user);
};