import { GET, POST } from '../../network_client'
import { setIsLoading, setError, setIsChangingAuthState } from '../async_helpers'
import { edit } from './details'

export const Profile = {

  edit: edit,
  setIsLoading: setIsLoading,
  setIsCheckingAvailable: (value) => state => ({isCheckingAvailable: value}),

  checkAvailability: value => async (state, actions) => {
    actions.setIsCheckingAvailable(true)
    await POST('/users/names/available', {username: value.value})
    .then(result => {
      // actions.setUsernameAvailable(result.available)
    }).catch(err => {
      setError('Problem checking username')
    })
    actions.setIsCheckingAvailable(false)
  },

  prepareUpload: (target) => async (state, actions) => {
    var files = target.files
    if (files.length > 0) {
      var file = files[0]
      // actions.setCurrentUser({photo: {name: file.name, progress: '0', size: file.size}})
      await POST('/uploads/sign', {contentType: file.type, fileName: "profile.jpg"})
      .then(signedInfo => {
        signedInfo.target = file
        // actions.upload(signedInfo)
      }).catch(err => {
        console.log('err signing', err);
      })

    } else {
      // actions.setError('Could not read image file type')
    }
  },

  upload: (uploadInfo) => async (state, actions) => {
    await UPLOAD(uploadInfo.url, uploadInfo.target.type, uploadInfo.target, (progress) =>{
      var percentComplete = ((progress.loaded / progress.total) * 100)
      // actions.setCurrentUser({photo: {progress: percentComplete.toString()}})
    }).then(result => {
      console.log(result)
    }).catch(err => {
      // actions.setError('Upload failed')
    })
  },

  update: value => async (state, actions) => {
    console.log('updattteeee....', state);
    actions.setIsLoading(true)
    await POST('/users/me', state).then(result => {
      // actions.setIsVerified(true)
    }).catch(err => {
      actions.setError('Problem updating profile')
    })
    actions.setIsLoading(false)
  },

}
