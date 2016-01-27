import decode from 'jwt-decode'
import fetch from 'isomorphic-fetch'
import axios from 'axios'
import { CALL_API } from '../middleware/api'

const trim = (token) => token.substring(1, token.length - 1)
const expiresIn = (token) => Math.round(decode(token).exp - Date.now() / 1000)

const API_URL = process.env.API_URL || 'https://api.topcoder.com'
const AUTH0_TOKEN_NAME = process.env.AUTH0_TOKEN_NAME || 'userJWTToken'

// Bind our token refreshes to the same promise chain
let refreshPromise = null

export default () => {
  const token = trim(localStorage.userJWTToken)
  const expires = expiresIn(token)
  const fresh = expires > 60

  // Continue if the token is fresh
  if (fresh) {
    return Promise.resolve(true)
  }

  // If we are already refreshing the token for other actions, append this
  // request to the chain
  if (refreshPromise) {
    return refreshPromise
  }

  // Configure our fresh request
  const config = {
    url: API_URL + '/v3/authorizations/1',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }

  refreshPromise = axios(config)
    .then( res => {
      if (res.status === 200) {
        // Get token from response
        const newToken = '"' + res.data.result.content.token + '"'

        // Assign it to local storage
        localStorage.setItem(AUTH0_TOKEN_NAME, newToken)

        // Clear our promise chain
        refreshPromise = null
      } else {
        throw 'Token refresh failed'
      }
    })
    .catch( (err) => {
      refreshPromise = null
    })

  return refreshPromise
}
