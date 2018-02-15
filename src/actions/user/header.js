import { setIsLoading, setError } from '../async_helpers'
import { GET, POST } from '../../network_client'

export const Header = {

  setIsLoading: setIsLoading,
  setError: setError,
  setCurrentUser: value => state => (value),

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


  hamburger: value => state => {
    if (state.active) {
      return {active: false}
    } else {
      return {active: true}
    }
  },

}
