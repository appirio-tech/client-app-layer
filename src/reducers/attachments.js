import { GET_ATTACHMENTS_SUCCESS } from '../actions/getAttachments'
import { POST_ATTACHMENT_SUCCESS } from '../actions/postAttachment'
import { DELETE_ATTACHMENT_SUCCESS } from '../actions/deleteAttachment'
import { S3_UPLOAD_PROGRESS } from '../actions/uploadToS3'
import { UPLOAD_FILE_REQUEST, getTempId } from '../actions/uploadFile'

export default function attachments(state = [], action) {

  switch(action.type) {
    case GET_ATTACHMENTS_SUCCESS:
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

    case POST_ATTACHMENT_SUCCESS:
      // delete temporary attachments that have completed
      for (let key in action.attachments) {
        const tempId = getTempId(action.attachments[key])

        delete state[tempId]
      }

      state = Object.assign({}, state, action.attachments);
    break;

    case DELETE_ATTACHMENT_SUCCESS:
      debugger
      const deleteId = action.attachment.fileId || getTempId(action.attachment)

      delete state[deleteId]
    break;
  }

  return state
}

  // if (action.type == 'ATTACHMENT_UPLOAD') {
  //   state.attachments[action.attachment.name] = action.attachment
  // }