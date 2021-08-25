const Joi = require('joi')
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../async');
const updateObjectVersionSchema = Joi.object({
  version: Joi.string().required().error(new ErrorResponse('You need provide version', 401)),
})
const updateObjectSchema = Joi.object({
  data: Joi.object().required().error(new ErrorResponse('Add data for update', 401)),
}).required().error(new ErrorResponse('Add data for update', 401))

const nameObjectSchema = Joi.object({
  name: Joi.string().required().error(new ErrorResponse('You need provide name of object', 401)),
})

const versionidAndNameObjectSchema = Joi.object({
  versionId: Joi.string().required().error(new ErrorResponse('You need provide versionId of object', 401)),
  name: Joi.string().required().error(new ErrorResponse('You need provide name of object', 401)),
})

const updateObjectValidation = asyncHandler(async (req, res, next) => {
  await updateObjectVersionSchema.validateAsync(req.body)
  await updateObjectSchema.validateAsync(req.files)
  next()
})

const nameObjectValidation = asyncHandler(async (req, res, next) => {
  await nameObjectSchema.validateAsync(req.query)
  next()
})
const nameAndVersionIdObjectValidation = asyncHandler(async (req, res, next) => {
  await versionidAndNameObjectSchema.validateAsync(req.query)
  //await versionIdObjectSchema.validateAsync(req.query)
  next()
})

module.exports = {
  updateObjectValidation,
  nameObjectValidation,
  nameAndVersionIdObjectValidation
}