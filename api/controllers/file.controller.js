const { uploadFilesService, getVersioningService, downloadFileService, downloadVersionFileService, changeVersionService } = require('../services/file.service')
const asyncHandler = require('../middleware/async');
const db = require('../models');

// @desc      Upload files
// @route     Post /api/file/upload
// @access    Private
exports.uploadFilesController = asyncHandler(async (req, res, next) => {
  console.log(req.files.data)
  const data = await uploadFilesService({ files: req.files, organizationId: req.user.organizationId, version: req.body.version })
  res.status(200).json(data);
});


// @desc      Get Versioning files
// @route     Post /api/file/versioning
// @access    Private
exports.getVersioningController = asyncHandler(async (req, res, next) => {
  const dataOrg = await db.organization.findByPk(req.user.organizationId)
  const data = await getVersioningService(req.query.name, dataOrg.destinationFolder)
  res.status(200).json(data);
});


// @desc      Download files
// @route     Get /api/file/download-file
// @access    Private
exports.downloadFileController = asyncHandler(async (req, res, next) => {
  const dataOrg = await db.organization.findByPk(req.user.organizationId)
  const data = await downloadFileService(req.query.name, dataOrg.destinationFolder)
  res.attachment(req.query.name);
  data.pipe(res);
});


// @desc      Download version of file
// @route     Get /api/file/download-version-file
// @access    Private
exports.downloadVersionOfFileController = asyncHandler(async (req, res, next) => {
  const dataOrg = await db.organization.findByPk(req.user.organizationId)
  const data = await downloadVersionFileService(req.query.name, dataOrg.destinationFolder, req.query.versionId)
  res.attachment(req.query.name);
  data.pipe(res);
});


// @desc      Change version of file
// @route     Put /api/file/change-version
// @access    Private
exports.changeVersionController = asyncHandler(async (req, res, next) => {
  const dataOrg = await db.organization.findByPk(req.user.organizationId)
  const data = await changeVersionService(req.body.name, dataOrg.destinationFolder, req.body.versionId, req.body.version)
  res.status(200).json("Version updated");
});
