import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput } from './inputs'

export const SignupView = (state, actions) => ({ location, match }) =>
  <div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Sign Up</h3>
      <div class="box">
        <SignupForm formState={state.login} formActions={actions.login} />
      </div>
      <SMSDisclaimerComponent />
    </div>
  </div>

const SignupForm = ({formState, formActions}) =>
  <form id='signup'>
    <div class="field has-addons">
      <p class="control"><CountryCodeDropdown /></p>
      <p class="control has-icons-left"><PhoneNumberInput /></p>
    </div>
    <div><a id='signupButton' class='button is-block is-info'>Signup</a></div>
  </form>


const SMSDisclaimerComponent = () =>
  <p class='has-text-centered'>You will receive an SMS with a confirmation code.</p>
