import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

const MiddleBoxForm = ({title, formComponent, bottomComponent}) =>
  <div class="column is-4 is-offset-4">
    <h3 class="title has-text-grey">{title}</h3>
    <div class="box">
      {formComponent}
    </div>
    {bottomComponent}
  </div>

export const LoginView = ({location, match}) =>
  <div class='container'>
    <MiddleBoxForm title='Login'
    formComponent={LoginForm({formID: 'login'})}
    bottomComponent={OtherAuthOptionsComponent()}/>
  </div>

export const SignupView = ({location, match}) =>
  <div class='container'>
    <MiddleBoxForm title='Sign up'
    formComponent={SignupForm({formID: 'signup'})}
    bottomComponent={SMSDisclaimerComponent()} />
  </div>

const SignupForm = ({formID}) =>
  <form id={formID}>
    <div class="field has-addons">
      <p class="control"><CountryCodeDropdown /></p>
      <p class="control has-icons-left"><PhoneNumberInput /></p>
    </div>
    <div><a id='signupButton' class='button is-block is-info'>Signup</a></div>
  </form>

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

const CountryCodeDropdown = () =>
  <span class='select'>
    <select name='countryCode'><option value='US'>🇺🇸 +1</option></select>
  </span>

const PhoneNumberInput = () =>
  <span class='phoneInput'>
    <input class='input' name='phoneNumber' type='phone' placeholder='8557975723' />
    <span class='icon is-small is-left'><i class='fa fa-phone'></i></span>
  </span>

const PasswordInput = () =>
  <input class='input' name='password' type='password' placeholder='Password' />

const SMSDisclaimerComponent = () =>
  <p>You will receive an SMS with a confirmation code.</p>

const OtherAuthOptionsComponent = () =>
  <p class="has-text-grey">
    <Link to='/signup'>Sign Up</Link> &nbsp;·&nbsp;
    <Link to='/forgotpassword'>Forgot Password</Link> &nbsp;·&nbsp;
    <Link to='/help'>Need Help?</Link> &nbsp;·&nbsp;
  </p>
