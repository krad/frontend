import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { networkClient } from './network_client'

const actions = require('./actions').actions
const state = require('./state').state

actions.location = location.actions
state.location = location.state

const HeaderSection = ({ input, user }) =>
  <nav class='navbar is-warning' role='navigation' aria-label='main navigation'>
    <HeaderLeftSection user={user} />
  </nav>

const HeaderLeftSection = ({user}) =>
  <div class='navbar-start'>
    <div class='navbar-brand'>
      <a href='/' class='navbar-item'>
        <img src='https://www.krad.io/public/images/krad.png' alt='krad.tv - pretty far out radical stuff' />
      </a>
    </div>
  </div>

const HeaderRightSection = ({user}) =>
  <div class='navbar-end'>
    <HeaderSignUpSection />
  </div>

const HeaderSignUpSection = () =>
  <span>
    <div class='navbar-item>'><Link to='/signup' class='navbar-link'>Signup</Link></div>
    <div class='navbar-item'><Link to='/login' class='navbar-link'>Login</Link></div>
  </span>

const HeaderSearch = () =>
  <div class='navbar-item'>
    <form class='field has-addons' role='search'>
      <div class='control'>
        <input type='text' class='input' placeholder='Search' />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </form>
  </div>

const HeroSection = ({motto}) =>
  <section class='hero is-info'>
    <div class='hero-body'>
      <div class='container'>
        <h1 class='title'>krad.tv</h1>
        <h2 class='subtitle'>{motto ? motto : 'Some pretty far out radical stuff.'}</h2>
      </div>
    </div>
  </section>

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
    return 'wut'
  }
}

const VideoItemDetails = ({broadcast}) =>
  <div class='media'>
    <div class='media-content'>
      <p class='title is-6'>{broadcast.title}</p>
    </div>
  </div>

const VideoItemContent = ({broadcast}) =>
  <div class='card-content'>
    <UserItemProfile user={broadcast.user} />
    <VideoItemDetails broadcast={broadcast} />
  </div>

const UserItemProfile = ({user}) =>
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
  if (process.NODE_ENV) {
      return '/images?dimensions=96x96&key=' + user.userID +'/profile.jpg'
  } else {
      return 'http://via.placeholder.com/96x96'
  }
}

const userProfileImgAlt = (user) => {
  return [user.firstName, user.lastName].join(' ') + " profile pic"
}

const BroadcastInfo = ({broadcast}) =>
  <div class='media'>
    <div class='media-content'>
      <p class='title is-6'>{broadcast.title}</p>
    </div>
  </div>

const BrowseVideos = ({ location, match }) => (
  <browse oncreate={actions.fetchBroadcasts(state, actions)}>
    <HeroSection motto={state.motto} />
    <VideosSection
      bucket={state.videoBucket}
      broadcasts={state.broadcasts}
      actions={actions}
      state={state}
      />
      <div class='container'>
        <h1>{match.length}</h1>
      </div>
  </browse>
)

const PlayerView = ({location, match}) =>
  <div class='container' oncreate={actions.fetchBroadcast(match.params['broadcastID'])}>
    <VideoTag bucket={state.videoBucket} broadcastID={match.params['broadcastID']} />
    <BroadcastStatefulInfo broadcast={state.currentBroadcast}/>
  </div>

const BroadcastStatefulInfo = ({broadcast}) => {
  if (broadcast) {
    return BroadcastInfoReady(broadcast)
  } else {
    return BroadcastInfoNotReady()
  }
}

const BroadcastInfoReady = ({broadcast}) =>
  <div>
    <PlayerVideoInfo broadcast={broadcast} />
    <hr />
    <PlayerUserInfo user={broadcast.user} />
  </div>


const BroadcastInfoNotReady = () =>
  <div></div>

const PlayerVideoInfo = ({broadcast}) =>
  <section id='video-info' class='section'>
    <div class='container'>
      <h2 class='title'>{broadcast.title}</h2>
      <h3 class='subtitle'>0 views</h3>
    </div>
  </section>

const PlayerUserInfo = ({user}) =>
  <section id='video-user-info' class='card-content'>
    <div class='container'>
      <UserItemProfile user={user} />
    </div>
  </section>

const VideoTag = ({bucket, broadcastID}) =>
  <video id={['player', broadcastID].join('-')}
  controls
  poster={[bucket, broadcastID, '0.jpg'].join('/')}
  oncreate={el => actions.configurePlayer(el, state, actions)}
  >
    <source src={[bucket, broadcastID, 'vod.m3u8'].join('/')} type='application/x-mpegURL' />
  </video>

const MiddleBoxForm = ({title, formComponent, bottomComponent}) =>
  <div class="column is-4 is-offset-4">
    <h3 class="title has-text-grey">{title}</h3>
    <div class="box">
      {formComponent}
    </div>
    {bottomComponent}
  </div>

const LoginView = ({location, match}) =>
  <div class='container'>
    <MiddleBoxForm title='Login'
    formComponent={LoginForm({formID: 'login'})}
    bottomComponent={OtherAuthOptionsComponent()}/>
  </div>

const SignupView = ({location, match}) =>
  <div class='container'>
    <MiddleBoxForm title='Sign up'
    formComponent={SignupForm({formID: 'signup'})}
    bottomComponent={SMSDisclaimerComponent()} />
  </div>

const SignupForm = ({formID}) =>
  <form id={formID}>
    <div class="field has-addons">
      <p class="control"><CountryCodeDropdown /></p>
      <p class="control has-icons-left"><PhoneNumberInput /></p>
    </div>
    <div><a id='signupButton' class='button is-block is-info'>Signup</a></div>
  </form>

const LoginForm = ({formID}) =>
 <form id={formID}>
  <div class='field has-addons'>
    <p class='control'><CountryCodeDropdown /></p>
    <p class="control has-icons-left"><PhoneNumberInput /></p>
  </div>
  <div class='field'>
    <p class='control'><PasswordInput /></p>
  </div>
  <div class='field'>
    <label class='checkbox'>
      <input type='checkbox' />&nbsp;Remember me
    </label>
  </div>
  <a id='loginButton' class='button is-block is-info'>Login</a>
 </form>

const CountryCodeDropdown = () =>
  <span class='select'>
    <select name='countryCode'><option value='US'>🇺🇸 +1</option></select>
  </span>

const PhoneNumberInput = () =>
  <span class='phoneInput'>
    <input class='input' name='phoneNumber' type='phone' placeholder='8557975723' />
    <span class='icon is-small is-left'><i class='fa fa-phone'></i></span>
  </span>

const PasswordInput = () =>
  <input class='input' name='password' type='password' placeholder='Password' />

const SMSDisclaimerComponent = () =>
  <p>You will receive an SMS with a confirmation code.</p>

const OtherAuthOptionsComponent = () =>
  <p class="has-text-grey">
    <Link to='/signup'>Sign Up</Link> &nbsp;·&nbsp;
    <Link to='/forgotpassword'>Forgot Password</Link> &nbsp;·&nbsp;
    <Link to='/help'>Need Help?</Link> &nbsp;·&nbsp;
  </p>

const view = (state) =>
  <main>
    <HeaderSection user={state.user} />
    <Route path='/' render={BrowseVideos} />
    <Route path='/watch/:broadcastID' render={PlayerView} />
    <Route path='/login' render={LoginView} />
    <Route path='/signup' render={SignupView} />
  </main>

const main = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(actions.location)
