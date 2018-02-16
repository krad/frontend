import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { GET, POST, UPLOAD } from '../network_client'
import { Profile } from './user/profile'
import { Header } from './user/header'
import { Channel } from './user/channel'

export const User = {
  header: Header,
  profile: Profile,
  channel: Channel,
}
