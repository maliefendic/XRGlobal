const router = require('express').Router()
const auth = require('../controllers/auth.controller')
const { userValidation } = require('../middleware/validation/auth.validation')
module.exports = (app) => {
  router.post('/login', userValidation, auth.login)
  router.post('/register', userValidation, auth.register)
  router.get('/logout', auth.logout)
  app.use('/api/auth', router)
}