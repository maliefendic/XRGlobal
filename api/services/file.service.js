const db = require('../models')
const ErrorResponse = require('../utils/errorResponse');
const { Op } = db.Sequelize

const aws = require('../utils/awsStorage')

async function uploadFilesService(file) {
  const { files, organizationId } = file;
  const orgData = await db.organization.findByPk(organizationId)
  const bucketName = process.env.BUCKET_NAME
  const destinationFolderPrefix = orgData.destinationFolder
  const filesArray = files.data.length ? files.data : [files.data]

  const filesImp = filesArray.map((file) => {
    const gcsName = file.name.replace(/ /g, '-')
    return {
      name: gcsName,
      buffer: file.data,
      url: `https://${bucketName}.s3.eu-central-1.amazonaws.com/${destinationFolderPrefix}/${gcsName}`
    }
  })
  const data = await aws.uploadFiles(filesImp, bucketName, destinationFolderPrefix, true)
  console.log(data)
  let promises = []
  filesImp.forEach(data =>
    promises.push(db.file.create({ organizationId, name: data.name, url: data.url }))
  )
  await Promise.all(promises)
  return "Files upload"

}

async function getVersioningService(name, destinationFolder) {
  const bucketName = process.env.BUCKET_NAME
  const data = await aws.listObjectVersion(bucketName, destinationFolder, name)
  return data
}

async function downloadFileService(name, originFolderPrefix) {
  const bucketName = process.env.BUCKET_NAME
  const data = await aws.downloadPublicFiles(name, bucketName, originFolderPrefix)
  return data
}

async function downloadVersionFileService(name, originFolderPrefix, versionId) {
  const bucketName = process.env.BUCKET_NAME
  const data = await aws.downloadPublicFilesVersion(name, bucketName, originFolderPrefix, versionId)
  return data
}

module.exports = {
  uploadFilesService,
  getVersioningService,
  downloadVersionFileService,
  downloadFileService
}