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
<<<<<<< HEAD
  // phone: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
=======
>>>>>>> 0d8893403098e8e83c466b014a6f5a8b4c424bc7
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
