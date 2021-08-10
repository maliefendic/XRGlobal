const router = require('express').Router()
const auth = require('../controllers/user.controller')
const { userValidation } = require('../middleware/validation/user.validation')
module.exports = (app) => {
  router.post('/get-users', userValidation, auth.getUsersController)
  app.use('/api/user', router)
}