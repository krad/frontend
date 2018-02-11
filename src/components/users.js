import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { config } from '../config'

export const UserItemProfile = ({user}) =>
  <div class='media'>
    <div class='media-left'>
      <figure class='image is-48x48'>
        <img src={userProfileImgURL(user)} alt={userProfileImgAlt(user)} />
      </figure>
    </div>
    <div class='media-content'>
      <p class='title is-6'>{user.firstName} {user.lastName}</p>
      <p class='subtitle is-6'>@{user.username}</p>
    </div>
  </div>

const userProfileImgURL = (user) => {
  if (config.IsTesting) {
    return 'http://via.placeholder.com/96x96'
  } else {
    return '/images?dimensions=96x96&key=' + user.userID +'/profile.jpg'
  }
}

const userProfileImgAlt = (user) => {
  return [user.firstName, user.lastName].join(' ') + " profile pic"
}
