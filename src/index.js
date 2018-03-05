import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { networkClient } from './network_client'
import { actions } from './actions/actions'
import { state } from './state/state'

import { HeaderSection } from './components/header'
import { BrowseVideos } from './components/videos_browser'
import { PlayerView } from './components/player_view'
import { LoginView } from './components/login'
import { SignupView } from './components/signup'
import { SignupVerifyView } from './components/verify'
import { ForgotPasswordView } from './components/forgot_password'
import { ManageProfileView } from './components/profile'
import { UserChannelView } from './components/user_channel'
import { HelpView } from './components/help'
import { BetaSignupView } from './components/beta'
import logger from "@hyperapp/logger"

actions.location = location.actions
state.location   = location.state

const view = (state, actions) =>
  <main>
    <HeaderSection user={state.user} {...actions.user} />
    <Route path='/' render={BrowseVideos(state, actions)} />
    <Route path='/beta' render={BetaSignupView(state.beta, actions.beta)} />
    <Route path='/watch/:broadcastID' render={PlayerView(state, actions)} />
    <Route path='/login' render={LoginView(state.user, actions.user)} />
    <Route path='/signup' render={SignupView(state.user, actions.user)} />
    <Route path='/verify' render={SignupVerifyView(state.user, actions.user)} />
    <Route path='/profile' render={ManageProfileView(state.user, actions.user)} />
    <Route path='/channel/:userID' render={UserChannelView(state.channel, actions.channel)} />
    <Route path='/forgotpassword' render={ForgotPasswordView(state, actions)} />
    <Route path='/help' render={HelpView(state, actions)} />
  </main>

// const main        = logger({})(app)(state, actions, view, document.body)
const main        = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(main.location)
