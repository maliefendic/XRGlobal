const db = require('../models')
const ErrorResponse = require('../utils/errorResponse');
const { Op } = db.Sequelize

const { USERTYPE } = require('../utils/types')

async function loginService(body, roleId) {
  const { email, password } = body;

   if(roleId==USERTYPE.branch){

    
   }

  // Check for user
  const user = await db.user.findOne({ where: { email } });
  if (!user) { throw new ErrorResponse('Invalid credentials', 401); }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) { throw ErrorResponse('Invalid credentials', 401); }

  return await generateToken(user, 200);
}


async function registerService(body) {
  const { lastName, firstName, email, password, roleId, organizationId } = body;
  const user = await db.user.create({ firstName, lastName, email, password, roleId, organizationId })
  return await generateToken(user, 200);
}


// Get token from model, create cookie and send response
const generateToken = async (user, statusCode) => {
  // Create token
  const token = await user.getSignedJwtToken();

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
