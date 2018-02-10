
const readFromFile = (filename) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filename.startsWith('/broadcasts')) {
        const broadcasts = require('./broadcasts')
        resolve(broadcasts.default)
      }
    }, 1000)
  })
}

export const networkClient = {
    get: (path) => {
      if (process.NODE_ENV) {
        return fetch(path)
        .then(response => response.text())
      } else {
        return readFromFile(path)
      }
    }
}
