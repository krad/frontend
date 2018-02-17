import { GET, POST, UPLOAD } from '../../network_client'
import { setIsLoading, setError, setIsChangingAuthState, setSuccess } from '../async_helpers'
import { edit } from './details'
import { userProfileImgURL } from '../../components/users'

export const Profile = {

  edit: edit,
  setError: setError,
  setSuccess: setSuccess,
  setIsChangingAuthState: setIsChangingAuthState,
  setIsLoading: setIsLoading,

  setIsLoggedIn: isLoggedIn => state => ({isLoggedIn: isLoggedIn}),
  setDetails: value => state => ({details: value}),
  setIsCheckingAvailable: value => state => ({isCheckingAvailable: value}),
  setUploadProgress: value => state => ({upload: value}),

  checkLoginState: () => async (state, actions) => {
    actions.setIsLoading(true)
    await GET('/users/me').then(result => {
      actions.setError(null)
      actions.setDetails(result)
      actions.setIsLoggedIn(true)
    }).catch(err => {
      actions.setDetails({})
    })
    actions.setIsLoading(false)
  },

  login: value => async (state, actions) => {
    actions.setIsChangingAuthState(true)
    await POST('/users/login', state.details).then(result => {
      actions.setError(null)
      actions.setDetails(result)
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
      actions.setDetails({})
      actions.setIsLoggedIn(false)
    }).catch(err => {
      actions.setError('Problem logging out')
    })
    actions.setIsChangingAuthState(false)
  },

  signup: () => async (state, actions) => {
    actions.setIsChangingAuthState(true)
    await POST('/users/signup', state.details).then(result => {
      actions.setError(null)
      actions.setDetails(result)
      actions.setIsLoggedIn(false)
    }).catch(err => {
      actions.setError('Signup failed')
    })
    actions.setIsChangingAuthState(false)
  },

  update: value => async (state, actions) => {
    actions.setIsLoading(true)
    await POST('/users/me', state.details).then(result => {
      actions.setError(null)
      actions.setDetails(result)
      actions.setSuccess('Profile updated.')
    }).catch(err => {
      console.log(err);
      actions.setSuccess(null)
      actions.setError('Problem updating profile')
    })
    actions.setIsLoading(false)
  },

  checkAvailability: value => async (state, actions) => {
    actions.setIsCheckingAvailable(true)
    await POST('/users/names/available', {username: value.value})
    .then(result => {
      // actions.setUsernameAvailable(result.available)
    }).catch(err => {
      actions.setError('Problem checking username')
    })
    actions.setIsCheckingAvailable(false)
  },

  prepareUpload: (target) => async (state, actions) => {
    var files = target.files
    if (files.length > 0) {
      var file = files[0]
      actions.setUploadProgress({name: file.name, progress: '0', size: file.size})
      await POST('/uploads/sign', {contentType: file.type, fileName: "profile.jpg"})
      .then(signedInfo => {
        signedInfo.target = file
        actions.upload(signedInfo)
      }).catch(err => {
        actions.setError('Could not upload image')
      })
    } else {
      actions.setError('Could not read image file type')
    }
  },

  upload: (uploadInfo) => async (state, actions) => {
    await UPLOAD(uploadInfo.url, uploadInfo.target.type, uploadInfo.target, (progress) =>{
      var percentComplete = ((progress.loaded / progress.total) * 100)
      actions.setUploadProgress({progress: percentComplete.toString()})
    }).then(result => {
      actions.setUploadProgress({photo: userProfileImgURL(state.details)})
    }).catch(err => {
      actions.setError('Upload failed')
    })
  },

}
