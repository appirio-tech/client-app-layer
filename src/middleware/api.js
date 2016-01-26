import { normalize, Schema } from 'normalizr'
import Schemas from './schemas'
import axios from 'axios'
import decode from 'jwt-decode'
import checkAuth from './check-auth'
import merge from 'lodash/merge'

const trim = (token) => token.substring(1, token.length - 1)

export const API_ROOT = process.env.API_URL || 'https://api.topcoder.com'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export default function callApi({ schema, endpoint, ignoreResult, method, data }) {
  const executeRequest = () => {
    const token = trim(localStorage.userJWTToken)

    const config = {
      url: API_ROOT + endpoint,
      method: method || 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }

    if (data) {
      config.data = JSON.stringify(data)
    }

    return axios(config) 
  }

  const handleResponse = (res) => {
    if (ignoreResult) {
      return {}
    } else {
      return Object.assign({}, normalize(res.data.result.content, schema))
    }
  }

<<<<<<< 9afd70ff414068ef7a7728282253ab9c8d3aa631
  return checkAuth()
    .then(executeRequest)
    .then(handleResponse)
=======
  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(callAPI)
    .then( response => {
      const successAction = actionWith({ response, type: successType })
      next(successAction)
    })
    .catch( error => {
      const errorAction = actionWith({type: failureType, error: error.message || 'Something bad happened'})
      next(errorAction)
    })

>>>>>>> dont need original anymore
}

