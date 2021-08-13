const router = require('express').Router()
const user = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const { userValidation, getUserValidation, userIdValidation } = require('../middleware/validation/user.validation')
module.exports = (app) => {
  router.post('/', auth({}), user.createUserController)
  router.get('/', getUserValidation, auth({}), user.getUsersController)
  router.get('/:id', userIdValidation, auth({}), user.getUserController)
  router.delete('/:id', userIdValidation, auth({}), user.deleteUserController)
  app.use('/api/user', router)
}