
// const Order = require('../models/Order');
// const Counter = require('../models/Counter');
// const Razorpay = require('razorpay');

// // Helper function to get the next sequence number for short Order IDs
// async function getNextSequenceValue(sequenceName){
//     const sequenceDocument = await Counter.findByIdAndUpdate(sequenceName,
//         {$inc:{seq:1}},
//         {new:true, upsert:true }
//     );
//     return sequenceDocument.seq;
// }

// // Create a new order
// exports.createOrder = async (req, res) => {
//   const { orderItems, totalAmount, paymentDetails, customerNote } = req.body;

//   if (orderItems && orderItems.length === 0) {
//     return res.status(400).json({ message: 'No order items' });
//   }

//   try {
//     const order = new Order({
//       orderNumber: await getNextSequenceValue("orderId"),
//       user: req.user._id,
//       items: orderItems,
//       totalAmount,
//       paymentDetails,
//       customerNote
//     });

//     const createdOrder = await order.save();
//     res.status(201).json(createdOrder);
//   } catch (error) {
//     res.status(500).json({ message: `Server Error: ${error.message}` });
//   }
// };

// // Get user's orders
// exports.getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id }).populate('items.menuItem', 'name imageUrl');
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Get all orders (Admin)
// exports.getAllOrders = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;
//     let query = {};
//     if (startDate && endDate) {
//       query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }
//     const orders = await Order.find(query).populate('user', 'name email phoneNumber').populate('items.menuItem', 'name') .sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Update order status (Admin)
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     const oldStatus = order.status;
//     const newStatus = req.body.status;
//     order.status = newStatus;
    
//     // Add a log for the status change
//     order.internalLogs.push({ action: 'Status Changed', notes: `From '${oldStatus}' to '${newStatus}'` });

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// // Get sales statistics (Admin)
// // Replace the existing getSalesStats function in orderController.js

// exports.getSalesStats = async (req, res) => {
//     const { startDate, endDate } = req.query;

//     // Build the primary date matching logic for the aggregation pipeline
//     // This will filter orders to be within the selected date range
//     const matchStage = {};
//     if (startDate && endDate) {
//         matchStage.createdAt = {
//             $gte: new Date(startDate),
//             $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)) // Include the entire end day
//         };
//     }

//     try {
//         // Aggregation to get sales grouped by day for the chart
//         const dailyStats = await Order.aggregate([
//             { $match: matchStage },
//             {
//                 $project: {
//                     date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//                     totalAmount: '$totalAmount',
//                 },
//             },
//             {
//                 $group: {
//                     _id: '$date',
//                     dailySales: { $sum: '$totalAmount' },
//                 },
//             },
//             { $sort: { '_id': 1 } },
//         ]);

//         // Aggregation for total revenue and order count in the selected period
//         const totalStats = await Order.aggregate([
//             { $match: matchStage },
//             {
//                 $group: {
//                     _id: null,
//                     totalRevenue: { $sum: '$totalAmount' },
//                     totalOrders: { $sum: 1 }
//                 }
//             }
//         ]);
        
//         res.json({
//             totalRevenue: totalStats[0]?.totalRevenue || 0,
//             totalOrders: totalStats[0]?.totalOrders || 0,
//             dailyStats: dailyStats
//         });
//     } catch (err) {
//         console.error("Error fetching sales stats:", err);
//         res.status(500).json(err);
//     }
// };

// // Create a Razorpay order ID
// exports.createRazorpayOrder = async (req, res) => {
//     try {
//         const instance = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET,
//         });

//         const options = {
//             amount: req.body.amount,
//             currency: "INR",
//             receipt: `receipt_order_${new Date().getTime()}`,
//         };
//         const order = await instance.orders.create(options);
//         if (!order) return res.status(500).send("Razorpay order creation failed");
//         res.json(order);
//     } catch (error) {
//         console.error("RAZORPAY ORDER CREATION ERROR:", error); 
//         res.status(500).send(error);
//     }
// };
// // PASTE THIS ENTIRE FUNCTION INTO orderController.js
// // This is the final, correct version of the function.

// exports.initiateRefund = async (req, res) => {
//     try {
//         // This uses the correct 'key' and 'secret' names
//         const instance = new Razorpay({
//             key: process.env.RAZORPAY_KEY_ID,
//             secret: process.env.RAZORPAY_KEY_SECRET
//         });

//         const { paymentId } = req.params;
//         const { amount, notes } = req.body;

//         const order = await Order.findOne({ 'paymentDetails.paymentId': paymentId });
//         if (!order) {
//             return res.status(404).json({ message: "Order not found for this payment ID." });
//         }

//         const amountToRefund = amount ? amount * 100 : order.totalAmount * 100;

//         const refund = await instance.payments.refund(paymentId, {
//             amount: amountToRefund,
//             speed: 'normal',
//             notes: {
//                 reason: notes || "Admin initiated refund"
//             }
//         });

//         order.status = 'Cancelled';
//         order.internalLogs.push({ action: 'Refund Processed', notes: `Refund of ₹${(amountToRefund / 100).toFixed(2)}. Reason: ${notes}` });
//         await order.save();
        
