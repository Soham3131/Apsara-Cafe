// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true, default: 1 },
    size: { type: String }, // 'S', 'M', 'L' or null
    price: { type: Number, required: true }, // Price for the item at the time of order
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Order Placed', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled'],
    default: 'Order Placed',
  },
  paymentDetails: {
    paymentId: { type: String },
    status: { type: String, default: 'Pending' },
  },
 customerNote: { type: String }, // <-- ADD THIS: Note from customer
  internalLogs: [{                // <-- ADD THIS: Internal logs for admin
      action: { type: String, required: true }, // e.g., "Status Changed", "Note Added"
      timestamp: { type: Date, default: Date.now },
      notes: { type: String },
      adminUser: { type: String, default: 'System' } // Optional: track which admin did what
  }]
}, { timestamps: true });

OrderSchema.pre('save', function(next) {
    if (this.isNew) {
        this.internalLogs.push({ action: 'Order Placed' });
    }
    next();
});


module.exports = mongoose.model('Order', OrderSchema);