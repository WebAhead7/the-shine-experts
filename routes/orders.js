const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Business = require('../models/Business');
const Order = require('../models/Order');
const User = require('../models/User');

const auth = require('../middleware/auth');

const carWashingTypes = require('../types/carWashTypes');

// @route POST api/orders
// @desc Resgister a order
// @access Private
router.post(
  '/',
  auth,
  [
    check('businessEmail', 'Please enter a business email').isEmail(),
    check('orderDate', 'Please enter an order date').not().isEmpty(),
    check('orderType', 'Please enter an order type').not().isEmpty(),
    check(
      'tomorrowOrToday',
      'Please enter if the order is today or tomorrow'
    ).isIn(['today', 'tomorrow']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { businessEmail, orderDate, orderType, tomorrowOrToday } = req.body;

    try {
      const business = await Business.findOne({ email: businessEmail });
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({ msg: 'User do not exists' });
      }
      if (!business) {
        return res.status(400).json({ msg: 'Business do not exists' });
      }

      if (business.timeBooked[tomorrowOrToday].indexOf(orderDate) >= 0) {
        return res.status(400).json({ msg: 'This time is booked' });
      }

      business.timeBooked[tomorrowOrToday].push(orderDate);

      const order = new Order({
        userEmail: user.email,
        businessEmail,
        orderDate,
        orderType,
        tomorrowOrToday,
      });

      await order.save();

      user.orders.push(order._id);
      business.orders.push(order._id);
      await user.save();
      await business.save();

      res.json(business);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;