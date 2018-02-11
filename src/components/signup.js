import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput } from './inputs'

export const SignupView = (state, actions) => ({ location, match }) =>
  <section class='section is-centered'>
    <div class="card has-text-centered is-wide">
      <header class="card-header">
        <h1 class='title is-3'>Sign up</h1>
      </header>
      <div class="card-content">
        <SignupForm />
      </div>
      <footer class="card-footer is-centered"><SMSDisclaimerComponent /></footer>
    </div>
  </section>

const SMSDisclaimerComponent = () =>
  <p>You will receive an SMS with a confirmation code.</p>


const SignupForm = () =>
  <form id='signup'>
    <div class="field has-addons">
      <p class="control"><CountryCodeDropdown /></p>
      <p class="control has-icons-left"><PhoneNumberInput /></p>
    </div>
    <div><a id='signupButton' class='button is-block is-info'>Signup</a></div>
  </form>
