import { ATTACHMENTS_GET_SUCCESS } from '../actions/getAttachments'

import { ATTACHMENTS_POST_SUCCESS } from '../actions/postAttachment'

import { S3_UPLOAD_REQUEST, S3_UPLOAD_SUCCESS } from '../actions/uploadFile'

export default function attachments(state = [], action) {

  switch(action.type) {
    case ATTACHMENTS_GET_SUCCESS:
    case ATTACHMENTS_POST_SUCCESS:
    case S3_UPLOAD_REQUEST:
      for (let key in action.attachments) {
        action.attachments[key].isImage = false

        if (action.attachments[key].fileType) {
          action.attachments[key].isImage = action.attachments[key].fileType.match('image.*')
        }
      }

      state = Object.assign({}, state, action.attachments);
    break;

    case S3_UPLOAD_SUCCESS:
      delete state[action.fileName] // temporary attachment object while uploading
    break;
  }

  return state
}

  // if (action.type == 'ATTACHMENT_UPLOAD') {
  //   state.attachments[action.attachment.name] = action.attachment
  // }