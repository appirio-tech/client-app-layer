import decode from 'jwt-decode'
import fetch from 'isomorphic-fetch'

const trim = (token) => token.substring(1, token.length - 1)
const expiresIn = (token) => Math.round(decode(token).exp - Date.now() / 1000)

let refreshPromise = null

export default function() {
  // const token = trim(localStorage.userJWTToken)
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJhbmRyZXdjdXN0b21lciIsImV4cCI6MTQ1MjA0NzMzOCwidXNlcklkIjoiNDAxNDEzMzYiLCJpYXQiOjE0NTIwNDY3MzgsImVtYWlsIjoiYXNlbGJpZStjdXN0b21lckBnbWFpbC5jb20iLCJqdGkiOiI3YWE5YTZkNS0wYmQwLTQ2M2UtOGMxNC0yMTMyZGJmOTUzNDcifQ.HXY5S6uwWH1GdDjOvNLbdI6Ec-x5-ZsDOR7q111opV4'
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

  const url = 'https://api-work.topcoder-dev.com/v3/authorizations/1'
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }

  return refreshPromise = fetch(url, config)
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