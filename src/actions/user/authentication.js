import { setIsLoading, setError, setIsChangingAuthState } from '../async_helpers'
import { GET, POST } from '../../network_client'
import { edit } from './details'

export const Authentication = {

  edit: edit,
  setError: setError,
  setIsChangingAuthState: setIsChangingAuthState,
  setIsLoading: setIsLoading,
  setIsLoggedIn: (isLoggedIn) => state => ({isLoggedIn: isLoggedIn}),
  setDetails: (value) => state => ({details: value}),

  checkLoginState: () => async (state, actions) => {
    actions.setIsLoading(true)
    await GET('/users/me').then(result => {
      actions.setError(null)
      actions.setDetails(result)
      actions.setIsLoggedIn(true)
    }).catch(err => {
      actions.setCurrentUser(null)
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
}
