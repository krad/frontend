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
import { ForgotPasswordView } from './components/forgot_password'
import { HelpView } from './components/help'

actions.location = location.actions
state.location   = location.state

const view = (state, actions) =>
  <main>
    <HeaderSection user={state.user} actions={actions.user} />
    <Route path='/' render={BrowseVideos(state, actions)} />
    <Route path='/watch/:broadcastID' render={PlayerView(state, actions)} />
    <Route path='/login' render={LoginView(state, actions)} />
    <Route path='/signup' render={SignupView(state, actions)} />
    <Route path='/forgotpassword' render={ForgotPasswordView(state, actions)} />
    <Route path='/help' render={HelpView(state, actions)} />
  </main>

const main        = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
