import { getTempId } from '../actions/uploadFile'
import Q from 'q'
export { merge } from 'lodash'

export const S3_UPLOAD_REQUEST  = 'S3_UPLOAD_REQUEST'
export const S3_UPLOAD_PROGRESS = 'S3_UPLOAD_PROGRESS'
export const S3_UPLOAD_SUCCESS  = 'S3_UPLOAD_SUCCESS'
export const S3_UPLOAD_FAILURE  = 'S3_UPLOAD_FAILURE'

export default function uploadToS3(attachment) {
  return dispatch => {
    const { data, preSignedURL, fileType, tempId } = attachment

    let deferred = Q.defer()
    let putFileToS3 = new XMLHttpRequest()

    dispatch({ type: S3_UPLOAD_REQUEST })

    putFileToS3.onload = res => {
      if (res.target.status == 200) {
        dispatch({ type: S3_UPLOAD_SUCCESS })

        deferred.resolve(res)
      }
      else {
        const error = new Error(S3_UPLOAD_FAILURE)

        dispatch({ type: S3_UPLOAD_FAILURE })

        deferred.reject(res)
      }
    }

    putFileToS3.onprogress = res => {
      // TODO, move this out
      const { lengthComputable, loaded, total } = res
      const tempId = getTempId(attachment)
      const progress = Math.round(lengthComputable ? loaded * 100 / total : 0)

      dispatch({
        type: S3_UPLOAD_PROGRESS,
        attachments: {
          [tempId]: merge({}, attachment, { progress })
        }
      })
    }

    putFileToS3.open('PUT', preSignedURL, true)
    putFileToS3.setRequestHeader('Content-Type', fileType)
    putFileToS3.send(data)

    return deferred.promise
  }
}