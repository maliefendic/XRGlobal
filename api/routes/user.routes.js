const router = require('express').Router()
const user = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const { userValidation } = require('../middleware/validation/user.validation')
module.exports = (app) => {
  router.get('/get-users', auth({}), user.getUserController)
  app.use('/api/user', router)
}