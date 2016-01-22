import { callApi } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const UPLOAD_URL_POST_REQUEST = 'UPLOAD_URL_POST_REQUEST'
export const UPLOAD_URL_POST_SUCCESS = 'UPLOAD_URL_POST_SUCCESS'
export const UPLOAD_URL_POST_FAILURE = 'UPLOAD_URL_POST_FAILURE'

export default function postUploadUrl({ id, assetType, category, name, type }) {
  return dispatch => {
    dispatch({
      type: UPLOAD_URL_POST_REQUEST
    })

    const options = {
      endpoint: '/v3/attachments/uploadurl',
      method  : 'POST',
      schema  : Schemas.UPLOAD_URL_ARRAY,
      body: {
        param: {
          id       : id,
          fileName : name,
          assetType: assetType,
          fileType : type,
          category : category
        }
      }
    }

    const success = res => {
      dispatch({
        type: UPLOAD_URL_POST_SUCCESS
      })

      return res
    }

    const error = res => {
      dispatch({
        type: UPLOAD_URL_POST_FAILURE
      })

      return res
    }

    return callApi(options).then(success).catch(error)
  }
}