import { GET, POST } from '../network_client'
import { setIsLoading, setIsFetching, setError } from './async_helpers'

export const Broadcast = {
  user: {},
  setError: setError,
  setIsLoading: setIsLoading,
  setIsFetching: setIsFetching,

  setDetails: (value) => state => ({details: value}),

  fetch: (broadcastID) => async(state, actions) => {
    actions.setIsFetching(true)
    GET(['/broadcasts', broadcastID].join('/'))
    .then(broadcast => {
      actions.setDetails(broadcast)
      actions.setIsFetching(false)
    }).catch(err => {
      actions.setError('Could not fetch broadcast')
    })
  },

  setOpinion: value => state => ({opinion: value}),

  postOpinion: value => async (state, actions) => {
    var loadingKey = {}
    loadingKey[value.opinion] = true

    actions.setIsLoading(loadingKey)
    var endpoint = ['/broadcasts', value.broadcastID, value.opinion].join('/')
    await POST(endpoint, value)
    .then(result => {
      actions.setOpinion(value.opinion)
    }).catch(err => {
      actions.setError(`Could not ${value} broadcast`)
    })

    loadingKey[value.opinion] = false
    actions.setIsLoading(loadingKey)
  },

  like: broadcastID => async (state, actions) => {
    actions.postOpinion({broadcastID: broadcastID, opinion: 'like'})
  },

  dislike: broadcastID => async (state, actions) => {
    actions.postOpinion({broadcastID: broadcastID, opinion: 'dislike'})
  },

  flag: broadcastID => async (state, actions) => {
    actions.postOpinion({broadcastID: broadcastID, opinion: 'flag'})
  },
}
