import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { UserItemProfile } from './users'
import { ShowSpinnerIf } from './spinner'
import { LikeButton, DislikeButton, FlagButton } from './viewer_interactions'
import { CommentBox } from './comments'

import moment from 'moment'

export const PlayerView = (state, actions) => ({ location, match }) =>
  <watch oncreate={actions.fetchBroadcast}>
    <div class='container'>
      <VideoTag
        bucket={state.videoBucket}
        broadcastID={match.params['broadcastID']}
        state={state}
        actions={actions}
        />
      <ShowSpinnerIf isFetching={state.isFetching} />
      <ShowBroadcastInfoIf
        broadcast={state.currentBroadcast}
        state={state}
        actions={actions} />
    </div>
  </watch>

const ShowBroadcastInfoIf = ({broadcast, state, actions}) => {
  if (broadcast) {
    return <BroadcastInfo state={state} actions={actions} broadcast={broadcast} />
  }
}

const BroadcastInfo = ({state, actions, broadcast}) =>
  <section id='broadcast-info' class=''>
    <section class='section'>
      <BroadcastDetails broadcast={broadcast} />
      <br />

      <BroadcastControls
        broadcast={broadcast}
        state={state.viewerInteractions}
        actions={actions.viewerInteractions}  />

      <UserItemProfile user={broadcast.user} />
      <hr />
    </section>
    <CommentBox />
  </section>

const BroadcastDetails = ({broadcast}) =>
  <div>
    <p class='title'>{broadcast.title}</p>
    <p class='subtitle'>{moment(broadcast.createdAt).fromNow()}</p>
    <p class='subtitle is-6'>0 views</p>
  </div>

const BroadcastControls = ({state, actions, broadcast}) =>
  <div class='level-right'>
    <p class='level-item'><LikeButton state={state.like} actions={actions.like} broadcast={broadcast} /> </p>
    <p class='level-item'><DislikeButton state={state.dislike} actions={actions.dislike} broadcast={broadcast} /></p>
    <p class='level-item'><FlagButton state={state.flag} actions={actions.flag} broadcast={broadcast} /></p>
  </div>

const VideoTag = ({state, actions, bucket, broadcastID}) =>
  <video id={['player', broadcastID].join('-')}
    poster={[bucket, broadcastID, '0.jpg'].join('/')}
    oncreate={el => actions.configurePlayer(el, state, actions)}
    controls
    >
    <source src={[bucket, broadcastID, 'vod.m3u8'].join('/')} type='application/x-mpegURL' />
  </video>

const PlayerUserInfo = ({user}) =>
  <section id='video-user-info' class='card-content'>
    <div class='container'>
      <UserItemProfile user={user} />
    </div>
  </section>
