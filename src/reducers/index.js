import * as ActionTypes from '../actions'
import merge from 'lodash/object/merge'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'
import { SET_USER } from '../middleware/check-user'

const defaultState = {
  profiles: {}
}

function user(state = {}, action) {
  if (action.type == SET_USER) {
    state = action.user
  }

  return state
}

// Updates an entity cache in response to any action with response.entities.
function entities(state, action) {
  state = state || defaultState

  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

const form = formReducer.plugin({
  accountInfo: (state, action) => {
    switch(action.type) {
      case 'UPDATE_PASSWORD_SUCCESS':
        return undefined;
      default:
        return state;
    }
  }
})

const rootReducer = combineReducers({
  user,
  entities,
  form
})

export default rootReducer
