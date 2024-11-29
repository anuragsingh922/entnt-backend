const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config');

module.exports = (req, res, next) => {
  const auth = req.headers["authorization"];
    const token = auth.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};