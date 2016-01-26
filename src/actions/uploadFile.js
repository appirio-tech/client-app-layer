import postUploadUrl from './postUploadUrl'
import uploadToS3 from './uploadToS3'

export const READ_FILE_REQUEST  = 'READ_FILE_REQUEST'
export const READ_FILE_SUCCESS  = 'READ_FILE_SUCCESS'
export const READ_FILE_FAILURE  = 'READ_FILE_FAILURE'
export const UPLOAD_FILE_REQUEST  = 'UPLOAD_FILE_REQUEST'

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

    dispatch({
      type: UPLOAD_FILE_REQUEST,
      attachments: {
        [tempId]: temporaryAttachment
      }
    })

    const postUploadUrlSuccess = res => {
      const { filePath, preSignedURL } = res.result

      temporaryAttachment.filePath     = filePath
      temporaryAttachment.preSignedURL = preSignedURL

      uploadToS3(temporaryAttachment)(dispatch)

      return res
    }

    const postUploadUrlGo = () => {
      const postUploadUrlParams = { id, assetType, category, name, type }

      postUploadUrl(postUploadUrlParams)(dispatch).then(postUploadUrlSuccess)
    }

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
