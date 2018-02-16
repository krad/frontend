import { setIsLoading, setError, setIsChangingAuthState, setSuccess } from '../async_helpers'
import { GET, POST } from '../../network_client'
import { edit } from './details'

export const Authentication = {

  edit: edit,
  setError: setError,
  setSuccess: setSuccess,
  setIsChangingAuthState: setIsChangingAuthState,
  setIsLoading: setIsLoading,
  setIsLoggedIn: isLoggedIn => state => ({isLoggedIn: isLoggedIn}),
  setDetails: value => state => ({details: value}),

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

}
