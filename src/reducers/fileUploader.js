import {
  POST_UPLOAD_URL_REQUEST,
  POST_UPLOAD_URL_SUCCESS,
  POST_UPLOAD_URL_FAILURE
} from '../actions/postUploadUrl'

import {
  GET_ATTACHMENTS_REQUEST,
  GET_ATTACHMENTS_SUCCESS,
  GET_ATTACHMENTS_FAILURE
} from '../actions/getAttachments'

import {
  DELETE_ATTACHMENT_REQUEST,
  DELETE_ATTACHMENT_SUCCESS,
  DELETE_ATTACHMENT_FAILURE
} from '../actions/deleteAttachment'

import { SET_FILE_UPLOADER } from '../actions/setFileUploader'

export default function fileUploader(state = {}, action) {
  switch(action.type) {
    case POST_UPLOAD_URL_REQUEST:
    case GET_ATTACHMENTS_REQUEST:
    case DELETE_ATTACHMENT_REQUEST:
      return merge({}, state, { loading: true })
    break;

    case SET_FILE_UPLOADER:
      return merge({}, state, action.fileUploader)
    break;

    case POST_UPLOAD_URL_SUCCESS:
    case POST_UPLOAD_URL_FAILURE:
    case GET_ATTACHMENTS_SUCCESS:
    case GET_ATTACHMENTS_FAILURE:
    case DELETE_ATTACHMENT_SUCCESS:
    case DELETE_ATTACHMENT_FAILURE:
      return merge({}, state, { loading: false })
    break;

    default:
      return state
  }
}