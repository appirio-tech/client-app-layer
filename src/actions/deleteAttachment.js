import { callApi } from '../middleware/api'

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

      const encoded = encodeURIComponent(`category=${category}`)

      const options = {
        endpoint    : `/v3/attachments/${fileId}?filter=${encoded}`,
        method      : 'DELETE',
        ignoreResult: true
      }

      const success = res => {
        dispatch({
          type: DELETE_ATTACHMENT_SUCCESS,
          attachment: attachment
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

  return {
    type: DELETE_ATTACHMENT_SUCCESS,
    attachment: attachment
  }
}
