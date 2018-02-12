import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput } from './inputs'

export const LoginView = (state, actions) => ({ location, match }) =>
  <div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Login</h3>
      <div class="box">
        <LoginForm formState={state.login} formActions={actions.login} />
      </div>
      < OtherAuthOptionsComponent />
    </div>
  </div>

const LoginForm = ({formState, formActions}) =>
 <form id='login'>
  <div class='field has-addons'>
    <p class='control'><CountryCodeDropdown change={formActions.edit} /></p>
    <p class="control has-icons-left"><PhoneNumberInput change={formActions.edit} /></p>
  </div>
  <div class='field'>
    <p class='control'><PasswordInput change={formActions.edit} /></p>
  </div>
  <div class='field'>
    <label class='checkbox'>
      <input type='checkbox' onclick={e => formActions.edit({value: e.target.value, name: 'remember'})} />&nbsp;Remember me
    </label>
  </div>
  <a id='loginButton'
  class={isLoadingClass(formState)}
  onclick={() => formActions.submit()}
  >Login</a>
  <p class='has-text-centered>'>{formState.error}</p>
 </form>

const isLoadingClass = (state) => {
  if (state.isLoading) {
    return "button is-block is-info is-loading"
  } else {
    return "button is-block is-info"
  }
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
