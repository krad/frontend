import { GET, POST } from '../network_client'
import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { User } from './user'
import { Broadcasts } from './broadcasts'
import { Broadcast } from './broadcast'

const plainview = require('@krad/plainview')

const updateBroadcasts = (broadcasts) => state => ({broadcasts: broadcasts})
const setCurrentBroadcast = (broadcast) => state => ({currentBroadcast: broadcast})

export const actions = {

  user: User,
  broadcasts: Broadcasts,
  currentBroadcast: Broadcast,
  
  configurePlayer: el => state => {
    state.player = new plainview(el.id)
    state.player.play(x => { })
  },

}
