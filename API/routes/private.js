const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
  
    if (!token) return res.status(401).json("Access denied");
  
    try {
      // Verify token
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  
      req.user = verified;
  
      next();
    } catch(err) {
      // Return error message
      res.status(401).json("invalid token");
    }
  }