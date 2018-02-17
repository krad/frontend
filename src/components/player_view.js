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
      return (<BroadcastInfo
                broadcast={broadcast}
                like={like}
                dislike={dislike}
                flag={flag} />)
    }
  }

  return (<div></div>)
}

const BroadcastInfo = ({broadcast, like, dislike, flag}) =>
  <section id='broadcast-info' class=''>
    <section class='section'>
      <div class='level'>
        <div class='level-left'>
          <BroadcastDetails broadcast={broadcast.details} />
        </div>
        <div class='level-right'>
          <BroadcastControls broadcast={broadcast} like={like} dislike={dislike} flag={flag} />
        </div>
      </div>
      <hr />
      <PlayerUserInfo broadcast={broadcast.details} />
      <hr />
    </section>
    <CommentBox />
  </section>

const BroadcastDetails = ({broadcast}) => {
  if (broadcast) {
    return (<div>
      <p class='title'>{broadcast.title}</p>
      <p class='subtitle'>{moment(broadcast.createdAt).fromNow()}</p>
      <p class='subtitle'>{broadcast.views} views</p>
    </div>)
  }

  return (<div></div>)
}

const BroadcastControls = ({broadcast, like, dislike, flag}) =>
  <div class='level-item'>
    <div class='level is-mobile'>
      <div class='level-item has-text-centered'>

        <OpinionButton
          details={broadcast.details}
          opinion={broadcast.like}
          action={like.execute}
          name='Like' />

      </div>
      <div class='level-item has-text-centered'>

        <OpinionButton
          details={broadcast.details}
          opinion={broadcast.dislike}
          action={dislike.execute}
          name='Dislike' />

      </div>

      <div class='level-item has-text-centered'>
        <OpinionButton
          details={broadcast.details}
          opinion={broadcast.flag}
          action={flag.execute}
          name='Flag' />
      </div>

    </div>
  </div>

const VideoTag = ({state, actions, bucket, broadcastID}) =>
  <video id={['player', broadcastID].join('-')}
    poster={[bucket, broadcastID, '0.jpg'].join('/')}
    oncreate={el => actions.configurePlayer(el, state, actions)}
    controls
    >
    <source src={[bucket, broadcastID, 'vod.m3u8'].join('/')} type='application/x-mpegURL' />
  </video>

const PlayerUserInfo = ({broadcast}) =>
  <section id='video-user-info' class='card-content'>
    <div class='container'>
      <UserItemProfile user={broadcast.user} />
    </div>
  </section>
