import { Schema, arrayOf } from 'normalizr'

const profileSchema = new Schema('profiles', {
  idAttribute: 'userId'
})

export const Schemas = {
  PROFILE: profileSchema,
  PROFILE_ARRAY: arrayOf(profileSchema)
}