import { CALL_API } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const PROJECT_GET_REQUEST = 'PROJECT_GET_REQUEST'
export const PROJECT_GET_SUCCESS = 'PROJECT_GET_SUCCESS'
export const PROJECT_GET_FAILURE = 'PROJECT_GET_FAILURE'

const API_ROOT = process.env.API_URL || 'https://api.topcoder.com'

export function loadProject(id) {
  return (dispatch, getState) => {
    const project = getState().entities.projects[id]

    if (project) {
      return null
    }

    return dispatch({
      [CALL_API]: {
        types: [ PROJECT_GET_REQUEST, PROJECT_GET_SUCCESS, PROJECT_GET_FAILURE ],
        endpoint: `${API_ROOT}/v3/projects/${id}`,
        schema: Schemas.PROJECT
      }
    })
  }
}