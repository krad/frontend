import { GET, POST } from '../network_client'
import { fetchBroadcasts, fetchBroadcast } from './api_actions'
import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { Authentication } from './authentication'
const plainview = require('@krad/plainview')

const updateBroadcasts = (broadcasts) => state => ({broadcasts: broadcasts})
const setCurrentBroadcast = (broadcast) => state => ({currentBroadcast: broadcast})

export const actions = {

  fetchBroadcasts: fetchBroadcasts,
  fetchBroadcast: fetchBroadcast,
  setIsFetching: setIsFetching,
  setError: setError,
  updateBroadcasts: updateBroadcasts,
  setCurrentBroadcast: setCurrentBroadcast,

  user: Authentication,

  currentBroadcast: {
    user: {},
    setError: setError,
    setIsLoading: setIsLoading,
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

  },

  configurePlayer: el => state => {
    state.player = new plainview(el.id)
    state.player.play(x => { })
  },

}
