import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput } from './inputs'

export const SignupView = (state, actions) => ({ location, match }) => {
  if (state.user.userID) { return <Redirect to='/' /> }
  return (<div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Sign Up</h3>
      <div class="box">
        <SignupForm user={state.user} {...actions.user} />
      </div>
      <SMSDisclaimerComponent />
    </div>
  </div>)
}

const SignupForm = ({user, edit, signup}) =>
  <form id='signup'>
    <div class="field has-addons">
      <p class="control"><CountryCodeDropdown change={edit} /></p>
      <p class="control has-icons-left"><PhoneNumberInput change={edit} /></p>
    </div>
    <div>
      <a id='signupButton'
        class={isLoadingClass(user)}
        onclick={signup}

        class='button is-block is-info'>Signup</a>
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
