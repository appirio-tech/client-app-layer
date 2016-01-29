import callApi from '../middleware/api'
import Schemas from '../middleware/schemas'

export const POST_UPLOAD_URL_REQUEST = 'POST_UPLOAD_URL_REQUEST'
export const POST_UPLOAD_URL_SUCCESS = 'POST_UPLOAD_URL_SUCCESS'
export const POST_UPLOAD_URL_FAILURE = 'POST_UPLOAD_URL_FAILURE'

export default function postUploadUrl(attachment) {
  return dispatch => {
    const { id, assetType, category, fileName, fileType } = attachment

    dispatch({
      type: POST_UPLOAD_URL_REQUEST
    })

    const options = {
      endpoint: '/v3/attachments/uploadurl',
      method  : 'POST',
      schema  : Schemas.UPLOAD_URL_ARRAY,
      data: {
        param: {
          id       : id,
          fileName : fileName,
          assetType: assetType,
          fileType : fileType,
          category : category
        }
      }
    }

    const success = res => {
      dispatch({
        type: POST_UPLOAD_URL_SUCCESS
      })

      return res
    }

    const error = res => {
      dispatch({ type: POST_UPLOAD_URL_FAILURE })

      return res
    }

    return callApi(options).then(success).catch(error)
  }
}