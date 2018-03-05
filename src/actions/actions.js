import { GET, POST } from '../network_client'
import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { User } from './user'
import { Broadcasts } from './broadcasts'
import { Broadcast } from './broadcast'
import { Channel } from './channel'
import { edit } from './user/details'

const plainview = require('@krad/plainview')

const updateBroadcasts = (broadcasts) => state => ({broadcasts: broadcasts})
const setCurrentBroadcast = (broadcast) => state => ({currentBroadcast: broadcast})

export const actions = {

  user: User,
  broadcasts: Broadcasts,
  currentBroadcast: Broadcast,
  channel: Channel,

  configurePlayer: el => state => {
    state.player = new plainview(el.id)
    state.player.setup(x => { })
  },

  beta: {
    setIsLoading: setIsLoading,
    setError: setError,
    setSignedUp: value => state => ({signedUp: value}),
    edit: edit,

    apply: () => async (state, actions) => {
      actions.setIsLoading(true)
      await POST('/interest', state.details)
      .then(result => {
        actions.setError(null)
        actions.setSignedUp(true)
      }).catch(err => {
        actions.setError('Problem applying for beta testing.')
        actions.setSignedUp(false)
      })
      actions.setIsLoading(false)
    }
  }

}
