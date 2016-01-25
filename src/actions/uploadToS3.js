export const S3_UPLOAD_REQUEST  = 'S3_UPLOAD_REQUEST'
export const S3_UPLOAD_PROGRESS = 'S3_UPLOAD_PROGRESS'
export const S3_UPLOAD_SUCCESS  = 'S3_UPLOAD_SUCCESS'
export const S3_UPLOAD_FAILURE  = 'S3_UPLOAD_FAILURE'

let uploadToS3 = ({ temporaryAttachment, data }) => {
  let putFileToS3 = new XMLHttpRequest()

  dispatch({ type: S3_UPLOAD_REQUEST })

  putFileToS3.onload = res => {
    dispatch({ type: S3_UPLOAD_SUCCESS })

    postAttachment(temporaryAttachment)(dispatch)
  }

  putFileToS3.onerror = res => {
    dispatch({ type: S3_UPLOAD_FAILURE })
  }

  putFileToS3.upload.onprogress = res => {
    dispatch({ type: S3_UPLOAD_PROGRESS })
  }

  putFileToS3.open('PUT', preSignedURL, true)
  putFileToS3.setRequestHeader('Content-Type', type)
  putFileToS3.send(file.data)

  return res
}