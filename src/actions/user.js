import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { GET, POST, UPLOAD } from '../network_client'
import { Profile } from './user/profile'
import { Header } from './user/header'

export const User = {
  header: Header,
  profile: Profile,
}
