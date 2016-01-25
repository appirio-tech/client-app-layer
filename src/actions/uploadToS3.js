import postAttachment from './postAttachment'
import { getTempId } from '../actions/uploadFile'

export const S3_UPLOAD_REQUEST  = 'S3_UPLOAD_REQUEST'
export const S3_UPLOAD_PROGRESS = 'S3_UPLOAD_PROGRESS'
export const S3_UPLOAD_SUCCESS  = 'S3_UPLOAD_SUCCESS'
export const S3_UPLOAD_FAILURE  = 'S3_UPLOAD_FAILURE'

export default function uploadToS3(attachment) {
  return dispatch => {
    const { data, preSignedURL, fileType, tempId } = attachment

    let putFileToS3 = new XMLHttpRequest()

    dispatch({ type: S3_UPLOAD_REQUEST })

    putFileToS3.onload = res => {
      dispatch({ type: S3_UPLOAD_SUCCESS })

      postAttachment(attachment)(dispatch)
    }

    putFileToS3.onerror = res => {
      dispatch({ type: S3_UPLOAD_FAILURE })
    }

    putFileToS3.upload.onprogress = res => {
      const { lengthComputable, loaded, total } = res
      const tempId = getTempId(attachment)

      attachment.progress = Math.round(lengthComputable ? loaded * 100 / total : 0)

      dispatch({
        type: S3_UPLOAD_PROGRESS,
        attachments: {
          [tempId]: attachment
        }
      })
    }

    putFileToS3.open('PUT', preSignedURL, true)
    putFileToS3.setRequestHeader('Content-Type', fileType)
    putFileToS3.send(data)
  }
}