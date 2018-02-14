import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

export const CountryCodeDropdown = ({change}) =>
  <span class='select'>
    <select name='countryCode' oncreate={e => change({value: e.value, name: 'countryCode'})}>
      <option value='US'>🇺🇸 +1</option>
    </select>
  </span>

export const PhoneNumberInput = ({change, enter, value}) =>
  <span class='phoneInput'>
    <input class='input'
      name='phoneNumber'
      type='phone'
      value={value}
      placeholder='8557975723'
      oninput={e => change({ value: e.target.value, name: 'phoneNumber' })}
      onkeydown={(e) => { if(e.which == 13) { e.preventDefault(); enter() } }}
      />
    <span class='icon is-small is-left'><i class='fa fa-phone'></i></span>
  </span>

export const StringInput = ({name, value, placeholder, change, enter}) =>
  <span class='string-input'>
    <input class='input'
      name={name}
      type='text'
      value={value}
      placeholder={placeholder}
      oninput={e => change({ value: e.target.value, name: name })}
      onkeydown={(e) => { if(e.which == 13) { e.preventDefault(); enter() } }}
      />
  </span>

export const PasswordInput = ({change, enter, value, placeholder}) =>
  <input class='input'
  name='password'
  type='password'
  value={value}
  placeholder={placeholder}
  oninput={e => change({ value: e.target.value, name: 'password'})}
  onkeydown={(e) => { if(e.which == 13) { e.preventDefault(); enter() } }}
  />
