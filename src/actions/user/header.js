import { setIsLoading, setError } from '../async_helpers'
import { GET, POST } from '../../network_client'

export const Header = {
  hamburger: value => state => {
    if (state.active) {
      return {active: false}
    } else {
      return {active: true}
    }
  },
}
