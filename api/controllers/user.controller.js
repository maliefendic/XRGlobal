const { getAllUsersService, getAllUserService, deleteUserService, createUserService } = require('../services/user.service')
const asyncHandler = require('../middleware/async');


// @desc      Get users
// @route     GET /api/user/get-users
// @access    Private
exports.getUsersController = asyncHandler(async (req, res, next) => {
  let object = await getAllUsersService(req.query)
  res.status(200).json(object);
});

// @desc      Get user
// @route     GET /api/user/:id
// @access    Private
exports.getUserController = asyncHandler(async (req, res, next) => {
  let object = await getAllUserService(req.params)
  res.status(200).json(object);
});

// @desc      Delete user
// @route     Delete /api/user/:id
// @access    Private
exports.deleteUserController = asyncHandler(async (req, res, next) => {
  let object = await deleteUserService(req.params)
  res.status(200).json(object);
});

// @desc      Create user
// @route     POST /api/user
// @access    Private
exports.createUserController = asyncHandler(async (req, res, next) => {
  let object = await createUserService(req.body)
  res.status(200).json(object);
});

