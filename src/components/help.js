import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

export const HelpView = (state, actions) => ({ location, match }) =>
  <div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Help</h3>
      <div class="box">
        <p>Too bad.</p>
      </div>
    </div>
  </div>
