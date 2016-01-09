import { normalize } from 'normalizr'
import Schemas from './schemas'
import fetch from 'isomorphic-fetch'
import decode from 'jwt-decode'
import checkAuth from './check-auth'

const trim = (token) => token.substring(1, token.length - 1)

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = function(callAPI) {
  const { schema, endpoint, ignoreResult, method, body } = callAPI
  const token = trim(localStorage.userJWTToken)

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: method || 'GET'
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return fetch(endpoint, config)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      if (ignoreResult) {
        return {}
      } else {
        return Object.assign({}, normalize(json.result.content, schema))
      }
    })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  checkAuth()
    .then( () => callApi(callAPI) )
    .then( response => {
      const successAction = actionWith({ response, type: successType })
      next(successAction)
    })
    .catch( error => {
      const errorAction = actionWith({type: failureType, error: error.message || 'Something bad happened'})
      next(errorAction)
    })

}
