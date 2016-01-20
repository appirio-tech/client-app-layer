import merge from 'lodash/merge'
import values from 'lodash/values'
import {
  STEPS_BY_PROJECT_GET_REQUEST,
  STEPS_BY_PROJECT_GET_SUCCESS,
  STEPS_BY_PROJECT_GET_FAILURE
} from '../actions'

export default function stepsByProject(state = {}, action) {
  if (action.type == STEPS_BY_PROJECT_GET_SUCCESS) {
    return merge({}, state, {
      [action.projectId]: {
        items: action.response.result
      }
    })
  }

  return state
}