import { reducer as formReducer } from 'redux-form'
import {
  UPDATE_PASSWORD_SUCCESS,
  STEP_UPDATE_SUCCESS } from '../actions'

const form = formReducer.plugin({
  accountInfo: (state, action) => {
    switch(action.type) {
      case UPDATE_PASSWORD_SUCCESS:
        return undefined;

      default:
        return state;
    }
  }
})

 export default form