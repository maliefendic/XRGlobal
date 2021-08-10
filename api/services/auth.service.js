const db = require('../models')
const ErrorResponse = require('../utils/errorResponse');
const { Op } = db.Sequelize
const { Users } = db

async function loginService(body) {
  const { email, password } = body;

  // Check for user
  const user = await Users.findOne({ where: { email } });

  if (!user) { throw new ErrorResponse('Invalid credentials', 401); }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) { throw ErrorResponse('Invalid credentials', 401); }

  return generateToken(user, 200);
}


async function registerService(body) {
  const { lastName, firstName, email, password, role } = body;
  const user = await db.Users.create({ firstName, lastName, email, password, role })
  return generateToken(user, 200);
}


// Get token from model, create cookie and send response
const generateToken = (user, statusCode) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') { options.secure = true; }
  return { token, options, statusCode };
};


module.exports = {
  loginService,
  registerService
}
