const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
const NodeCache = require('node-cache');
const tokenCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  
    if (token == null) {
      console.error('No token provided');
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // console.log(tokenCache)
  
    if (tokenCache.has(token)) {
      console.error('Token has been invalidated');
      return res.status(403).json({ success: false, message: 'Token has been invalidated' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          console.error('Token expired, please login again');
          return res.status(401).json({ success: false, message: 'Token expired, please login again' });
        }
        console.error('Token is not valid');
        return res.status(403).json({ success: false, message: 'Token is not valid' });
      }
  
      req.user = user;
      next();
    });
  };

const invalidateToken = (token) => {
  tokenCache.set(token, true);
  console.log(`Token invalidated: ${token}`);
};

module.exports = { authenticateToken, invalidateToken };
