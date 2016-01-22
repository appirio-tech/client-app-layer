import {
  ATTACHMENTS_GET_REQUEST,
  ATTACHMENTS_GET_SUCCESS,
  ATTACHMENTS_GET_FAILURE
} from '../actions/getAttachments'

export default function attachments(state = [], action) {

  switch(action.type) {
    case ATTACHMENTS_GET_SUCCESS:
      state = Object.assign({}, state, action.attachments);
    break;
  }

  return state
}

  // if (action.type == 'ATTACHMENT_UPLOAD') {
  //   state.attachments[action.attachment.name] = action.attachment
  // }