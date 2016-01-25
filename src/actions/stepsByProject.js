import callApi from '../middleware/api'
import Schemas from '../middleware/schemas'

export const STEPS_BY_PROJECT_FETCH_REQUEST = 'STEPS_BY_PROJECT_FETCH_REQUEST'
export const STEPS_BY_PROJECT_FETCH_SUCCESS = 'STEPS_BY_PROJECT_FETCH_SUCCESS'
export const STEPS_BY_PROJECT_FETCH_FAILURE = 'STEPS_BY_PROJECT_FETCH_FAILURE'

export function loadStepsByProject(projectId) {
  return (dispatch, getState) => {
    dispatch({
      type: STEPS_BY_PROJECT_FETCH_REQUEST,
      projectId
    })

    const config = {
      method: 'GET',
      endpoint: '/v3/projects/' + projectId + '/steps',
      schema: Schemas.STEP_ARRAY
    }

    const success = response => {
      return dispatch({
        response,
        type: STEPS_BY_PROJECT_FETCH_SUCCESS,
        projectId
      })
    }

    const failure = error => {
      return dispatch({
        type: STEPS_BY_PROJECT_FETCH_FAILURE,
        error: error.message || 'Something bad happened',
        projectId
      })
    }

    return callApi(config).then(success).catch(failure)
  }
}