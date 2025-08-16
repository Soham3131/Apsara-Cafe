// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String }, 
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // To distinguish between admin and regular users
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);