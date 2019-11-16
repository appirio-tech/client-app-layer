import callApi from '../middleware/api'
import Schemas from '../middleware/schemas'
import merge from 'lodash/merge'

export const STEP_FETCH_REQUEST = 'STEP_FETCH_REQUEST'
export const STEP_FETCH_SUCCESS = 'STEP_FETCH_SUCCESS'
export const STEP_FETCH_FAILURE = 'STEP_FETCH_FAILURE'

export function loadStep(projectId, stepId) {
  return (dispatch, getState) => {
    if (getState().entities.steps[stepId]) {
      return null
    }

    dispatch({type: STEP_FETCH_REQUEST })

    const config = {
      endpoint: '/v3/work/' + projectId + '/steps',
      schema: Schemas.STEP
    }

    const success = response => {
      return dispatch({
        response,
        type: STEP_FETCH_SUCCESS
      })
    }

    const failure = error => {
      return dispatch({
        type: STEP_FETCH_FAILURE,
        error: error.message || 'Something bad happened'
      })
    }

    return callApi(config).then(success).catch(failure)
  }
}

export const STEP_CREATE_REQUEST = 'STEP_CREATE_REQUEST'
export const STEP_CREATE_SUCCESS = 'STEP_CREATE_SUCCESS'
export const STEP_CREATE_FAILURE = 'STEP_CREATE_FAILURE'

const template = {
  details: {
    numberOfRanks: 3,
    rankedSubmissions: [],
    customerConfirmedRanks: false,
    submissionIds: []
  }
}

export function createStep(projectId, values) {
  return (dispatch, getState) => {
    dispatch({type: STEP_CREATE_REQUEST })

    const step = merge({}, template, values)

    const config = {
      method: 'POST',
      endpoint: '/v3/work/' + projectId + '/steps',
      schema: Schemas.STEP,
      data: {
        param: step
      }
    }

    const success = response => {
      return dispatch({
        type: STEP_CREATE_SUCCESS,
        response,
        projectId
      })
    }

    const failure = error => {
      return dispatch({
        type: STEP_CREATE_FAILURE,
        error: error.message || 'Something bad happened'
      })
    }

    return callApi(config).then(success).catch(failure)
  }
}

export const STEP_UPDATE_REQUEST = 'STEP_UPDATE_REQUEST'
export const STEP_UPDATE_SUCCESS = 'STEP_UPDATE_SUCCESS'
export const STEP_UPDATE_FAILURE = 'STEP_UPDATE_FAILURE'

export function updateStep(projectId, stepId, values) {
  return (dispatch, getState) => {
    dispatch({type: STEP_UPDATE_REQUEST })

    const stepBeforeUpdate = getState().entities.steps[stepId]
    const stepAfterUpdate = merge({}, stepBeforeUpdate, values)

    const config = {
      method: 'PUT',
      endpoint: '/v3/work/' + projectId + '/steps/' + stepId,
      schema: Schemas.STEP,
      data: {
        param: stepAfterUpdate
      }
    }

    const success = response => {
      return dispatch({ response, type: STEP_UPDATE_SUCCESS })
    }

    const failure = error => {
      return dispatch({type: STEP_UPDATE_FAILURE, error: error.message || 'Something bad happened'})
    }

    return callApi(config).then(success).catch(failure)
  }
}
