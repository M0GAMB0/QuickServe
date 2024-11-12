const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {type: String, required: true},
  phoneNumber: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  location: {type: String},
  deviceType: {type: String, enum: ['android', 'ios'], required: true},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema);