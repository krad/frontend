import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { GET, POST } from '../network_client'

export const CurrentUserStatus = {
  setError: setError,
  setIsLoading: setIsLoading,
  setCurrentUser: value => state => (value),
  checkLoginState: () => async (state, actions) => {
    actions.setIsLoading(true)
    GET('/users/me').then(result => {
      actions.setIsLoading(false)
      actions.setCurrentUser(result)
    }).catch(err => {
      console.log('err', err);
    })
  },

  logout: () => async (state, actions) => {
    actions.setIsLoading(true)
    POST('/users/logout', {}).then(result => {
      console.log(result);
      actions.setIsLoading(false)
      actions.setCurrentUser(null)
    }).catch(err => {
      console.log('Logout error', err);
    })
  },

}

export const Login =  {
  setError: setError,
  setIsLoading: setIsLoading,
  setCurrentUser: value => state => ({user: value}),
  clearState: () => state => ({}),

  edit: value => state => {
    state[value.name] = value.value
    return state
  },

  submit: value => async (state, actions) => {
    actions.setIsLoading(true)
    POST('/users/login', state).then(result => {
      actions.setIsLoading(false)
      actions.clearState()
      actions.setCurrentUser(result)
    }).catch(err => {
      actions.setIsLoading(false)
      actions.setError('Login failed')
    })
  }

}
