import { callApi } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const ATTACHMENTS_POST_REQUEST = 'ATTACHMENTS_POST_REQUEST'
export const ATTACHMENTS_POST_SUCCESS = 'ATTACHMENTS_POST_SUCCESS'
export const ATTACHMENTS_POST_FAILURE = 'ATTACHMENTS_POST_FAILURE'

export default function postAttachment({ id, assetType, category, file, filePath }) {
  return dispatch => {
    dispatch({
      type: ATTACHMENTS_POST_REQUEST
    })

    const options = {
      endpoint: '/v3/attachments',
      method  : 'POST',
      schema  : Schemas.ATTACHMENT_ARRAY,
      body: {
        param: {
          id       : id,
          fileName : file.name,
          assetType: assetType,
          fileType : file.type,
          filePath : filePath,
          fileSize : file.size,
          category : category
        }
      }
    }

    const success = res => {
      dispatch({
        type: ATTACHMENTS_POST_SUCCESS
      })

      return res
    }

    const error = res => {
      dispatch({
        type: ATTACHMENTS_POST_FAILURE
      })

      return res
    }

    return callApi(options).then(success).catch(error)
  }
}