//         res.json({ success: true, order });
//     } catch (error) {
//         console.error("!!! REFUND CRASHED !!!:", error);
//         res.status(500).json({ success: false, message: error.error ? error.error.description : "Refund failed. Check backend logs." });
//     }
// };

// // Add this new function to handle adding internal logs
// exports.addInternalLog = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         order.internalLogs.push({
//             action: 'Note Added',
//             notes: req.body.note,
//             adminUser: req.user.name // Assumes you want to log which admin added the note
//         });
//         await order.save();
//         res.json(order);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to add log' });
//     }
// };

const Order = require('../models/Order');
const Counter = require('../models/Counter');
const Razorpay = require('razorpay');

// Helper function to get the next sequence number for short Order IDs
async function getNextSequenceValue(sequenceName){
    const sequenceDocument = await Counter.findByIdAndUpdate(sequenceName,
        {$inc:{seq:1}},
        {new:true, upsert:true }
    );
    return sequenceDocument.seq;
}

// Create a new order
exports.createOrder = async (req, res) => {
  const { orderItems, totalAmount, paymentDetails, customerNote } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    const order = new Order({
      orderNumber: await getNextSequenceValue("orderId"),
      user: req.user._id,
      items: orderItems,
      totalAmount,
      paymentDetails,
      customerNote
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// Get user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.menuItem', 'name imageUrl');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = {};
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const orders = await Order.find(query).populate('user', 'name email phoneNumber').populate('items.menuItem', 'name') .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const oldStatus = order.status;
    const newStatus = req.body.status;
    order.status = newStatus;
    
    // Add a log for the status change
    order.internalLogs.push({ action: 'Status Changed', notes: `From '${oldStatus}' to '${newStatus}'` });

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// In orderController.js
exports.getSalesStats = async (req, res) => {
    const { startDate, endDate } = req.query;
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    try {
        // --- Calculate Quick Stats ---
        const todayStats = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfToday } } },
            { $group: { _id: null, revenue: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
        ]);
        const monthStats = await Order.aggregate([
            { $match: { createdAt: { $gte: startOfMonth } } },
            { $group: { _id: null, revenue: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
        ]);

        // --- Calculate Stats for Custom Date Range (for chart and main cards) ---
        const matchStage = {};
        if (startDate && endDate) {
            matchStage.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
            };
        }

        const dailyStats = await Order.aggregate([
            { $match: matchStage },
            { $project: { date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, totalAmount: '$totalAmount' } },
            { $group: { _id: '$date', dailySales: { $sum: '$totalAmount' } } },
            { $sort: { '_id': 1 } },
        ]);

        const totalStatsInPeriod = await Order.aggregate([
            { $match: matchStage },
            { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' }, totalOrders: { $sum: 1 } } }
        ]);
        
        res.json({
            // Add the new quick stats
            todayRevenue: todayStats[0]?.revenue || 0,
            todayOrders: todayStats[0]?.count || 0,
            thisMonthRevenue: monthStats[0]?.revenue || 0,
            thisMonthOrders: monthStats[0]?.count || 0,
            // Stats for the selected period
            totalRevenue: totalStatsInPeriod[0]?.totalRevenue || 0,
            totalOrders: totalStatsInPeriod[0]?.totalOrders || 0,
            // Chart data
            periodStats: dailyStats
        });
    } catch (err) {
        console.error("Error fetching sales stats:", err);
        res.status(500).json({ message: "Failed to fetch sales stats", error: err.message });
    }
};
// Create a Razorpay order ID
exports.createRazorpayOrder = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: req.body.amount,
            currency: "INR",
            receipt: `receipt_order_${new Date().getTime()}`,
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Razorpay order creation failed");
        res.json(order);
    } catch (error) {
        console.error("RAZORPAY ORDER CREATION ERROR:", error); 
        res.status(500).send(error);
    }
};
// PASTE THIS ENTIRE FUNCTION INTO orderController.js
// This is the final, correct version of the function.

exports.initiateRefund = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const { paymentId } = req.params;
        const { amount, notes } = req.body;

        const order = await Order.findOne({ 'paymentDetails.paymentId': paymentId });
        if (!order) {
            return res.status(404).json({ message: "Order not found for this payment ID." });
        }

        const amountToRefund = amount ? amount * 100 : order.totalAmount * 100;

        const refund = await instance.payments.refund(paymentId, { amount: amountToRefund });

        order.status = 'Cancelled';
        order.internalLogs.push({ action: 'Refund Processed', notes: `Refund of ₹${(amountToRefund / 100).toFixed(2)}. Reason: ${notes}` });
        
        await order.save();
        
        // --- THIS IS THE FIX ---
        // After saving, we re-populate the user and item details before sending back
        await order.populate('user', 'name email phoneNumber');
        await order.populate('items.menuItem', 'name');
        
        res.json({ success: true, order });
    } catch (error) {
        console.error("!!! REFUND CRASHED !!!:", error);
        res.status(500).json({ success: false, message: "Refund failed. Check backend logs." });
    }
};
// Add this new function to handle adding internal logs
exports.addInternalLog = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.internalLogs.push({
            action: 'Note Added',
            notes: req.body.note,
            adminUser: req.user.name // Assumes you want to log which admin added the note
        });
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add log' });
    }
};