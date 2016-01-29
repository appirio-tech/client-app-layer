import postUploadUrl from './postUploadUrl'
import uploadToS3 from './uploadToS3'
import postAttachment from './postAttachment'
import { merge } from 'lodash'

export const READ_FILE_REQUEST   = 'READ_FILE_REQUEST'
export const READ_FILE_SUCCESS   = 'READ_FILE_SUCCESS'
export const READ_FILE_FAILURE   = 'READ_FILE_FAILURE'
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST'
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'

export function getTempId({ assetType, category, id, fileName }) {
  return assetType + category + id + fileName
}

export function uploadFile({ id, assetType, category, file }) {
  return dispatch => {
    const { name, type, size, data } = file

    let temporaryAttachment = { // temporary attachment object while uploading
      assetType: assetType,
      category : category,
      fileName : name,
      fileSize : size,
      fileType : type,
      isImage  : type.match('image.*'),
      id       : id,
      progress : 0,
      data     : data
    }

    let tempId = getTempId(temporaryAttachment)

    const postUploadUrlGo = () => {
      const error = res => {
        dispatch({
          type: UPLOAD_FILE_FAILURE,
          attachments: {
            [tempId]: temporaryAttachment
          }
        })

        return res
      }

      postUploadUrl(temporaryAttachment)(dispatch).then(res => {
        const { filePath, preSignedURL } = res.result
        const signedAttachment = merge({}, temporaryAttachment, { filePath, preSignedURL })

        uploadToS3(signedAttachment)(dispatch).then(res => {
          postAttachment(signedAttachment)(dispatch).then(res => {
            if (!res.entities) { // false positive, i.e status: 500
              error()
            }
            else {
              dispatch({ type: UPLOAD_FILE_SUCCESS })
            }

            return res
          }).catch(error)

          return res
        }).catch(error)

        return res
      }).catch(error)
    }

    dispatch({
      type: UPLOAD_FILE_REQUEST,
      attachments: {
        [tempId]: temporaryAttachment
      }
    })

    const readFile = () => {
      let reader = new FileReader()

      dispatch({
        type: READ_FILE_REQUEST,
        attachments: {
          [tempId]: temporaryAttachment
        }
      })

      reader.onload = (e) => {
        temporaryAttachment.preview = e.target.result

        dispatch({
          type: READ_FILE_SUCCESS,
          attachments: {
            [tempId]: temporaryAttachment
          }
        })

        postUploadUrlGo()
      }

      reader.onerror = () => {
        dispatch({
          type: READ_FILE_FAILURE,
          attachments: {
            [tempId]: temporaryAttachment
          }
        })

        postUploadUrlGo()
      }

      reader.readAsDataURL(file)
    }

    if (temporaryAttachment.isImage) {
      readFile()
    }
    else {
      postUploadUrlGo()
    }
  }
}
