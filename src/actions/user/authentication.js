import { setIsLoading, setError, setIsChangingAuthState } from '../async_helpers'
import { GET, POST } from '../../network_client'
import { edit } from './details'

export const Authentication = {

  setError: setError,
  setIsChangingAuthState: setIsChangingAuthState,
  setIsLoggedIn: (isLoggedIn) => state => ({isLoggedIn: isLoggedIn}),
  setDetails: (value) => state => ({details: value}),

  edit: edit,

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
      actions.setDetails(null)
      actions.setIsLoggedIn(false)
    })
    .catch(err => { console.log(err) })
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
