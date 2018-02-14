import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput, StringInput } from './inputs'

export const SignupView = (user, actions) => ({ location, match }) => {
  if (user.userID && user.isVerified) { return <Redirect to='/' /> }
  if (user.userID && !user.isLoggedIn) { return <Redirect to='/verify' /> }
  if (user.userID && user.isLoggedIn && !user.isVerified) { return <Redirect to='/profile' /> }
  return (
  <div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Sign Up</h3>
      <div class="box">
        <SignupForm user={user} {...actions.user} />
      </div>
      <SMSDisclaimerComponent />
    </div>
  </div>)
}

const SignupForm = ({user, edit, signup}) =>
  <form id='signup'>
    <div class="field has-addons">
      <p class="control"><CountryCodeDropdown change={edit} /></p>
      <p class="control is-expanded has-icons-left">
        <PhoneNumberInput
          value={user.phoneNumber}
          change={edit}
          enter={signup}
          />
      </p>
    </div>
    <div class='field'>
      <p class='control'>
        <a id='signupButton' class={isLoadingClass(user)} onclick={signup} >Signup</a>
      </p>
    </div>
    <p class='has-text-centered>'>{user.error}</p>
  </form>

export const SignupVerifyView = (user, actions) => ({ location, match }) => {
  if (user.userID && user.isLoggedIn && !user.isVerified) { return <Redirect to='/profile' /> }
  if (!user.userID) { return <Redirect to='/login' /> }
    return (
    <div class='container'>
      <div class='column is-4 is-offset-4'>
        <h3 class='title has-text-grey'>Verify</h3>
        <div class='box'>
          <VerifyForm user={user} {...actions.user} />
        </div>
      </div>
    </div>)
}

const VerifyForm = ({user, edit, login}) =>
  <form id='verify'>
    <div class="field">
      <p class='control'>
        <StringInput
          name='verificationCode'
          value={user.verificationCode}
          placeholder='Enter code received from SMS'
          enter={login}
          change={edit} />
      </p>
    </div>
    <div>
      <a id='verifyButton'
        class={isLoadingClass(user)}
        onclick={login}
        >Verify</a>
    </div>
    <p class='has-text-centered>'>{user.error}</p>
  </form>



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
