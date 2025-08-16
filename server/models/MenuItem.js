// models/MenuItem.js
const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: { // For S, M, L options
    S: { type: Number },
    M: { type: Number },
    L: { type: Number },
  },
  category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);