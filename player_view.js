import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { UserItemProfile } from './users'

export const PlayerView = (state, actions) => ({ location, match }) =>
  <div class='container'>
    <VideoTag
      bucket={state.videoBucket}
      broadcastID={match.params['broadcastID']}
      state={state}
      actions={actions}
      />

      if (state.currentBroadcast) {
        <BroadcastInfo user={state.currentBroadcast} />
      }
  </div>

const VideoTag = ({state, actions, bucket, broadcastID}) =>
  <video id={['player', broadcastID].join('-')}
    poster={[bucket, broadcastID, '0.jpg'].join('/')}
    oncreate={el => actions.configurePlayer(el, state, actions)}
    controls
    >
    <source src={[bucket, broadcastID, 'vod.m3u8'].join('/')} type='application/x-mpegURL' />
  </video>

const BroadcastInfo = ({broadcast}) =>
  <div class='media'>
    <div class='media-content'>
      <p class='title is-6'>{broadcast.title}</p>
    </div>
  </div>

const PlayerUserInfo = ({user}) =>
  <section id='video-user-info' class='card-content'>
    <div class='container'>
      <UserItemProfile user={user} />
    </div>
  </section>
