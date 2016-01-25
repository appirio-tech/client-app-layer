import callApi from '../middleware/api'
import Schemas from '../middleware/schemas'

export const PROFILE_FETCH_REQUEST = 'PROFILE_FETCH_REQUEST'
export const PROFILE_FETCH_SUCCESS = 'PROFILE_FETCH_SUCCESS'
export const PROFILE_FETCH_FAILURE = 'PROFILE_FETCH_FAILURE'

export function loadProfile(id) {
  return (dispatch, getState) => {
    const profile = getState().entities.profiles[id]

    if (profile) {
      return null
    }

    dispatch({type: PROFILE_FETCH_REQUEST })

    const config = {
      method: 'GET',
      endpoint: `/v3/profiles/${id}`,
      schema: Schemas.PROFILE
    }

    const success = response => {
      return dispatch({
        response,
        type: PROFILE_FETCH_SUCCESS,
        projectId: id
      })
    }

    const failure = error => {
      return dispatch({
        type: PROFILE_FETCH_FAILURE,
        error: error.message || 'Something bad happened',
        projectId: id
      })
    }

    return callApi(config).then(success).catch(failure)
  }
}

export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST'
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS'
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE'

export function updateProfile(id) {
  return (dispatch, getState) => {
    if (getState().entities.profiles[id]) {
      return null
    }

    dispatch({type: PROFILE_UPDATE_REQUEST })

    const config = {
      method: 'PUT',
      endpoint: `/v3/profiles/${id}`,
      schema: Schemas.PROFILE
    }

    const success = response => {
      return dispatch({
        response,
        type: PROFILE_UPDATE_SUCCESS,
        projectId: id
      })
    }

    const failure = error => {
      return dispatch({
        type: PROFILE_UPDATE_FAILURE,
        error: error.message || 'Something bad happened',
        projectId: id
      })
    }

    return callApi(config).then(success).catch(failure)
  }
}