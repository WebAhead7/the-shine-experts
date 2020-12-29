const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  businessEmail: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },
  orderType: {
    type: Array,
    required: true,
  },
  tomorrowOrToday: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('order', OrderSchema);
