import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { CountryCodeDropdown, PhoneNumberInput, PasswordInput } from './inputs'

export const LoginView = (state, actions) => ({ location, match }) =>
  <div class='container'>
    <MiddleBoxForm title='Login'
    formComponent={LoginForm({formID: 'login'})}
    bottomComponent={OtherAuthOptionsComponent()}/>
  </div>

const MiddleBoxForm = ({title, formComponent, bottomComponent}) =>
  <div class="column is-4 is-offset-4">
    <h3 class="title has-text-grey">{title}</h3>
    <div class="box">
      {formComponent}
    </div>
    {bottomComponent}
  </div>

const LoginForm = ({formID}) =>
 <form id={formID}>
  <div class='field has-addons'>
    <p class='control'><CountryCodeDropdown /></p>
    <p class="control has-icons-left"><PhoneNumberInput /></p>
  </div>
  <div class='field'>
    <p class='control'><PasswordInput /></p>
  </div>
  <div class='field'>
    <label class='checkbox'>
      <input type='checkbox' />&nbsp;Remember me
    </label>
  </div>
  <a id='loginButton' class='button is-block is-info'>Login</a>
 </form>

const OtherAuthOptionsComponent = () =>
  <p class="has-text-grey">
    <Link to='/signup'>Sign Up</Link> &nbsp;·&nbsp;
    <Link to='/forgotpassword'>Forgot Password</Link> &nbsp;·&nbsp;
    <Link to='/help'>Need Help?</Link> &nbsp;·&nbsp;
  </p>
