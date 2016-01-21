import { CALL_API, callApi } from '../middleware/api'

import { Schemas } from '../middleware/schemas'

export const ATTACHMENTS_GET_REQUEST = 'ATTACHMENTS_GET_REQUEST'
export const ATTACHMENTS_GET_SUCCESS = 'ATTACHMENTS_GET_SUCCESS'
export const ATTACHMENTS_GET_FAILURE = 'ATTACHMENTS_GET_FAILURE'

export const UPLOAD_URL_GET_REQUEST = 'UPLOAD_URL_GET_REQUEST'
export const UPLOAD_URL_GET_SUCCESS = 'UPLOAD_URL_GET_SUCCESS'
export const UPLOAD_URL_GET_FAILURE = 'UPLOAD_URL_GET_FAILURE'

export const S3_UPLOAD_REQUEST  = 'S3_UPLOAD_REQUEST'
export const S3_UPLOAD_PROGRESS = 'S3_UPLOAD_PROGRESS'
export const S3_UPLOAD_SUCCESS  = 'S3_UPLOAD_SUCCESS'
export const S3_UPLOAD_FAILURE  = 'S3_UPLOAD_FAILURE'


const API_ROOT = process.env.API_URL || 'https://api.topcoder.com'

export function getAttachments({id, assetType, category}) {
  return {
    [CALL_API]: {
      types    : [ATTACHMENTS_GET_REQUEST, ATTACHMENTS_GET_SUCCESS, ATTACHMENTS_GET_FAILURE],
      endpoint : `${API_ROOT}/v3/attachments?filter=id=${id}&assetType=${assetType}&category=${category}`,
      schema   : Schemas.ATTACHMENT_ARRAY,
      id       : id,
      assetType: assetType,
      category : category
    }
  }
}

export function getUploadUrl({id, assetType, category}) {
  return dispatch => {
    const options = {
      schema  : Schemas.UPLOAD_URL_ARRAY,
      endpoint: `${API_ROOT}/v3/attachments/uploadurl`,
      method  : 'POST',
      body: {
        param: {
          id       : '1441513717335-59057fa5-da9a-4a93-a606-6136f37a48c4',
          fileName : 'abc.jpg',
          assetType: 'specs',
          fileType : 'image/jpeg',
          category : 'work'
        }
      }
    }

    return callApi(options);
  }
}

export function uploadAttachment(attachment) {
  const { id, assetType, category } = attachment

  return (dispatch) => {
    dispatch( getUploadUrl({ id, assetType, category }) )
  }
}
