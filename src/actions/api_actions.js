import { GET, POST } from '../network_client'

export const fetchBroadcasts = () => async (state, actions) => {
  actions.setIsFetching(true)
  await GET('/broadcasts')
  .then(broadcasts => {
    actions.updateBroadcasts(broadcasts)
    actions.setIsFetching(false)
  })
  .catch(err => {
    actions.setError('Could not fetch broadcasts.')
  })
}

export const fetchBroadcast = (broadcastID) => async (state, actions) => {
  actions.setIsFetching(true)
  GET(['/broadcasts', broadcastID].join('/'))
  .then(broadcast => {
    actions.setCurrentBroadcast(broadcast)
    actions.setIsFetching(false)
  }).catch(err => {
    actions.setError('Could not fetch broadcast')
  })
}
