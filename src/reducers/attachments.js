import { ATTACHMENTS_GET_SUCCESS } from '../actions/getAttachments'
import { ATTACHMENTS_POST_SUCCESS } from '../actions/postAttachment'
import { S3_UPLOAD_PROGRESS } from '../actions/uploadToS3'
import { UPLOAD_FILE_REQUEST, getTempId } from '../actions/uploadFile'

export default function attachments(state = [], action) {

  switch(action.type) {
    case ATTACHMENTS_GET_SUCCESS:
    case UPLOAD_FILE_REQUEST:
    case S3_UPLOAD_PROGRESS:
      // set is image property
      for (let key in action.attachments) {
        if (action.attachments[key].isImage == undefined) {
          action.attachments[key].isImage = false

          if (action.attachments[key].fileType) {
            action.attachments[key].isImage = action.attachments[key].fileType.match('image.*')
          }
        }
      }

      state = Object.assign({}, state, action.attachments);
    break;

    case ATTACHMENTS_POST_SUCCESS:
      // delete temporary attachments that have completed
      for (let key in action.attachments) {
        const tempId = getTempId(action.attachments[key])

        delete state[tempId]
      }

      state = Object.assign({}, state, action.attachments);
    break;
  }

  return state
}

  // if (action.type == 'ATTACHMENT_UPLOAD') {
  //   state.attachments[action.attachment.name] = action.attachment
  // }