import { GET, POST } from './network_client'
const plainview = require('@krad/plainview')

const setIsLoading = (isLoading) => state => ({isLoading: isLoading})
const setHasClicked = (hasClicked) => state => ({hasClicked: hasClicked})

export const actions = {

  fetchBroadcasts:  () => async (state, actions) => {
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

  updateBroadcasts: broadcasts => state => ({broadcasts: broadcasts}),

  fetchBroadcast: broadcastID => async (state, actions) => {
    actions.setIsFetching(true)
    await GET(['/broadcasts', broadcastID].join('/'))
    .then(broadcast => {
      actions.setCurrentBroadcast(broadcast)
      actions.setIsFetching(false)
    }).catch(err => {
      actions.setError('Could not fetch broadcast')
    })
  },

  viewerInteractions: {
    like: {
      setIsLoading: setIsLoading,
      setHasClicked: setHasClicked,
      like: value => async (state, actions) => {
        actions.setIsLoading(true)
        setTimeout(() => {
          actions.setHasClicked(true)
        }, 1000)
      },
    },

    dislike: {
      setIsLoading: setIsLoading,
      dislike: value => (state, actions) => {
        console.log(state, actions);
        return actions.setIsLoading(true)
      },
    },

    flag: {
      setIsLoading: setIsLoading,
      flag: value => (state, actions) => {
        return actions.setIsLoading(true)
      },
    }

  },

  setIsFetching: (isFetching) => state => ({isFetching: isFetching}),

  setError: (errorMessage) => state => ({error: errorMessage}),

  setCurrentBroadcast: broadcast => state => ({currentBroadcast: broadcast}),

  configurePlayer: el => state => {
    state.player = new plainview(el.id)
    state.player.play(x => { })
  },

  removeCurrentBroadcast: () => {
    state.currentBroadcast = null
    state.player = null
  }
}
