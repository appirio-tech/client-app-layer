import decode from 'jwt-decode'
import fetch from 'isomorphic-fetch'

const trim = (token) => token.substring(1, token.length - 1)
const expiresIn = (token) => Math.round(decode(token).exp - Date.now() / 1000)

let refreshPromise = null

export default function() {
  const token = trim(localStorage.userJWTToken)
  const expires = expiresIn(token)
  const fresh = expires > 60

  if (fresh) {
    return Promise.resolve(null)
  }

  console.log(`Token will expire in ${ expires } seconds. Getting a new one.`)

  if (refreshPromise) {
    return refreshPromise
  }

  const url = 'https://api-work.topcoder-dev.com/v3/authorizations/1'
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }

  return refreshPromise = fetch(url, config)
    .then( res => res.json() )
    .then( json => {
      localStorage.setItem('userJWTToken', '"' + json.result.content.token + '"')
      refreshPromise = null
      console.log(`Token refreshed. Completing blocked API requests`)
      next(action)
    })
    .catch( (err) => {
      refreshPromise = null
    })
}