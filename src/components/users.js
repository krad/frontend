import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { config } from '../config'
import { HorseshoeSpinner } from './spinner'

export const UserItemProfile = ({user}) =>
  <div class='media'>
    <div class='media-left'>
      <figure class='image is-48x48'>
        <Link to={userChannelURL(user)}>
          <UserProfileImage user={user} />
        </Link>
      </figure>
    </div>
    <div class='media-content'>
      <p><Link to={userChannelURL(user)} class='title is-6'>{user.firstName} {user.lastName}</Link></p>
      <p><Link to={userChannelURL(user)} class='subtitle is-6'>@{user.username}</Link></p>
    </div>
  </div>

export const UserProfileImage = ({user, dimensions}) =>
  <img src={userProfileImgURL(user, dimensions)} alt={userProfileImgAlt(user)} />

export const UserProfileNavItemLoading = () =>
  <div class='navbar-item'>
    <HorseshoeSpinner />
  </div>

export const UserProfileNavItem = ({user, logout}) => {
  return (
  <div class='navbar-item has-dropdrown is-hoverable'>
    <a class='navbar-link'>
      <UserProfileImage user={user} />
    </a>

    <UserProfileNavDropdown
    user={user}
    logout={logout} />
  </div>)
}

const UserProfileNavDropdown = ({user, logout}) =>
  <div class='navbar-dropdown'>
    <UserProfileHeaderChannelLink user={user} />
    <UserProfileHeaderProfileLink user={user} />
    <UserProfileHeaderLogoutLink logout={logout} />
  </div>

const UserProfileNavDropdownHeader = ({user}) =>
  <div class='navbar-item is-header'>
    <UserItemProfile user={user} />
  </div>

const UserProfileHeaderChannelLink = ({user}) =>
  <div class='navbar-item'>
    <Link to={userChannelURL(user)}>My Channel</Link>
  </div>

const UserProfileHeaderProfileLink = ({user}) =>
  <div class='navbar-item'>
    <Link to='/profile'>Manage Profile</Link>
  </div>

const UserProfileHeaderLogoutLink = ({logout}) =>
  <div class='navbar-item'>
    <a onclick={logout}>Logout</a>
  </div>

export const userProfileImgURL = (user, dimensions) => {
  if (!dimensions) { dimensions = "96x96" }

  if (config.IsTesting) {
    return 'https://via.placeholder.com/' + dimensions
  } else {
    return '/images?dimensions=' + dimensions + '&nocache=' + randomCode(4) + '&key=' + user.userID +'/profile.jpg'
  }
}

const userProfileImgAlt = (user) => {
  return [user.firstName, user.lastName].join(' ') + " profile pic"
}

const userChannelURL = (user) => {
  if (user.userID) {
    return ['/channel', user.userID].join('/')
  }
  return '/'
}

const randomCode = (length) => {
  var result = []
  var step;
  for (step = 0; step < length; step++) {
    result.push(getRandomIntInclusive(0, 9))
  }
  return result.join("")
}

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
