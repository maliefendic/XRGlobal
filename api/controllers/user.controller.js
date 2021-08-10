const { loginService, registerService } = require('../services/auth.service')
const asyncHandler = require('../middleware/async');


// @desc      Login user
// @route     GET /api/user/getUsers
// @access    Public
exports.getUserController = asyncHandler(async (req, res, next) => {



  let object = await getUsersService(req.body)
  res.status(200).json(res.advancedResults);
});
