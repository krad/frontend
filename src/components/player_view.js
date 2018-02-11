import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { UserItemProfile } from './users'
import { ShowSpinnerIf } from './spinner'
import { OpinionButton } from './broadcast_interactions'
import { CommentBox } from './comments'
import { config } from '../config'

import moment from 'moment'

export const PlayerView = (state, actions) => ({ location, match }) =>
  <watch oncreate={() => actions.fetchBroadcast(match.params['broadcastID'])}>
    <div class='container'>
      <VideoTag
        bucket={config.VideoBucket}
        broadcastID={match.params['broadcastID']}
        state={state}
        actions={actions}
        />

      <ShowSpinnerIf isFetching={state.isFetching} />
      <ShowBroadcastInfoIf broadcast={state.currentBroadcast} broadcastActions={actions.currentBroadcast}/>
    </div>
  </watch>

const ShowBroadcastInfoIf = ({broadcast, broadcastActions}) => {
  if (Object.keys(broadcast).length > 2) { return <BroadcastInfo broadcast={broadcast} broadcastActions={broadcastActions}/> }
}

const BroadcastInfo = ({broadcast, broadcastActions}) =>
  <section id='broadcast-info' class=''>
    <section class='section'>
      <BroadcastDetails broadcast={broadcast} />
      <br />
      <BroadcastControls broadcast={broadcast} broadcastActions={broadcastActions}/>
      <UserItemProfile user={broadcast.user} />
      <hr />
    </section>
    <CommentBox />
  </section>

const BroadcastDetails = ({broadcast}) =>
  <div>
    <p class='title'>{broadcast.title}</p>
    <p class='subtitle'>{moment(broadcast.createdAt).fromNow()}</p>
  </div>

const BroadcastControls = ({broadcast, broadcastActions}) =>
  <div class='level-right'>
    <p class='level-item'><OpinionButton broadcast={broadcast} opinion={broadcastActions.like} name='Like' /></p>
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
