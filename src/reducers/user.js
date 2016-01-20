import { SET_USER } from '../middleware/check-user'

export default function user(state = {}, action) {
  if (action.type == SET_USER) {
    state = action.user
  }

  return state
}