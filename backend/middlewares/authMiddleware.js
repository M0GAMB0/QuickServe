const jwt = require('jsonwebtoken');
const JWT_SECRET =
  process.env.JWT_SECRET ||
  '5e884898da28047151d0e56f8dc5e4dff24f3a5b5ab04b2807a01d3f69825f7f';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({error: 'Access denied'});

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({error: 'Invalid token'});
  }
};

module.exports = verifyToken;
