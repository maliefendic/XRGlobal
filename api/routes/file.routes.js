const router = require('express').Router()
const file = require('../controllers/file.controller')
const auth = require('../middleware/auth')
//const { userValidation, getUserValidation, userIdValidation } = require('../middleware/validation/organization.validation')
module.exports = (app) => {
  router.post('/upload-file', auth(['admin-client']), file.uploadFilesController)
  router.get('/download-last-version', auth(['admin-client', 'client']), file.downloadFileController)
  router.get('/download-version', auth(['admin-client', 'client']), file.downloadVersionOfFileController)
  router.get('/versioning', auth(['admin-client', 'client']), file.getVersioningController)
  app.use('/api/file', router)
}