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

      if (filename.startsWith('/users/names/available')) {
        resolve({available: true})
        return
      }

      if (filename.startsWith('/users/login')) {
        const user = require('./me')
        resolve(user.default)
        return
      }

      if (filename.startsWith('/users/signup')) {
        const user = require('./signup')
        resolve(user.default)
        return
      }

      resolve(null)
      return
    }, 400)
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

const progressiveFetch = (url, opts, onProgress) => {
    return new Promise((resolve, reject) => {

      var xhr = new XMLHttpRequest()
      xhr.open(opts.method || 'PUT', url)

      for (var k in opts.headers||{}) {
        xhr.setRequestHeader(k, opts.headers[k]);
      }

      xhr.onload = e => resolve(e.target.responseText)
      xhr.onerror = reject

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = onProgress
      }

      xhr.send(opts.body)
    })
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

export const UPLOAD = (path, contentType, data, uploadProgress) => {
  var requestParams = {
    method: 'PUT',
    headers: { 'Content-Type': contentType, },
    body: data,
    mode: 'cors'
  }
  return progressiveFetch(path, requestParams, uploadProgress)
}
