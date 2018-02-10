import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { HeroSection } from './header'
import { UserItemProfile } from './users'

export const BrowseVideos = (state, actions) => ({ location, match }) => (
  <browse oncreate={actions.fetchBroadcasts}>
    <HeroSection motto={state.motto} />
    <ShowSpinnerIf isFetching={state.isFetching} />

    <VideosSection
      bucket={state.videoBucket}
      broadcasts={state.broadcasts}
      state={state}
      actions={actions}
      />
  </browse>
)

const ShowSpinnerIf = ({isFetching}) => {
  if (isFetching) { return LoadingSpinner() }
  else { return "" }
}

const LoadingSpinner = () =>
  <div class='container'>
    <div class='columns is-mobile'>
      <div class='column is-half is-offset-one-quarter has-text-centered'>
        <img src='/dist/Wave-1s-200px.gif' />
      </div>
    </div>
  </div>

const VideosSection = ({bucket, broadcasts}) =>
    <section class='section'>
      <div class='container'>
        <div class='columns is-multiline'>
          <VideoList bucket={bucket} broadcasts={broadcasts} />
        </div>
      </div>
    </section>

const VideoList = ({bucket, broadcasts}) =>
  broadcasts.map(broadcast => <VideoItem bucket={bucket} broadcast={broadcast} />)

const VideoItem = ({bucket, broadcast}) =>
  <div class='column is-one-third'>
    <div class='card bm--card-equal-height'>
      <VideoItemPoster bucket={bucket} broadcast={broadcast} />
      <VideoItemContent broadcast={broadcast} />
    </div>
  </div>

const VideoItemPoster = ({bucket, broadcast}) =>
  <div class='card-image'>
    <figure class='image is-16by9'>
      <Link to={['/watch', broadcast.broadcastID].join('/')}>
        <img src={posterURL(bucket, broadcast)} />
      </Link>
    </figure>
  </div>

const posterURL = (bucket, broadcast) => {
  if (broadcast.thumbnails && broadcast.thumbnails.length > 0) {
    return [bucket, broadcast.broadcastID, broadcast.thumbnails[0]].join('/')
  } else {
    return ''
  }
}

const VideoItemContent = ({broadcast}) =>
  <div class='card-content'>
    <UserItemProfile user={broadcast.user} />
    <VideoItemDetails broadcast={broadcast} />
  </div>

const VideoItemDetails = ({broadcast}) =>
  <div class='media'>
    <div class='media-content'>
      <p class='title is-6'>{broadcast.title}</p>
    </div>
  </div>
