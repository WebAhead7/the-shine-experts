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
  // phone: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
    default: 'customer',
  },
});

module.exports = mongoose.model('user', UserSchema);
