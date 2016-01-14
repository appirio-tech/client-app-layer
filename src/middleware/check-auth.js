import decode from 'jwt-decode'
import fetch from 'isomorphic-fetch'
import axios from 'axios'

const trim = (token) => token.substring(1, token.length - 1)
const expiresIn = (token) => Math.round(decode(token).exp - Date.now() / 1000)

let refreshPromise = null

export default function() {
  const token = trim(localStorage.userJWTToken)
  const expires = expiresIn(token)
  const fresh = expires > 60

  console.log(token)

  if (fresh) {
    return Promise.resolve(null)
  }

  console.log(`Token will expire in ${ expires } seconds. Getting a new one.`)

  if (refreshPromise) {
    return refreshPromise
  }

  const API_URL = process.env.API_URL || 'https://api-work.topcoder-dev.com'
  const url = API_URL + '/v3/authorizations/1'
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }

  return refreshPromise = axios.get(url)
    .then( res => res.json() )
    .then( json => {
      if (json.result.status === 200) {
        console.log(json.result.content.token)

        localStorage.setItem('userJWTToken', '"' + json.result.content.token + '"')
        refreshPromise = null
        console.log(`Token refreshed. Completing blocked API requests`)
        next(action)
      }
    })
    .catch( (err) => {
      refreshPromise = null
    })
}
