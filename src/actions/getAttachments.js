import { callApi } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const GET_ATTACHMENTS_REQUEST = 'GET_ATTACHMENTS_REQUEST'
export const GET_ATTACHMENTS_SUCCESS = 'GET_ATTACHMENTS_SUCCESS'
export const GET_ATTACHMENTS_FAILURE = 'GET_ATTACHMENTS_FAILURE'

export function getAttachments({ id, assetType, category }) {
  return dispatch => {
    dispatch({
      type: GET_ATTACHMENTS_REQUEST
    })

    const options = {
      endpoint: `/v3/attachments?filter=id=${id}&assetType=${assetType}&category=${category}`,
      method  : 'GET',
      schema  : Schemas.ATTACHMENT_ARRAY
    }

    const success = res => {
      dispatch({
        type: GET_ATTACHMENTS_SUCCESS,
        attachments: res.entities.attachments
      })

      return res
    }

    const error = res => {
      dispatch({
        type: GET_ATTACHMENTS_FAILURE
      })

      return res
    }

    return callApi(options).then(success).catch(error)
  }
}
