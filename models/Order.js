const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  cutomerEmail: {
    type: String,
    required: true,
  },
  businessEmail: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  orderType: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('order', OrderSchema);
