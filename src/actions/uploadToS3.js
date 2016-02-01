import Q from 'q'

export const S3_UPLOAD_REQUEST  = 'S3_UPLOAD_REQUEST'
export const S3_UPLOAD_SUCCESS  = 'S3_UPLOAD_SUCCESS'
export const S3_UPLOAD_FAILURE  = 'S3_UPLOAD_FAILURE'

export default function uploadToS3(file, preSignedURL, onprogress) {
  return dispatch => {
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

    putFileToS3.upload.onprogress = onprogress

    putFileToS3.open('PUT', preSignedURL, true)
    putFileToS3.setRequestHeader('Content-Type', file.type)
    putFileToS3.send(file)

    return deferred.promise
  }
}
