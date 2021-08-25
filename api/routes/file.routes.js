const router = require('express').Router()
const file = require('../controllers/file.controller')
const auth = require('../middleware/auth')
const { updateObjectValidation, nameObjectValidation, nameAndVersionIdObjectValidation } = require('../middleware/validation/file.validation')
module.exports = (app) => {
  router.post('/upload-file', updateObjectValidation, auth(['admin-client']), file.uploadFilesController)
  router.get('/download-last-version', nameObjectValidation, auth(['admin-client', 'client']), file.downloadFileController)
  router.get('/download-version', nameAndVersionIdObjectValidation, auth(['admin-client', 'client']), file.downloadVersionOfFileController)
  router.get('/version', nameObjectValidation, auth(['admin-client', 'client']), file.getVersioningController)
  router.put('/change-version', auth(['admin-client', 'client']), file.changeVersionController)
  app.use('/api/file', router)
}