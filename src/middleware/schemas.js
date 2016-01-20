import { Schema, arrayOf } from 'normalizr'

const profileSchema = new Schema('profiles', {
  idAttribute: 'userId'
})

const projectSchema = new Schema('projects')
const stepSchema = new Schema('steps')

export const Schemas = {
  PROFILE: profileSchema,
  PROJECT: projectSchema,
  STEP: stepSchema,
  STEP_ARRAY: arrayOf(stepSchema)
}