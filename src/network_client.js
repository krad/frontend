import { config } from './config'

const readFromFile = (filename) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filename.startsWith('/broadcasts/')) {
        const broadcasts = require('./broadcast')
        resolve(broadcasts.default)
        return
      }

      if (filename.startsWith('/broadcasts')) {
        const broadcasts = require('./broadcasts')
        resolve(broadcasts.default)
        return
      }

      // if (filename.startsWith('/users/me')) {
      //   const user = require('./me')
      //   resolve(user.default)
      //   return
      // }

      if (filename.startsWith('/users/login')) {
        const user = require('./me')
        resolve(user.default)
        return
      }

      resolve(null)
      return
    }, 1000)
  })
}

const returnJSON = (response) => {
  var contentType = response.headers.get("content-type");
  if(contentType && contentType.includes("application/json")) {
    if (!response.ok) { throw new Error(response.json()) }
    return response.json();
  }

  if (response.redirected) { return JSON.parse('{}') }
  throw new TypeError("Didn't get JSON from the API");
}

export const GET = (path) => {
  if (config.IsTesting) {
    return readFromFile(path)
  } else {
    var requestParams = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'same-origin',
      },
      credentials: 'same-origin'
    }
    return fetch(path, requestParams)
    .then(returnJSON)
  }
}

export const POST = (path, data) => {
  if (config.IsTesting) {
    return readFromFile(path)
  } else {
    var requestParams = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'same-origin',
      },
      credentials: 'same-origin'
    }
    return fetch(path, requestParams).then(returnJSON)
  }
}
