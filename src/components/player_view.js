import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { UserItemProfile } from './users'
import { ShowSpinnerIf } from './spinner'
import { OpinionButton } from './broadcast_interactions'
import { CommentBox } from './comments'
import { config } from '../config'

import moment from 'moment'

export const PlayerView = (state, actions) => ({ location, match }) =>
  <watch
    oncreate={() => actions.currentBroadcast.notifyAndFetch(match.params['broadcastID'])}>
    <div class='container'>
      <VideoTag
        bucket={config.VideoBucket}
        broadcastID={match.params['broadcastID']}
        state={state}
        actions={actions}
        />

        <ShowSpinnerIf isFetching={state.currentBroadcast.isFetching} />
        <ShowBroadcastInfoIf broadcast={state.currentBroadcast} {...actions.currentBroadcast} />
    </div>
  </watch>

const ShowBroadcastInfoIf = ({broadcast, like, dislike, flag}) => {
  if (broadcast) {
    if (broadcast.details) {
      return (<BroadcastInfo broadcast={broadcast.details} like={like} dislike={dislike} flag={flag} />)
    }
  }
}

const BroadcastInfo = ({broadcast, like, dislike, flag}) =>
  <section id='broadcast-info' class=''>
    <section class='section'>
      <BroadcastDetails broadcast={broadcast} />
      <br />
      <BroadcastControls broadcast={broadcast} like={like} dislike={dislike} flag={flag} />
      <UserItemProfile user={broadcast.user} />
      <hr />
    </section>
    <CommentBox />
  </section>

const BroadcastDetails = ({broadcast}) =>
  <div>
    <p class='title'>{broadcast.title}</p>
    <p class='subtitle'>{moment(broadcast.createdAt).fromNow()}</p>
    <p class='subtitle'>{broadcast.views} views</p>
  </div>

const BroadcastControls = ({broadcast, like, dislike, flag}) =>
  <div class='level-right'>
    <p class='level-item'><OpinionButton broadcast={broadcast} opinion={like} name='Like' /></p>
    <p class='level-item'><OpinionButton broadcast={broadcast} opinion={dislike} name='Dislike' /></p>
    <p class='level-item'><OpinionButton broadcast={broadcast} opinion={flag} name='Flag' /></p>
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
