import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"
import { UserProfileImage } from './users'
import { ShowSpinnerIf } from './spinner'
import { VideosSection } from './videos_browser'
import { config } from '../config'

export const UserChannelView = (state, actions) => ({ location, match }) => (
  <channel oncreate={() => actions.fetch(match.params['userID'])} >
    <ShowSpinnerIf isFetching={state.isFetching} />
    <ChannelContent bucket={config.VideoBucket}
                broadcasts={state.broadcasts}
                      user={state.user}/>
  </channel>
)

const ChannelContent = ({bucket, broadcasts, user}) =>
  <div>
    <UserSection user={user} />
    <VideosSection bucket={bucket} broadcasts={broadcasts} />
  </div>

const UserSection = ({user}) => {
  if (!user.userID) {
    return (<div></div>)
  }

  return (
    <section class='hero is-info'>
      <div class='hero-body'>
        <div class='container'>
          <div class='media'>
            <div class='media-left'>
              <figure class='image is-100x100'>
                <UserProfileImage user={user} dimensions={'100x100'}/>
              </figure>
            </div>
            <div class='media-content'>
              <p class='title'>{user.firstName} {user.lastName}</p>
              <p class='subtitle is-4'>
                @{user.username}
                <p class='subtitle is-6'>{user.numberOfBroadcasts} broadcasts</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>)
}
