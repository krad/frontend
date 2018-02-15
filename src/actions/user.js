import { setIsLoading, setIsFetching, setError } from './async_helpers'
import { GET, POST, UPLOAD } from '../network_client'
import { Authentication } from './user/authentication'
import { Profile } from './user/profile'
import { Header } from './user/header'

export const User = {
  header: Header,
  authentication: Authentication,
  profile: Profile,
}
