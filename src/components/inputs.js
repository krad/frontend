import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

export const CountryCodeDropdown = ({change}) =>
  <span class='select'>
    <select name='countryCode' oncreate={e => change({value: e.value, name: 'countryCode'})}>
      <option value='US'>🇺🇸 +1</option>
    </select>
  </span>

export const PhoneNumberInput = ({change}) =>
  <span class='phoneInput'>
    <input class='input'
      name='phoneNumber'
      type='phone'
      placeholder='8557975723'
      oninput={e => change({ value: e.target.value, name: 'phoneNumber' })}
      />
    <span class='icon is-small is-left'><i class='fa fa-phone'></i></span>
  </span>

export const PasswordInput = ({change}) =>
  <input class='input'
  name='password'
  type='password'
  placeholder='Password'
  oninput={e => change({ value: e.target.value, name: 'password'})}
  />
