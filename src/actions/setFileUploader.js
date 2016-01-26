export const SET_FILE_UPLOADER = 'SET_FILE_UPLOADER'

export function setFileUploader({ id, assetType, category }) {
  return {
    type: SET_FILE_UPLOADER,
    fileUploader: { id, assetType, category }
  }
}
