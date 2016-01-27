import configureStore from './store/configureStore'

export * from './actions'
export default configureStore

const AUTH0_TOKEN_NAME = process.env.AUTH0_TOKEN_NAME || 'userJWTToken'

if (process.env.TOKEN) {
  localStorage.setItem(AUTH0_TOKEN_NAME, '"' + process.env.TOKEN + '"')
}