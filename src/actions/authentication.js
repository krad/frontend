import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { GET, POST, UPLOAD } from '../network_client'

export const Authentication = {
  setError: setError,
  setIsLoading: setIsLoading,

  setIsChangingAuthState: value => state => ({isChangingAuthState: value}),
  setIsVerified: value => state => ({isVerified: value}),
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
      actions.setIsVerified(true)
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
      console.log(percentComplete);
      actions.setCurrentUser({photo: {progress: percentComplete.toString()}})
    }).then(result => {
      console.log(result)
    }).catch(err => {
      actions.setError('Upload failed')
    })
  },

  update: value => state => {
    console.log('updates')
    console.log(state);
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
    await POST('/users/login', state).then(result => {
      actions.setError(null)
      actions.setCurrentUser(result)
      actions.clearSensitiveInfo()
      actions.setIsVerified(true)
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
      actions.setIsVerified(false)
    })
    .catch(err => { console.log(err) })
    actions.setIsChangingAuthState(false)
  },

  signup: () => async (state, actions) => {
    actions.setIsChangingAuthState(true)
    await POST('/users/signup', state).then(result => {
      actions.setError(null)
      actions.setCurrentUser(result)
      actions.setIsVerified(false)
    }).catch(err => {
      actions.setError('Signup failed')
    })
    actions.setIsChangingAuthState(false)
  },
}
