export const SET_FILE_UPLOADER = 'SET_FILE_UPLOADER'

export function setFileUploader(fileUploader) {
  return {
    type: SET_FILE_UPLOADER,
    fileUploader: fileUploader
  }
}
