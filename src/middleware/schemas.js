import { Schema, arrayOf } from 'normalizr'

const profileSchema = new Schema('profiles', {
  idAttribute: 'userId'
})

const projectSchema = new Schema('projects')
const stepSchema = new Schema('steps')
const attachmentSchema = new Schema('attachments', {
  idAttribute: 'fileId'
})
const uploadUrlSchema = new Schema('uploadUrls', {
  idAttribute: 'id'
})

export default {
  PROFILE         : profileSchema,
  PROJECT         : projectSchema,
  STEP            : stepSchema,
  STEP_ARRAY      : arrayOf(stepSchema),
  ATTACHMENT      : attachmentSchema,
  ATTACHMENT_ARRAY: arrayOf(attachmentSchema),
  UPLOAD_URL      : uploadUrlSchema,
  UPLOAD_URL_ARRAY: arrayOf(uploadUrlSchema)
}