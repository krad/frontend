import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput } from './inputs'

export const LoginView = (user, actions) => ({ location, match }) => {
  var check = redirectChecks(user.profile.details, user.profile)
  if (check) { return check }

  return (<LoginContainer user={user.profile} authentication={actions.profile} />)
}

const redirectChecks = (user, userState) => {
  if (user) {
    if (user.userID && userState.isLoggedIn) { return <Redirect to='/' /> }
  }
  return null
}

const LoginContainer = ({user, authentication}) =>
  <div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Login</h3>
      <div class="box">
        <LoginForm user={user} error={user.error} {...authentication} />
      </div>
      <OtherAuthOptionsComponent />
    </div>
  </div>

const LoginForm = ({user, edit, login, error}) =>
  <form id='login'>
    <LoginPhoneNumberField details={user.details} edit={edit} login={login} />
    <LoginPasswordField details={user.details} edit={edit} login={login} />

    <a id='loginButton' class={isLoadingClass(user)} onclick={login}>Login</a>
    <p class='help is-danger has-text-centered'>{error}</p>
 </form>

const LoginPhoneNumberField = ({details, edit, login}) =>
  <div class='field has-addons'>
    <p class="control"><CountryCodeDropdown change={edit} /></p>

    <p class="control is-expanded has-icons-left">
      <LoginPhoneNumberInput phoneNumber={details.phoneNumber}
                                    edit={edit}
                                   login={login} />
    </p>
  </div>

const LoginPasswordField = ({details, edit, login}) =>
  <div class='field'>
    <p class='control'>
      <PasswordInput change={edit} value={details.password} enter={login} />
    </p>
  </div>

const LoginPhoneNumberInput = ({phoneNumber, edit, login}) =>
  <PhoneNumberInput value={phoneNumber} change={edit} enter={login} />

const isLoadingClass = (user) => {
  if (user) {
    if (user.isChangingAuthState) {
      return "button is-block is-info is-loading"
    }
  }
  return "button is-block is-info"
}

const OtherAuthOptionsComponent = () =>
  <p class="has-text-grey has-text-centered">
    <Link to='/signup'>Sign Up</Link>&nbsp;&nbsp;·&nbsp;&nbsp;
    <Link to='/forgotpassword'>Forgot Password</Link>&nbsp;&nbsp;·&nbsp;&nbsp;
    <Link to='/help'>Help</Link>
  </p>

const loadingButtonClass = (state) => {
  if (state.isLoading) {
    if (state.isLoading.hasOwnProperty(opinion.toLowerCase())) {
      if(state.isLoading[opinion.toLowerCase()]) {
        return ['button', buttonTypeFor(opinion), 'is-loading'].join(' ')
      }
    }
  }
  return ['button', buttonTypeFor(opinion)].join(' ')
}
