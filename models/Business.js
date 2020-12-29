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
    type: {
      today: {},
      tomorrow: {},
    },
    default: {
      today: {},
      tomorrow: {},
    },
  },
});

module.exports = mongoose.model('business', BusinessSchema);
