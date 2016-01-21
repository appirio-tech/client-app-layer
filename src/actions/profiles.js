import { CALL_API } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const PROFILE_GET_REQUEST = 'PROFILE_GET_REQUEST'
export const PROFILE_GET_SUCCESS = 'PROFILE_GET_SUCCESS'
export const PROFILE_GET_FAILURE = 'PROFILE_GET_FAILURE'



function getProfile(id) {
  return {
    [CALL_API]: {
      types: [ PROFILE_GET_REQUEST, PROFILE_GET_SUCCESS, PROFILE_GET_FAILURE ],
      endpoint: `/v3/profiles/${id}`,
      schema: Schemas.PROFILE
    }
  }
}

export function loadProfile(id, requiredFields = []) {
  return (dispatch, getState) => {
    const profile = getState().entities.profiles[id]
    if (profile && requiredFields.every(key => profile.hasOwnProperty(key))) {
      return null
    }

    return dispatch(getProfile(id))
  }
}

function putProfile(id, profile) {
  return {
    [CALL_API]: {
      types: [ PROFILE_GET_REQUEST, PROFILE_GET_SUCCESS, PROFILE_GET_FAILURE ],
      method: 'PUT',
      endpoint: `/v3/profiles/${id}`,
      schema: Schemas.PROFILE
    }
  }
}

export function updateProfile(id, requiredFields = []) {
  return (dispatch, getState) => {
    const profile = getState().entities.profiles[id]
    if (profile && requiredFields.every(key => profile.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchProfile(id))
  }
}