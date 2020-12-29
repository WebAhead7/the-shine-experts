const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
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
  timeBooked: {
    today: {
      type: [{ type: String }],
      default: [],
    },
    tomorrow: {
      type: [{ type: String }],
      default: [],
    },
  },
});

module.exports = mongoose.model('business', BusinessSchema);
