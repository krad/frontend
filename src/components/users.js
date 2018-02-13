import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { config } from '../config'
import { HorseshoeSpinner } from './spinner'

export const UserItemProfile = ({user}) =>
  <div class='media'>
    <div class='media-left'>
      <figure class='image is-48x48'>
        <UserProfileImage user={user} />
      </figure>
    </div>
    <div class='media-content'>
      <p class='title is-6'>{user.firstName} {user.lastName}</p>
      <p class='subtitle is-6'>@{user.username}</p>
    </div>
  </div>

export const UserProfileImage = ({user}) =>
  <img src={userProfileImgURL(user)} alt={userProfileImgAlt(user)} />

export const UserProfileNavItemLoading = () =>
  <div class='navbar-item'>
    <HorseshoeSpinner />
  </div>

export const UserProfileNavItem = ({user, logout}) => {
  if (user.isLoading || user.isChangingAuthState) {
    return (<UserProfileNavItemLoading />)
  }

  return (<div class='navbar-item has-dropdrown is-hoverable'>
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
    <UserProfileHeaderLogoutLink logout={logout} />
  </div>

const UserProfileNavDropdownHeader = ({user}) =>
  <div class='navbar-item is-header'>
    <UserItemProfile user={user} />
  </div>

const UserProfileHeaderChannelLink = ({user}) =>
  <div class='navbar-item'>
    <a>My Channel</a>
  </div>

const UserProfileHeaderLogoutLink = ({logout}) =>
  <div class='navbar-item'>
    <a onclick={logout}>Logout</a>
  </div>

const userProfileImgURL = (user) => {
  if (config.IsTesting) {
    return 'https://via.placeholder.com/96x96'
  } else {
    return '/images?dimensions=96x96&key=' + user.userID +'/profile.jpg'
  }
}

const userProfileImgAlt = (user) => {
  return [user.firstName, user.lastName].join(' ') + " profile pic"
}
