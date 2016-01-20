import { CALL_API } from '../middleware/api'
import { Schemas } from '../middleware/schemas'

export const STEPS_BY_PROJECT_GET_REQUEST = 'STEPS_BY_PROJECT_GET_REQUEST'
export const STEPS_BY_PROJECT_GET_SUCCESS = 'STEPS_BY_PROJECT_GET_SUCCESS'
export const STEPS_BY_PROJECT_GET_FAILURE = 'STEPS_BY_PROJECT_GET_FAILURE'

const API_ROOT = process.env.API_URL || 'https://api.topcoder.com'

function getStepsByProject(id) {
  return {
    [CALL_API]: {
      types: [
        STEPS_BY_PROJECT_GET_REQUEST,
        STEPS_BY_PROJECT_GET_SUCCESS,
        STEPS_BY_PROJECT_GET_FAILURE
      ],
      endpoint: `${API_ROOT}/v3/projects/${id}/steps`,
      schema: Schemas.STEP_ARRAY
    },
    projectId: id
  }
}

export function loadStepsByProject(id) {
  return (dispatch, getState) => {
    // const profile = getState().projects.profiles[id]

    // if (profile && requiredFields.every(key => profile.hasOwnProperty(key))) {
    //   return null
    // }

    return dispatch(getStepsByProject(id))
  }
}