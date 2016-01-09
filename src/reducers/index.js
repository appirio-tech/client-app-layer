import * as ActionTypes from '../actions'
import merge from 'lodash/object/merge'
import {reducer as formReducer} from 'redux-form'
import { combineReducers } from 'redux'

const defaultState = {
  profiles: {
    // 40141336: {
    //   firstName: 'Andrew',
    //   lastName: 'Slebie',
    //   organization: 'Muhself'
    // }
  }
}

function user(state, action) {
  return {
    id: '40141336'
  }
}

// Updates an entity cache in response to any action with response.entities.
function entities(state, action) {
  if (!state) state = defaultState

  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

const form = formReducer.plugin({
  personalinfo: (state, action) => { // <------ 'account' is name of form given to reduxForm()
    switch(action.type) {
      case 'ACCOUNT_SAVE_SUCCESS':
        return undefined;       // <--- blow away form data
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
