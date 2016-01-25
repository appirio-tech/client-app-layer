import postUploadUrl from './postUploadUrl'
import postAttachment from './postAttachment'

export const READ_FILE_REQUEST  = 'READ_FILE_REQUEST'
export const READ_FILE_SUCCESS  = 'READ_FILE_SUCCESS'
export const READ_FILE_FAILURE  = 'READ_FILE_FAILURE'
export const S3_UPLOAD_REQUEST  = 'S3_UPLOAD_REQUEST'
export const S3_UPLOAD_PROGRESS = 'S3_UPLOAD_PROGRESS'
export const S3_UPLOAD_SUCCESS  = 'S3_UPLOAD_SUCCESS'
export const S3_UPLOAD_FAILURE  = 'S3_UPLOAD_FAILURE'

export function uploadFile({ id, assetType, category, file }) {
  return dispatch => {
    let temporaryAttachment = { // temporary attachment object while uploading
      assetType: assetType,
      category : category,
      fileName : file.name,
      fileSize : file.size
      fileType : file.type,
      isImage  : file.type.match('image.*'),
      id       : id
    }

    // let postUploadUrlSuccess = res => {
    //   let { filePath, preSignedURL } = res.result
    //   let putFileToS3                = new XMLHttpRequest()

    //   temporaryAttachment.preSignedURL = preSignedURL
    //   temporaryAttachment.filePath     = filePath

    //   dispatch({
    //     type: S3_UPLOAD_REQUEST,
    //     attachments: {
    //       [name]: temporaryAttachment
    //     }
    //   })

    //   putFileToS3.onload = res => {
    //     dispatch({
    //       type: S3_UPLOAD_SUCCESS,
    //       filePath: filePath
    //     })

    //     postAttachment({ id, assetType, category, file, filePath})(dispatch)
    //   }

    //   putFileToS3.onerror = res => {
    //     dispatch({
    //       type: S3_UPLOAD_FAILURE
    //     })
    //   }

    //   putFileToS3.upload.onprogress = res => {
    //     console.log('progress!!')
    //   }

    //   putFileToS3.open('PUT', preSignedURL, true)
    //   putFileToS3.setRequestHeader('Content-Type', type)
    //   putFileToS3.send(file.data)

    //   return res
    // }

    let postUploadUrlGo = () => {
      postUploadUrl({ id, assetType, category, name, type })(dispatch)
        .then(postUploadUrlSuccess)
    }

    let readFile = () => {
      let reader = new FileReader()

      dispatch({
        type: READ_FILE_REQUEST,
        attachments: {
          [name]: temporaryAttachment
        }
      })

      reader.onload = (e) => {
        temporaryAttachment.preview = e.target.result

        dispatch({
          type: READ_FILE_SUCCESS,
          attachments: {
            [name]: temporaryAttachment
          }
        })

        postUploadUrlGo()
      }

      reader.onerror = () => {
        dispatch({
          type: READ_FILE_FAILURE,
          attachments: {
            [name]: temporaryAttachment
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
