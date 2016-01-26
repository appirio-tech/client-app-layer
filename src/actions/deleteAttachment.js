import { callApi } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const DELETE_ATTACHMENT_REQUEST = 'DELETE_ATTACHMENT_REQUEST'
export const DELETE_ATTACHMENT_SUCCESS = 'DELETE_ATTACHMENT_SUCCESS'
export const DELETE_ATTACHMENT_FAILURE = 'DELETE_ATTACHMENT_FAILURE'

export function deleteAttachment(attachment) {
  const { fileId, category } = attachment

  if (fileId) {
    return dispatch => {
      dispatch({
        type: DELETE_ATTACHMENT_REQUEST
      })

      const options = {
        endpoint: `/v3/attachments/${fileId}?category=${category}`,
        method  : 'DELETE',
        schema  : Schemas.ATTACHMENT_ARRAY
      }

      const success = res => {
        dispatch({
          type: DELETE_ATTACHMENT_SUCCESS,
          attachment: res.result
        })

        return res
      }

      const error = res => {
        dispatch({
          type: DELETE_ATTACHMENT_FAILURE
        })

        return res
      }

      return callApi(options).then(success).catch(error)
    }
  }
  else {
    dispatch({
      type: DELETE_ATTACHMENT_SUCCESS,
      attachment: attachment
    })
  }
}
