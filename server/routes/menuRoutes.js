// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require("../utils/Cloudinary")
// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', getMenuItems);

// @route   POST /api/menu
// @desc    Add a new menu item
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), addMenuItem);

// @route   PUT /api/menu/:id
// @desc    Update a menu item
// @access  Private/Admin
router.put('/:id', protect, admin, upload.single('image'), updateMenuItem);

// @route   DELETE /api/menu/:id
// @desc    Delete a menu item
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteMenuItem);

module.exports = router;