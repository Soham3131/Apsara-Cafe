// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, getSalesStats,initiateRefund ,createRazorpayOrder} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/orders/stats
// @desc    Get sales statistics
// @access  Private/Admin
router.get('/stats', protect, admin, getSalesStats);
router.post('/:paymentId/refund', protect, admin, initiateRefund);
// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, createOrder);

// @route   GET /api/orders/myorders
// @desc    Get logged in user's orders
// @access  Private
router.get('/myorders', protect, getMyOrders);

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', protect, admin, getAllOrders);

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/:id/status', protect, admin, updateOrderStatus);

router.post('/create-razorpay-order', protect, createRazorpayOrder);


module.exports = router;