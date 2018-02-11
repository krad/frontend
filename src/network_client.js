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

      resolve(JSON.parse('{}'))
      return
    }, 1000)
  })
}

export const GET = (path) => {
  if (config.IsTesting) {
    return readFromFile(path)
  } else {
    return fetch(path)
    .then(response => {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Didn't get JSON from the API");
    })
  }
}

export const POST = (path, data) => {
  if (config.IsTesting) {
    return readFromFile(path)
  } else {
    var requestParams = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'})
    }
    return fetch(path, requestParams)
  }
}
