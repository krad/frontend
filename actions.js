import { networkClient } from './network_client'
const plainview = require('@krad/plainview')

export const actions = {

  log: (thing) => {
    console.log(thing)
  },

  fetchBroadcasts:  () => async (state, actions) => {
    networkClient.get('/broadcasts')
    .then(broadcasts => {
      actions.updateBroadcasts(broadcasts)
      console.log(broadcasts);
    }).catch(err => {
      console.log(err)
    })
  },

  updateBroadcasts: broadcasts => state => ({broadcasts: broadcasts}),

  fetchBroadcast: (broadcastID) => {
    var endpoint = ['/broadcasts', broadcastID].join('/')
    networkClient.get(endpoint)
    .then(broadcast => {
      actions.setCurrentBroadcast(broadcast)
    }).catch(err => {
      console.log(err)
    })
  },

  setCurrentBroadcast: broadcast => state => ({currentBroadcast: broadcast}),

  configurePlayer: (el, state, actions) => {
    state.player = new plainview(el.id)
    state.player.play(x => { console.log(x) })
    document.wut = state.player
  },

  removeCurrentBroadcast: () => {
    state.currentBroadcast = null
    state.player = null
  }
}
