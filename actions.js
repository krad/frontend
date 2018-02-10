import { networkClient } from './network_client'
const plainview = require('@krad/plainview')

export const actions = {

  fetchBroadcasts:  () => async (state, actions) => {
    actions.setIsFetching(true)
    await networkClient.get('/broadcasts')
    .then(broadcasts => {
      actions.updateBroadcasts(broadcasts)
      actions.setIsFetching(false)
    })
    .catch(err => { console.log(err) })
  },

  updateBroadcasts: broadcasts => state => ({broadcasts: broadcasts}),

  fetchBroadcast: broadcastID => async (state, actions) => {
    actions.setIsFetching(true)
    await networkClient.get(['/broadcasts', broadcastID].join('/'))
    .then(broadcast => {
      actions.setCurrentBroadcast(broadcast)
      actions.setIsFetching(false)
    }).catch(err => {
      console.log(err)
    })
  },

  setIsFetching: (isFetching) => state => ({isFetching: isFetching}),

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
