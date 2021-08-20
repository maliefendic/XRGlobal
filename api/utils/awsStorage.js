const awsSdk = require('aws-sdk')
const { S3 } = awsSdk

const storage = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

/**
 * @param { files } array of file objects, each must have a name property and a buffer property
 * @param { bucketName } aws bucket where the file is located
 * @param { destinationFolderPrefix } aws "folder" where the file will be uploaded
 * @param { isPublic } bool public/private files
 * @return { success } array of bool indicating successfully upload
 * @description - Upload files to google cloud storage
 */

const uploadFiles = async (files, bucketName, destinationFolderPrefix, isPublic) => {
  const promises = files.map(
    (file) => new Promise((resolve, reject) => {
      const { name, buffer } = file
      const params = {
        Bucket: bucketName,
        Key: `${destinationFolderPrefix}/${name}`,
        Body: buffer,
        Tagging: 'Version=3',
        Metadata: {
          "metadata1": "value1",
          "metadata2": "value2"
        }
      }
      isPublic && (params.ACL = 'public-read')
      storage.upload(params).promise().then(() => resolve(true)).catch((err) => reject(err))
    })
  )
  const success = await Promise.all(promises)
  console.log(success)
  return success
}

/**
 * @param { files } array of file objects, each must have a name property and must be stored in google cloud bucketName/originFolderPrefix
 * @param { bucketName } aws bucket where the file is located
 * @param { originFolderPrefix } aws "folder" where the file is located
 * @return { buffers } array of buffers which represents downloaded files
 * @description - Download public files from google cloud storage
 */

const downloadPublicFiles = async (name, bucketName, originFolderPrefix) => {
  const params = { Bucket: bucketName, Key: `${originFolderPrefix}/${name}` }
  const fileBuffers = await storage.getObject(params).createReadStream()
  return fileBuffers
}

const downloadPublicFilesVersion = async (name, bucketName, originFolderPrefix, versionId) => {
  const params = { Bucket: bucketName, Key: `${originFolderPrefix}/${name}`, VersionId: versionId }
  const fileBuffers = await storage.getObject(params).createReadStream()
  return fileBuffers
}

const listObjectVersion = async (bucketName, destinationFolderPrefix, name) => {
  let params = {
    Bucket: bucketName,
    Prefix: destinationFolderPrefix + "/" + name,
  };
  let fileBuffers = await storage.listObjectVersions(params).promise()
  return fileBuffers
}

const aws = {}
aws.storage = storage
aws.uploadFiles = uploadFiles
aws.downloadPublicFiles = downloadPublicFiles
aws.listObjectVersion = listObjectVersion
aws.downloadPublicFilesVersion = downloadPublicFilesVersion
module.exports = aws
