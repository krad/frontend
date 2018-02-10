
const readFromFile = (filename) => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      switch (filename) {
        case '/broadcasts':
        const broadcasts = require('./broadcasts')
          resolve(broadcasts.default)
          break;
        case /\/broadcasts\//:
          console.log('matched pattern')
        default:
          reject('could not find stub')
      }
    }, 50)
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
