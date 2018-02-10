import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

export const CountryCodeDropdown = () =>
  <span class='select'>
    <select name='countryCode'><option value='US'>🇺🇸 +1</option></select>
  </span>

export const PhoneNumberInput = () =>
  <span class='phoneInput'>
    <input class='input' name='phoneNumber' type='phone' placeholder='8557975723' />
    <span class='icon is-small is-left'><i class='fa fa-phone'></i></span>
  </span>

export const PasswordInput = () =>
  <input class='input' name='password' type='password' placeholder='Password' />
