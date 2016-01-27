import merge from 'lodash/merge'

const defaultState = {
  profiles: {},
  projects: {},
  steps: {}
}

// Updates an entity cache in response to any action with response.entities.
export default function entities(state, action) {
  state = state || defaultState

  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}