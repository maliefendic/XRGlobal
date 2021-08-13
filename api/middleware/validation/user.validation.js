const Joi = require('joi')
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../async');
const createFirmSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).error(new ErrorResponse('Wrong credential', 401)),
  password: Joi.string().min(6).required().error(new ErrorResponse('Wrong credential', 401)),
  lastName: Joi.string().allow('').optional(),
  firstName: Joi.string().allow('').optional(),
  role: Joi.number().allow('').optional()
})

const createUserIDScheme = Joi.object({
  id: Joi.number().required().error(new ErrorResponse('Wrong id', 401))
})
const getUserScheme = Joi.object({
  pageSize: Joi.number().optional(),
  page: Joi.number().optional(),
  orderBy: Joi.string().optional(),
  orderType: Joi.string().optional(),
  search: Joi.string().optional(),
  select: Joi.string().optional()
})


const userValidation = asyncHandler(async (req, res, next) => {
  const newParams = await createFirmSchema.validateAsync(req.body)
  req.params = newParams
  next()
})
const userIdValidation = asyncHandler(async (req, res, next) => {
  const newParams = await createUserIDScheme.validateAsync(req.params)
  req.params = newParams
  next()
})

const getUserValidation = asyncHandler(async (req, res, next) => {
  const newQuery = await getUserScheme.validateAsync(req.query)
  req.query = newQuery
  next()
})


module.exports = {
  userValidation,
  userIdValidation,
  getUserValidation
}