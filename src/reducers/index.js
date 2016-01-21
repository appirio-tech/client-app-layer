import { combineReducers } from 'redux'

import entities from './entities'
import stepsByProject from './stepsByProject'
import user from './user'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  entities,
  stepsByProject,
  user,
  form
})

export default rootReducer