import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { UserItemProfile } from './users'
import { ShowSpinnerIf } from './spinner'
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
      <ShowBroadcastInfoIf broadcast={state.currentBroadcast} />
    </div>
  </watch>

const VideoTag = ({state, actions, bucket, broadcastID}) =>
  <video id={['player', broadcastID].join('-')}
    poster={[bucket, broadcastID, '0.jpg'].join('/')}
    oncreate={el => actions.configurePlayer(el, state, actions)}
    controls
    >
    <source src={[bucket, broadcastID, 'vod.m3u8'].join('/')} type='application/x-mpegURL' />
  </video>

const ShowBroadcastInfoIf = ({broadcast}) => {
  if (broadcast) { return BroadcastInfo(broadcast) }
}

const BroadcastInfo = (broadcast) =>
  <section id='broadcast-info' class=''>
    <section class='section'>
      <BroadcastDetails broadcast={broadcast} /><br />
      <BroadcastControls broadcast={broadcast} />
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

const BroadcastControls = ({broadcast}) =>
  <div class='level-right'>
    <p class='level-item'><LikeButton /></p>
    <p class='level-item'><DislikeButton /></p>
    <p class='level-item'><FlagButton /></p>
  </div>

const LikeButton = () =>
  <a class="button is-success">
    <span class="icon is-small"><i class="fas fa-thumbs-up"></i></span>
    <span>Like</span>
  </a>

const DislikeButton = () =>
  <a class="button is-info">
    <span class="icon is-small"><i class="fas fa-thumbs-down"></i></span>
    <span>Dislike</span>
  </a>

const FlagButton = () =>
  <a class="button is-danger">
    <span class="icon is-small"><i class="fas fa-flag"></i></span>
    <span>Flag</span>
  </a>

const CommentBox = () =>
  <section class='section'>

  </section>

const PlayerUserInfo = ({user}) =>
  <section id='video-user-info' class='card-content'>
    <div class='container'>
      <UserItemProfile user={user} />
    </div>
  </section>
