import { GET, POST } from '../network_client'
import { setIsLoading, setIsFetching, setError } from './async_helpers'

export const Channel = {

  setIsFetching: setIsFetching,
  setBroadcasts: value => state => ({broadcasts: value}),
  setUser: value => state => ({user: value}),

  fetch: (userID) => async (state, actions) => {
    actions.setIsFetching(true)
    const endpoint = ['/broadcasts', 'by', userID].join('/')
    await GET(endpoint)
    .then(result => {
      actions.setBroadcasts(result.Items)
      actions.setUser(result.user)
    })
    .catch(err => {
      console.log(err);
    })
    actions.setIsFetching(false)
  },

}
