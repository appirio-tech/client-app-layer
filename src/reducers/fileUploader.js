import {
  POST_UPLOAD_URL_REQUEST,
  POST_UPLOAD_URL_SUCCESS,
  POST_UPLOAD_URL_FAILURE
} from '../actions/postUploadUrl'

import { SET_FILE_UPLOADER } from '../actions/setFileUploader'

export default function fileUploader(state, action) {
  switch(action.type) {
    case POST_UPLOAD_URL_REQUEST:
      state.requestingUploadUrl = true
    break;

    case SET_FILE_UPLOADER:
      state = action.fileUploader
    break;

    case POST_UPLOAD_URL_SUCCESS:
    case POST_UPLOAD_URL_FAILURE:
      state.requestingUploadUrl = false
    break;
  }

  return state || {}
}