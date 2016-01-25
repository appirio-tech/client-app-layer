import merge from 'lodash/merge'
import values from 'lodash/values'
import union from 'lodash/union'
import {
  STEPS_BY_PROJECT_FETCH_REQUEST,
  STEPS_BY_PROJECT_FETCH_SUCCESS,
  STEPS_BY_PROJECT_FETCH_FAILURE
} from '../actions/stepsByProject'
import {
  STEP_CREATE_SUCCESS
} from '../actions/steps'

export default function stepsByProject(state = {}, action) {
  switch(action.type) {
    case STEPS_BY_PROJECT_FETCH_REQUEST:
      return merge({}, state, {
        [action.projectId]: {
          isFetching: true
        }
      })

    case STEPS_BY_PROJECT_FETCH_SUCCESS:
      return merge({}, state, {
        [action.projectId]: {
          items: action.response.result,
          lastUpdated: (new Date()).toISOString(),
          isFetching: false,
          error: undefined
        }
      })

    case STEPS_BY_PROJECT_FETCH_FAILURE:
      return merge({}, state, {
        [action.projectId]: {
          isFetching: false,
          error: 'Something went terribly awry'
        }
      })

    case STEP_CREATE_SUCCESS:
      const project = state[action.projectId]
      const stepId = action.response.result

      const before = project.items
      const after = union(project.items, [stepId])

      const newState = merge({}, state, {
        [action.projectId]: {
          items: after
        }
      })

      if (project) {
        return newState
      }

    default:
      return state
  }
}