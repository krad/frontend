import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"
import { StringInput } from './inputs'
import { userProfileImgURL } from './users'

export const ManageProfileView = (user, actions) => ({ location, match }) => {
  // if (!user.userID && !user.isVerified) { return <Redirect to='/' /> }
  return (
  <div class='container'>
    <section class='section'>
      <div class='container'>
        <h1 class='title'>Manage Profile</h1>
        <div class='card'>
          <div class='card-content'>
            <ManageProfileForm user={user} {...actions.user} />
          </div>
        </div>
      </div>
    </section>
  </div>)
}

const ManageProfileForm = ({user, edit, update, prepareUpload}) =>
  <profile>
    <form id='profile'>
      <UserNameSection user={user} edit={edit} update={update} />
      <ProfileImageSection photo={user.photo} prepareUpload={prepareUpload} />
      <NameSection user={user} edit={edit} update={update} />

      <div class='field is-grouped'>
        <a class='button is-info' onclick={update}>
        Update Profile
        </a>
      </div>
    </form>
  </profile>

const NameSection = ({user, edit, update}) =>
  <div class='field is-grouped'>
    <TextInputField
      name={'firstName'}
      label={'First Name'}
      value={user.firstName}
      edit={edit}
      update={update} />

    <TextInputField
      name={'lastName'}
      label={'Last Name'}
      value={user.lastName}
      edit={edit}
      update={update} />
  </div>

const ProfileImageSection = ({photo, prepareUpload}) =>
  <div class="file has-name is-boxed">
    <label class="file-label">

      <input class="file-input"
        type="file"
        name="profilePhoto"
        onchange={el => prepareUpload(el.target)}/>

      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          Choose a file…
        </span>
      </span>
      <span class="file-name">
        <div class=''><ProfileImageName photo={photo} /></div>
        <div class='field'><UploadProgressBar photo={photo} /></div>
      </span>
    </label>
  </div>

const ProfileImageName = ({photo}) => {
  if (photo) { if (photo.name) { return h('span', {}, photo.name) } }
  return h('span', {})
}

const UploadProgressBar = ({photo}) => {
  if (photo) {
    if (photo.progress) {
      return (<progress class="progress is-info" value={uploadProgress(photo)} max="100"></progress>)
    }
  }
  return h('span', {})
}

const uploadProgress = (photo) => {
  if (photo) {
    if (photo.progress) {
      return photo.progress
    }
  }
  return 0
}

const UserNameSection = ({user, edit, update}) =>
  <div class='field'>
    <TextInputField
      name={'username'}
      label={'Username'}
      value={user.lastName}
      placeholder={'Select a username'}
      edit={edit}
      update={update} />
  </div>

const TextInputField = ({label, name, value, edit, update, placeholder}) =>
  <div class='field control'>
    <label class='label'>{label}</label>
    <StringInput name={name} value={value} change={edit} enter={update} placeholder={placeholder} />
  </div>
