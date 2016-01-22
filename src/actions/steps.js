import { CALL_API } from '../middleware/api'
import { callApi } from '../middleware/api'
import { Schemas } from '../middleware/schemas'
import merge from 'lodash/merge'

const API_ROOT = process.env.API_URL || 'https://api.topcoder.com'

export const STEP_FETCH_REQUEST = 'STEP_FETCH_REQUEST'
export const STEP_FETCH_SUCCESS = 'STEP_FETCH_SUCCESS'
export const STEP_FETCH_FAILURE = 'STEP_FETCH_FAILURE'

export function loadStep(projectId, stepId) {
  return (dispatch, getState) => {
    const step = getState().entities.steps[stepId]

    if (step) {
      return null
    }

    dispatch({type: STEP_FETCH_REQUEST })

    const config = {
      method: 'GET',
      endpoint: `${API_ROOT}/v3/work/${ projectId }/steps`,
      schema: Schemas.STEP
    }

    return callApi(config)
      .then( response => {
        return dispatch({
          response,
          type: STEP_FETCH_SUCCESS
        })
      })
      .catch( error => {
        return dispatch({
          type: STEP_FETCH_FAILURE,
          error: error.message || 'Something bad happened'
        })
      })
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
      endpoint: `${API_ROOT}/v3/work/${ projectId }/steps`,
      schema: Schemas.STEP,
      data: {
        param: step
      }
    }

    return callApi(config)
      .then( response => {
        return dispatch({
          type: STEP_CREATE_SUCCESS,
          response,
          projectId
        })
      })
      .catch( error => {
        return dispatch({
          type: STEP_FAILURE,
          error: error.message || 'Something bad happened'
        })
      })
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
      endpoint: `${API_ROOT}/v3/work/${ projectId }/steps/${ stepId }`,
      schema: Schemas.STEP,
      data: {
        param: stepAfterUpdate
      }
    }

    return callApi(config)
      .then( response => {
        return dispatch({ response, type: STEP_UPDATE_SUCCESS })
      })
      .catch( error => {
        return dispatch({type: STEP_FAILURE, error: error.message || 'Something bad happened'})
      })
  }
}