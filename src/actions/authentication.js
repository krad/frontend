import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { GET, POST, UPLOAD } from '../network_client'

const sanitize = (input, keys) => {
  var sanitizedInput = input
  for (var key in keys) {
    if (sanitizedInput.hasOwnProperty(key)) {
      delete sanitizedInput[key]
    }
  }
  return sanitizedInput
}

const sanitizeAll = (input) => {
  const allKeys = ['isLoading',
                   'isVerified',
                   'error',
                   'isChangingAuthState',
                   'isLoggedIn']

  return sanitize(input, allKeys)
}

export const Authentication = {
  setError: setError,
  setIsLoading: setIsLoading,

  setIsUpdating: value => state => ({isUpdating: value}),
  setIsChangingAuthState: value => state => ({isChangingAuthState: value}),
  setIsVerified: value => state => ({isVerified: value}),
  setIsLoggedIn: value => state => ({isLoggedIn: value}),
  setCurrentUser: value => state => (value),

  clearSensitiveInfo: () => state => {
    var newState = state
    delete newState['phoneNumber']
    delete newState['password']
    delete newState['firstName']
    delete newState['lastName']
    delete newState['username']
    delete newState['verificationCode']
    return newState
  },

  checkLoginState: () => async (state, actions) => {
    actions.setIsLoading(true)
    await GET('/users/me').then(result => {
      actions.setError(null)
      actions.setCurrentUser(result)
    }).catch(err => {
      actions.setCurrentUser(null)
    })
    actions.setIsLoading(false)
  },

  edit: value => state => {
    state[value.name] = value.value
    return state
  },

  prepareUpload: (target) => async (state, actions) => {
    var files = target.files
    if (files.length > 0) {
      var file = files[0]
      actions.setCurrentUser({photo: {name: file.name, progress: '0', size: file.size}})
      await POST('/uploads/sign', {contentType: file.type, fileName: "profile.jpg"})
      .then(signedInfo => {
        signedInfo.target = file
        actions.upload(signedInfo)
      }).catch(err => {
        console.log('err signing', err);
      })

    } else {
      actions.setError('Could not read image file type')
    }
  },

  upload: (uploadInfo) => async (state, actions) => {
    await UPLOAD(uploadInfo.url, uploadInfo.target.type, uploadInfo.target, (progress) =>{
      var percentComplete = ((progress.loaded / progress.total) * 100)
      actions.setCurrentUser({photo: {progress: percentComplete.toString()}})
    }).then(result => {
      console.log(result)
    }).catch(err => {
      actions.setError('Upload failed')
    })
  },

  update: value => async (state, actions) => {
    actions.setIsUpdating(true)
    await POST('/users/me', sanitizeAll(state)).then(result => {
      actions.setIsVerified(true)
    }).catch(err => {
      actions.setError('Problem updating profile')
    })
    actions.setIsUpdating(false)
  },

  hamburger: value => state => {
    if (state.controlsActive) {
      return {controlsActive: false}
    } else {
      return {controlsActive: true}
    }
  },

  login: value => async (state, actions) => {
    actions.setIsChangingAuthState(true)
    var payload = sanitizeAll(state)
    console.log(payload);
    await POST('/users/login', sanitizeAll(state)).then(result => {
      actions.setError(null)
      actions.setCurrentUser(result)
      actions.clearSensitiveInfo()
      actions.setIsLoggedIn(true)
    }).catch(err => {
      actions.setError('Login failed')
    })
    actions.setIsChangingAuthState(false)
  },

  logout: () => async (state, actions) => {
    actions.setIsChangingAuthState(true)
    await POST('/users/logout', {})
    .then(result => {
      actions.setError(null)
      actions.clearSensitiveInfo()
      actions.setIsLoggedIn(true)
    })
    .catch(err => { console.log(err) })
    actions.setIsChangingAuthState(false)
  },

  signup: () => async (state, actions) => {
    actions.setIsChangingAuthState(true)
    var payload = sanitizeAll(state)
    console.log(payload);
    await POST('/users/signup', payload).then(result => {
      actions.setError(null)
      actions.setCurrentUser(result)
      actions.setIsLoggedIn(false)
    }).catch(err => {
      actions.setError('Signup failed')
    })
    actions.setIsChangingAuthState(false)
  },
}
