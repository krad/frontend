import { networkClient } from './network_client'
const plainview = require('@krad/plainview')

export const actions = {

  log: (thing) => {
    console.log(thing)
  },

  fetchBroadcasts: (state, actions) => {
    networkClient.get('/broadcasts')
    .then(broadcasts => {
      console.log(actions);
      console.log(state);
      state.broadcasts = broadcasts
      console.log(state);

      // actions.updateBroadcasts(state, broadcasts)
    }).catch(err => {
      console.log(err)
    })
  },

  updateBroadcasts: (state, broadcasts) => {
    state.broadcasts = broadcasts
  },

  fetchBroadcast: (broadcastID) => {
    var endpoint = ['/broadcasts', broadcastID].join('/')
    networkClient.get(endpoint)
    .then(broadcast => {
      actions.setCurrentBroadcast(broadcast)
    }).catch(err => {
      console.log(err)
    })
  },

  setCurrentBroadcast: (broadcast) => {
    state.currentBroadcast = broadcast
  },

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
