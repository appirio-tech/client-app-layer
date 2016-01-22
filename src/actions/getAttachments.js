import { callApi } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const ATTACHMENTS_GET_REQUEST = 'ATTACHMENTS_GET_REQUEST'
export const ATTACHMENTS_GET_SUCCESS = 'ATTACHMENTS_GET_SUCCESS'
export const ATTACHMENTS_GET_FAILURE = 'ATTACHMENTS_GET_FAILURE'

const API_ROOT = process.env.API_URL || 'https://api.topcoder.com'

export function getAttachments({ id, assetType, category }) {
  return dispatch => {
    dispatch({
      type: ATTACHMENTS_GET_REQUEST
    })

    const options = {
      endpoint: `/v3/attachments?filter=id=${id}&assetType=${assetType}&category=${category}`,
      method  : 'GET',
      schema  : Schemas.ATTACHMENT_ARRAY
    }

    const success = res => {
      dispatch({
        type: ATTACHMENTS_GET_SUCCESS,
        attachments: res.entities.attachments
      })

      return res
    }

    const error = res => {
      dispatch({
        type: ATTACHMENTS_GET_FAILURE
      })

      return res
    }

    return callApi(options).then(success).catch(error)
  }
}
