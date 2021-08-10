const { loginService, registerService } = require('../services/auth.service')
const asyncHandler = require('../middleware/async');


// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  let object = await loginService(req.body)
  sendTokenResponse(object, res)
});


// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  let object = await registerService(req.body)
  sendTokenResponse(object, res)
});


// @desc      Log user out / clear cookie
// @route     GET /api/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});


// Get token from model, create cookie and send response
const sendTokenResponse = (object, res) => {
  res.status(object.statusCode).cookie('token', object.token, object.options).json({
    success: true,
    token: object.token,
  });
};