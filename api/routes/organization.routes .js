const router = require('express').Router()
const organization = require('../controllers/organization.controller')
const auth = require('../middleware/auth')
const { userValidation, getUserValidation, userIdValidation } = require('../middleware/validation/organization.validation')
module.exports = (app) => {
  router.post('/', auth(['admin']), organization.createOrganizationController)
  router.get('/', auth(['admin']), organization.getOrganizationController)
  router.get('/:id', auth(['admin']), organization.getOrganizationController)
  router.delete('/:id', auth(['admin']), organization.deleteOrganizationController)
  app.use('/api/organization', router)
}