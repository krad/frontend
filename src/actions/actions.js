import { GET, POST } from '../network_client'
import { fetchBroadcasts, fetchBroadcast } from './api_actions'
const plainview = require('@krad/plainview')

const setIsLoading = (isLoading) => state => ({isLoading: isLoading})
const setIsFetching = (isFetching) => state => ({isFetching: isFetching})
const setError = (errorMessage) => state => ({error: errorMessage})

const updateBroadcasts = (broadcasts) => state => ({broadcasts: broadcasts})
const setCurrentBroadcast = (broadcast) => state => ({currentBroadcast: broadcast})

export const actions = {

  fetchBroadcasts: fetchBroadcasts,
  fetchBroadcast: fetchBroadcast,
  setIsFetching: setIsFetching,
  setError: setError,
  updateBroadcasts: updateBroadcasts,
  setCurrentBroadcast: setCurrentBroadcast,

  currentBroadcast: {
    user: {},
    opinion: undefined,
    setIsLoading: setIsLoading,

    setOpinion: (value) => state => ({opinion: value}),

    like: (value) => async (state, actions) => {
      actions.setOpinion('like')
      actions.setIsLoading(true)
      setTimeout(() => {
        actions.setIsLoading(false)
      }, 500)
    },
    dislike: (value) => async(state, actions) => {
      actions.setIsLoading(true)
    },
    flag: (value) => async(state, actions) => {
      actions.setIsLoading(true)
    }

  },

  configurePlayer: el => state => {
    state.player = new plainview(el.id)
    state.player.play(x => { })
  },

}
