import axios from 'axios'
import postUploadUrl from './postUploadUrl'
import postAttachment from './postAttachment'

export const S3_UPLOAD_REQUEST  = 'S3_UPLOAD_REQUEST'
export const S3_UPLOAD_PROGRESS = 'S3_UPLOAD_PROGRESS'
export const S3_UPLOAD_SUCCESS  = 'S3_UPLOAD_SUCCESS'
export const S3_UPLOAD_FAILURE  = 'S3_UPLOAD_FAILURE'

export function uploadToS3({ id, assetType, category, file }) {
  return dispatch => {
    const { name, type } = file

    const success = res => { // created upload url
      const { filePath } = res.result

      dispatch({
        type: S3_UPLOAD_REQUEST
      })

      const config = {
        url   : res.result.preSignedURL,
        method: 'PUT',
        body  : file,
        headers: {
          'Content-Type': file.type
        }
      }

      const success = res => { // uploaded to S3
        dispatch({
          type: S3_UPLOAD_SUCCESS
        })

        postAttachment({ id, assetType, category, file, filePath})(dispatch).then.catch
      }

      const error = res => {
        dispatch({
          type: S3_UPLOAD_FAILURE
        })
      }

      axios(config).then(success).catch(error)

      return res
    }

    postUploadUrl({ id, assetType, category, name, type })(dispatch).then(success)
  }
}