import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput, StringInput } from './inputs'

export const SignupVerifyView = (user, actions) => ({ location, match }) => {
  var check = redirectChecks(user.profile.details, user.profile)
  if (check) { return check }

  return (<VerifyContainer user={user.profile} authentication={actions.profile} />)
}

const redirectChecks = (user, userState) => {
  if (user) {
    if (user.userID && userState.isLoggedIn && !user.isVerified) { return <Redirect to='/profile' /> }
    if (!user.userID) { return <Redirect to='/login' /> }
  }
  return null
}

const VerifyContainer = ({user, authentication}) =>
  <div class='container'>
    <div class='column is-4 is-offset-4'>
      <h3 class='title has-text-grey'>Verify</h3>
      <div class='box'>
        <VerifyForm user={user} error={user.error} {...authentication} />
      </div>
    </div>
  </div>

const VerifyForm = ({user, error, edit, login}) =>
  <form id='verify'>
    <VerifyCodeField details={user.details} edit={edit} login={login} />
    <div>
      <a id='verifyButton' class={isLoadingClass(user)} onclick={login}>Verify</a>
    </div>
    <p class='help is-danger has-text-centered'>{error}</p>
  </form>

const VerifyCodeField = ({details, edit, login}) =>
  <div class="field">
    <p class='control'>
      <StringInput
        name='verificationCode'
        value={details.verificationCode}
        placeholder='Code received from SMS'
        enter={login}
        change={edit} />
    </p>
  </div>

const isLoadingClass = (user) => {
  if (user) {
    if (user.isChangingAuthState) {
      return "button is-block is-info is-loading"
    }
  }
  return "button is-block is-info"
}
