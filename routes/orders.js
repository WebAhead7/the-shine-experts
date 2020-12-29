const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Business = require('../models/Business');
const Order = require('../models/Order');
const User = require('../models/User');

const auth = require('../middleware/auth');

// @route POST api/orders
// @desc Resgister a order
// @access Private
router.post(
  '/',
  auth,
  [
    check('userEmail', 'Please add cutomer email').isEmail(),
    check('businessEmail', 'Please enter a business email').isEmail(),
    check('orderDate', 'Please enter an order date').not().isEmpty(),
    check('orderType', 'Please enter an order type').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userEmail, businessEmail, orderDate, orderType } = req.body;

    try {
      let business = await Business.findOne({ email: businessEmail });
      let user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(400).json({ msg: 'User do not exists' });
      }
      if (!business) {
        return res.status(400).json({ msg: 'Business do not exists' });
      }

      const order = new Order({
        userEmail,
        businessEmail,
        orderDate,
        orderType,
      });

      await order.save();

      user.orders.push(order._id);
      business.orders.push(order._id);
      await user.save();
      await business.save();

      res.json({ msg: 'Order is registered' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
