import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"

export const UserChannelView = (state, actions) => ({ location, match }) => (
  <channel>
    <section class='section'>
      {match.params['userID']}
    </section>
  </channel>
)
