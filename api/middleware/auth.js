const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../models');


module.exports = function authRoles(role) {
  return async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(' ')[1];
    }
    // Make sure token exists
    if (!token) { return next(new ErrorResponse('Not authorized to access this route', 401)); }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!role.includes(decoded.role)) throw new Error()
      req.user = await db.user.findOne({ where: { id: decoded.id, email: decoded.email, organizationId: decoded.organizationId } });
      if (!req.user) throw new Error()
      req.organizationId = req.user.organizationId
      next();
    } catch (err) {
      console.log(err)
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
  }
}
