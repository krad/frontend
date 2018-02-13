import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { GET, POST } from '../network_client'

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
    return newState
  },

  checkLoginState: () => async (state, actions) => {
    actions.setIsLoading(true)
    await GET('/users/me').then(result => {
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

  login: value => async (state, actions) => {
    actions.setIsChangingAuthState(true)
    await POST('/users/login', state).then(result => {
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
      actions.clearSensitiveInfo()
      actions.setIsVerified(false)
    })
    .catch(err => { console.log(err) })
    actions.setIsChangingAuthState(false)
  },

  signup: () => async (state, actions) => {
    actions.setIsChangingAuthState(true)
    await POST('/users/signup', state).then(result => {
      console.log('signed up', result);
      actions.setCurrentUser(result)
      actions.setIsVerified(false)
    }).catch(err => {
      console.log('error signing up', err);
      actions.setError('Signup failed')
    })
    actions.setIsChangingAuthState(false)
  }
}
