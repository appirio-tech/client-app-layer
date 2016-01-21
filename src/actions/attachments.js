import { CALL_API } from '../middleware/api'
import { Schemas } from '../middleware/schemas'


export const ATTACHMENTS_GET_REQUEST = 'ATTACHMENTS_GET_REQUEST'
export const ATTACHMENTS_GET_SUCCESS = 'ATTACHMENTS_GET_SUCCESS'
export const ATTACHMENTS_GET_FAILURE = 'ATTACHMENTS_GET_FAILURE'

const API_ROOT = process.env.API_URL || 'https://api.topcoder.com'

export function getAttachments({ id, assetType, category }) {
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

// export function getUploadUrl({ id, assetType, category }) {
//   return {
//     [CALL_API]: {
//       types    : [UPLOAD_URL_POST_REQUEST, UPLOAD_URL_POST_SUCCESS, UPLOAD_URL_POST_FAILURE],
//       endpoint : `${API_ROOT}/v3/attachments/uploadurl`,
//       schema   : Schemas.UPLOAD_URL_ARRAY,
//       method   : 'POST',
//       body     : {
//         param: {
//           id       : '1441513717335-59057fa5-da9a-4a93-a606-6136f37a48c4',
//           fileName : 'abc.jpg',
//           assetType: 'specs',
//           fileType : 'image/jpeg',
//           category : 'work'
//         }
//       }
//     }
//   }
// }


// var file = this;
//       var deferred = $q.defer();
//       var xhr = file._xhr = new XMLHttpRequest();

//       xhr.upload.onprogress = file._onProgress.bind(file);

//       xhr.onload = function() {
//         deferred.resolve();
//       };

//       xhr.onerror = function() {
//         deferred.reject();
//       };

//       xhr.open('PUT', file.preSignedURL, true);
//       xhr.setRequestHeader('Content-Type', file.data.type);
//       xhr.send(file.data);



export function uploadAttachment(attachment) {
  const { id, assetType, category } = attachment

  return (dispatch) => {
    dispatch( getUploadUrl({ id, assetType, category }) )
  }
}
