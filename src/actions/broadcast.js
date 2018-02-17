import { GET, POST } from '../network_client'
import { setIsLoading, setIsFetching, setError } from './async_helpers'

export const Broadcast = {
  user: {},
  setError: setError,
  setIsLoading: setIsLoading,
  setIsFetching: setIsFetching,

  setDetails: (value) => state => ({details: value}),

  fetch: (broadcastID) => async (state, actions) => {
    actions.setIsFetching(true)
    GET(['/broadcasts', broadcastID].join('/'))
    .then(broadcast => {
      actions.setDetails(broadcast)
      actions.setIsFetching(false)
    }).catch(err => {
      actions.setError('Could not fetch broadcast')
    })
  },

  notifyView: (broadcastID) => async (state, actions) => {
    await POST(['/broadcasts', broadcastID, 'viewed'].join('/'), {})
    .then(result => {})
    .catch(err => {})
  },

  notifyAndFetch: (broadcastID) => async (state, actions) => {
    actions.fetch(broadcastID)
    actions.notifyView(broadcastID)
  },

  like: {
    setIsLoading: setIsLoading,
    setValue: value => state => ({value: value}),
    execute: broadcastID => async (state, actions) => {
      actions.setIsLoading(true)
      var endpoint = ['/broadcasts', broadcastID, 'like'].join('/')
      await POST(endpoint, {}).then(result => {
        actions.setValue(true)
      }).catch(err => {
        actions.setValue(false)
      })
      actions.setIsLoading(false)
    },
  },

  dislike: {
    setIsLoading: setIsLoading,
    setValue: value => state => ({value: value}),
    execute: broadcastID => async (state, actions) => {
      actions.setIsLoading(true)
      var endpoint = ['/broadcasts', broadcastID, 'dislike'].join('/')
      await POST(endpoint, {}).then(result => {
        actions.setValue(true)
      }).catch(err => {
        actions.setValue(false)
      })
      actions.setIsLoading(false)
    },
  },

  flag: {
    setIsLoading: setIsLoading,
    setValue: value => state => ({value: value}),
    execute: broadcastID => async (state, actions) => {
      actions.setIsLoading(true)
      var endpoint = ['/broadcasts', broadcastID, 'flagged'].join('/')
      await POST(endpoint, {}).then(result => {
        actions.setValue(true)
      }).catch(err => {
        actions.setValue(false)
      })
      actions.setIsLoading(false)
    },
  },
}
