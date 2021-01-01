const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  orders: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model('user', UserSchema);
