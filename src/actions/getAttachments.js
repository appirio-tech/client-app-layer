import { CALL_API, callApi } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const ATTACHMENTS_GET_REQUEST = 'ATTACHMENTS_GET_REQUEST'
export const ATTACHMENTS_GET_SUCCESS = 'ATTACHMENTS_GET_SUCCESS'
export const ATTACHMENTS_GET_FAILURE = 'ATTACHMENTS_GET_FAILURE'


const API_ROOT = process.env.API_URL || 'https://api.topcoder.com'

export function getAttachments({ id, assetType, category }) {
  return {
    [CALL_API]: {
      types    : [ATTACHMENTS_GET_REQUEST, ATTACHMENTS_GET_SUCCESS, ATTACHMENTS_GET_FAILURE],
      endpoint : `${API_ROOT}/v3/attachments?filter=id=${id}&assetType=${assetType}&category=${category}`,
      schema   : Schemas.ATTACHMENT_ARRAY,
      id       : id,
      assetType: assetType,
      category : category
    }
  }
}
