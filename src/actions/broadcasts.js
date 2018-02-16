import { GET, POST } from '../network_client'
import { setIsLoading, setIsFetching, setError } from './async_helpers'

export const Broadcasts = {

  setIsFetching: setIsFetching,
  setError: setError,
  updateBroadcasts: (value) => state => ({fetched: value}),

  fetch: () => async (state, actions) => {
    actions.setIsFetching(true)
    await GET('/broadcasts')
    .then(broadcasts => {
      actions.updateBroadcasts(broadcasts)
      actions.setIsFetching(false)
    })
    .catch(err => {
      actions.setError('Could not fetch broadcasts.')
    })
  },

}
