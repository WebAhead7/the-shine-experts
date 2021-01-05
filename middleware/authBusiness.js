const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, auth denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.business) {
      return res.status(401).json({ msg: 'Not businnes account, auth denied' });
    }

    req.business = decoded.business;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
