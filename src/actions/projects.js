import callApi from '../middleware/api'
import Schemas from '../middleware/schemas'

export const PROJECT_FETCH_REQUEST = 'PROJECT_FETCH_REQUEST'
export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS'
export const PROJECT_FETCH_FAILURE = 'PROJECT_FETCH_FAILURE'

export function loadProject(id) {
  return (dispatch, getState) => {
    if ( getState().entities.projects[id] ) {
      return null
    }

    dispatch({
      type: PROJECT_FETCH_REQUEST,
      projectId: id
    })

    const config = {
      method: 'GET',
      endpoint: '/v3/projects/' + id + '/steps',
      schema: Schemas.PROJECT
    }

    const success = response => {
      return dispatch({
        response,
        type: PROJECT_FETCH_SUCCESS,
        projectId: id
      })
    }

    const failure = error => {
      return dispatch({
        type: PROJECT_FETCH_FAILURE,
        error: error.message || 'Something bad happened',
        projectId: id
      })
    }

    return callApi(config).then(success).catch(failure)
  }
}