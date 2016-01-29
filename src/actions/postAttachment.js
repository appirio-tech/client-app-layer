import callApi from '../middleware/api'
import Schemas from '../middleware/schemas'

export const POST_ATTACHMENT_REQUEST = 'POST_ATTACHMENT_REQUEST'
export const POST_ATTACHMENT_SUCCESS = 'POST_ATTACHMENT_SUCCESS'
export const POST_ATTACHMENT_FAILURE = 'POST_ATTACHMENT_FAILURE'

export default function postAttachment(attachment) {
  return dispatch => {
    const { id, assetType, category, fileType, fileSize, filePath, fileName } = attachment

    dispatch({
      type: POST_ATTACHMENT_REQUEST
    })

    const options = {
      endpoint: '/v3/attachments',
      method  : 'POST',
      schema  : Schemas.ATTACHMENT,
      data: {
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
        type: POST_ATTACHMENT_SUCCESS,
        attachments: res.entities.attachments
      })

      return res
    }

    const error = res => {
      dispatch({
        type: POST_ATTACHMENT_FAILURE
      })

      return res
    }

    return callApi(options).then(success).catch(error)
  }
}