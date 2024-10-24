const jwt = require('jsonwebtoken');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  if (req.path === '/api/templates/search') {
    return next(); // Skip token validation for this route
  }

  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Token payload contains userId and role
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};


// Middleware to authenticate admin
const authenticateAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only' });
  }
  next();
};

module.exports = { authenticateToken, authenticateAdmin };
