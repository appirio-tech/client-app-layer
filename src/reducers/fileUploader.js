import {
  UPLOAD_URL_POST_REQUEST,
  UPLOAD_URL_POST_SUCCESS,
  UPLOAD_URL_POST_FAILURE
} from '../actions/postUploadUrl'

export default function fileUploader(state, action) {
  switch(action.type) {
    case UPLOAD_URL_POST_REQUEST:
      state.requestingUploadUrl = true
    break;

    case UPLOAD_URL_POST_SUCCESS:
    case UPLOAD_URL_POST_FAILURE:
      state.requestingUploadUrl = false
    break;
  }

  return state || {}
}