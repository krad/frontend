import { GET, POST, UPLOAD } from '../../network_client'
import { setIsLoading, setError, setIsChangingAuthState } from '../async_helpers'
import { edit } from './details'

export const Profile = {

  edit: edit,
  setError: setError,
  setIsLoading: setIsLoading,
  setIsCheckingAvailable: (value) => state => ({isCheckingAvailable: value}),
  setUploadProgress: (value) => state => ({upload: value}),
  setDetails: (value) => state => ({details: value}),

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
      console.log(result)
    }).catch(err => {
      actions.setError('Upload failed')
    })
  },
}
