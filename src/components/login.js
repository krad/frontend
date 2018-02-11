import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput } from './inputs'

export const LoginView = (state, actions) => ({ location, match }) =>
  <div class='container'>
    <div class="column is-4 is-offset-4">
      <h3 class="title has-text-grey">Login</h3>
      <div class="box">
        <LoginForm form={actions.loginActions} />
      </div>
      < OtherAuthOptionsComponent />
    </div>
  </div>

const LoginForm = ({form}) =>
 <form id='login'>
  <div class='field has-addons'>
    <p class='control'><CountryCodeDropdown change={form.edit} /></p>
    <p class="control has-icons-left"><PhoneNumberInput change={form.edit} /></p>
  </div>
  <div class='field'>
    <p class='control'><PasswordInput change={form.edit} /></p>
  </div>
  <div class='field'>
    <label class='checkbox'>
      <input type='checkbox' onclick={e => form.edit({value: e.target.value, name: 'remember'})} />&nbsp;Remember me
    </label>
  </div>
  <a id='loginButton'
  class='button is-block is-info'
  onclick={() => form.submit()}
  >Login</a>
 </form>

const OtherAuthOptionsComponent = () =>
  <p class="has-text-grey">
    <Link to='/signup'>Sign Up</Link>&nbsp;&nbsp;·&nbsp;&nbsp;
    <Link to='/forgotpassword'>Forgot Password</Link>&nbsp;&nbsp;·&nbsp;&nbsp;
    <Link to='/help'>Need Help?</Link>
  </p>
