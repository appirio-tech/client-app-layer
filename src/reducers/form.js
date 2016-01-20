import { reducer as formReducer } from 'redux-form'

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

 export default form