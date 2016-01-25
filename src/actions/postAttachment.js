import { callApi } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const ATTACHMENTS_POST_REQUEST = 'ATTACHMENTS_POST_REQUEST'
export const ATTACHMENTS_POST_SUCCESS = 'ATTACHMENTS_POST_SUCCESS'
export const ATTACHMENTS_POST_FAILURE = 'ATTACHMENTS_POST_FAILURE'

export default function postAttachment({
  id, assetType, category, fileType, fileSize, filePath, fileName
}) {
  return dispatch => {
    dispatch({
      type: ATTACHMENTS_POST_REQUEST
    })

    const options = {
      endpoint: '/v3/attachments',
      method  : 'POST',
      schema  : Schemas.ATTACHMENT,
      body: {
        param: {
          id       : id,
          fileName : fileName,
          assetType: assetType,
          fileType : fileType,
          filePath : filePath,
          fileSize : fileSize,
          category : category
        }
      }
    }

    const success = res => {
      dispatch({
        type: ATTACHMENTS_POST_SUCCESS,
        attachments: res.entities.attachments
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