const Joi = require('joi')
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../async');
const createFirmSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).error(new ErrorResponse('Wrong credential', 401)),
  password: Joi.string().min(3).required().error(new ErrorResponse('Wrong credential', 401)),
  lastName: Joi.string().allow('').optional(),
  firstName: Joi.string().allow('').optional(),
  roleId: Joi.number().allow('').optional(),
  organizationId: Joi.number().allow('').optional()
})

const userValidation = asyncHandler(async (req, res, next) => {
  const newBody = await createFirmSchema.validateAsync(req.body)
  req.body = newBody
  next()
})

module.exports = {
  userValidation,
}