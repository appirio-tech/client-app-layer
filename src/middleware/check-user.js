import decode from 'jwt-decode'

const trim = (token) => token.substring(1, token.length - 1)

export const SET_USER = 'SET_USER'

export default store => next => action => {
  if (action.type == SET_USER) {
    return next(action)
  }

  const token = trim(localStorage.userJWTToken)
  const tokenUserId = decode(token).userId
  const storeUserId = store.getState().user.id

  if (!tokenUserId && !storeUserId) {
    return null
  }

  if (!storeUserId) {
    next({
      type: SET_USER,
      user: {
        id: tokenUserId
      }
    })
  }

  return next(action)
}
