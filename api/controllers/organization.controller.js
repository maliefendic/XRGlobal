const { getOrganizationController, getAllOrganizationService, deleteOrganizationController, createOrganizationController } = require('../services/user.service')
const asyncHandler = require('../middleware/async');


// @desc      Get users
// @route     GET /api/user/get-users
// @access    Private
exports.getOrganizationController = asyncHandler(async (req, res, next) => {
  let object = await getAllOrganizationService(req.query)
  res.status(200).json(object);
});

// @desc      Get user
// @route     GET /api/user/:id
// @access    Private
exports.getOrganizationController = asyncHandler(async (req, res, next) => {
  let object = await getAllOrganizationService(req.params)
  res.status(200).json(object);
});

// @desc      Delete user
// @route     Delete /api/user/:id
// @access    Private
exports.deleteOrganizationController = asyncHandler(async (req, res, next) => {
  let object = await deleteOrganizationService(req.params)
  res.status(200).json(object);
});

// @desc      Create user
// @route     POST /api/user
// @access    Private
exports.createOrganizationController = asyncHandler(async (req, res, next) => {
  let object = await createOrganizationService(req.body)
  res.status(200).json(object);
});

