import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { networkClient } from './network_client'
import { actions } from './actions'
import { state } from './state'

import { HeaderSection } from './header'
import { BrowseVideos } from './videos_browser'
import { PlayerView } from './player_view'
import { LoginView } from './login'
import { SignupView } from './signup'

actions.location = location.actions
state.location   = location.state

const view = (state, actions) =>
  <main>
    <HeaderSection user={state.user} />
    <Route path='/' render={BrowseVideos(state, actions)} />
    <Route path='/watch/:broadcastID' render={PlayerView(state, actions)} />
    <Route path='/login' render={LoginView(state, actions)} />
    <Route path='/signup' render={SignupView(state, actions)} />
  </main>

const main        = app(state, actions, view, document.body)
const unsubscribe = location.subscribe(main.location)
