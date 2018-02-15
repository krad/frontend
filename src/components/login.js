import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput } from './inputs'

export const LoginView = (user, actions) => ({ location, match }) => {
  if (user.isLoggedIn) { return <Redirect to='/' /> }
  return (<div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Login</h3>
      <div class="box">
        <LoginForm user={user} {...actions.user} />
      </div>
      <OtherAuthOptionsComponent />
    </div>
  </div>)
}

const LoginForm = ({user, edit, login}) =>
  <form id='login'>
    <div class='field has-addons'>
      <p class='control'><CountryCodeDropdown change={edit} /></p>
      <p class="control is-expanded has-icons-left">
        <PhoneNumberInput
          change={edit}
          value={user.phoneNumber}
          enter={login}
          />
      </p>
    </div>
    <div class='field'>
      <p class='control'>
        <PasswordInput
          change={edit}
          value={user.password}
          enter={login}
          />
      </p>
    </div>
    <a id='loginButton'
      class={isLoadingClass(user)}
      onclick={login}
      >Login</a>
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
