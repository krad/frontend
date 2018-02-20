import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput } from './inputs'

export const ForgotPasswordView = (state, actions) => ({ location, match }) =>
  <div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Forgot Password</h3>
      <div class="box">
        <p>Too bad.</p>
      </div>
    </div>
  </div>
