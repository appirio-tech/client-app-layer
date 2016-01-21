import * as actions from '../actions/attachments'

export default function fileUploader(state, action) {
  if (action.type == actions.UPLOAD_URL_POST_REQUEST) {
    state.requestingUploadUrl = true
  }

  return state || {}
}