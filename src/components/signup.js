import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput, StringInput } from './inputs'

export const SignupView = (user, actions) => ({ location, match }) => {
  var check = redirectChecks(user.profile.details, user.profile)
  if (check) { return check }

  return (<SignupContainer user={user.profile} authentication={actions.profile} />)
}

const redirectChecks = (user, userState) => {
  if (user) {
    if (user.userID && user.isVerified) { return <Redirect to='/' /> }
    if (user.userID && !userState.isLoggedIn) { return <Redirect to='/verify' /> }
    if (user.userID && userState.isLoggedIn && !user.isVerified) { return <Redirect to='/profile' /> }
  }
  return null
}

const SignupContainer = ({user, authentication}) =>
  <div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Sign Up</h3>
      <div class="box">
        <SignupForm user={user} error={user.error} {...authentication} />
      </div>
      <SMSDisclaimerComponent />
    </div>
  </div>

const SignupForm = ({user, edit, signup, error}) =>
  <form id='signup'>
    <SignUpPhoneNumberField details={user.details} edit={edit} signup={signup} />
    <div class='field'>
      <p class='control'>
        <a id='signupButton' class={isLoadingClass(user)} onclick={signup}>Signup</a>
      </p>
    </div>
    <p class='help is-danger has-text-centered'>{error}</p>
  </form>

const SignUpPhoneNumberField = ({details, edit, signup}) =>
  <div class="field has-addons">
    <p class="control"><CountryCodeDropdown change={edit} /></p>
    <p class="control is-expanded has-icons-left">
      <SignUpPhoneNumberInput phoneNumber={details.phoneNumber} edit={edit} signup={signup} />
    </p>
  </div>

const SignUpPhoneNumberInput = ({phoneNumber, edit, signup}) =>
  <PhoneNumberInput value={phoneNumber} change={edit} enter={signup} />

const isLoadingClass = (user) => {
  if (user) {
    if (user.isChangingAuthState) {
      return "button is-block is-info is-loading"
    }
  }
  return "button is-block is-info"
}

const SMSDisclaimerComponent = () =>
  <p class='has-text-centered'>You will receive an SMS with a confirmation code.</p>
