import { h, app } from "hyperapp"
import { Link, Route, Redirect, location } from "@hyperapp/router"
import { StringInput, PasswordInput } from './inputs'
import { userProfileImgURL } from './users'

export const ManageProfileView = (user, actions) => ({ location, match }) => {
  var check = redirectCheck(user.profile.details, user.profile)
  if (check) { return check }

  return (<ManageProfileContainer user={user.profile} {...actions.profile} />)
}

const redirectCheck = (user, userState) => {
  if (user) {
    if (!user.userID) { return (<Redirect to='/login' />) }
  }
  return null
}

const ManageProfileContainer = ({user, update, edit, prepareUpload}) =>
  <div class='container'>
    <section class='section'>
      <div class='container'>
        <h1 class='title'>{sectionTitle(user.details)}</h1>
        <div class='card'>
          <div class='card-content'>
            <ManageProfileForm
              user={user}
              error={user.error}
              success={user.success}
              edit={edit}
              prepareUpload={prepareUpload}
              update={update}
              />
          </div>
        </div>
      </div>
    </section>
  </div>


const ManageProfileForm = ({user, error, success, edit, update, prepareUpload}) =>
  <profile>
    <form id='profile'>
      <UserNameSection
        user={user.details}
        edit={edit}
        update={update} />

      <PasswordSection user={user.details} edit={edit} update={update} />
      <ProfileImageSection photo={user.upload} prepareUpload={prepareUpload} />
      <NameSection user={user.details} edit={edit} update={update} />

      <a id='updateProfileButton' class={isLoadingClass(user)} onclick={update}>Update Profile</a>
      <p class='help is-danger has-text-centered'>{error}</p>
      <p class='help is-success has-text-centered'>{success}</p>
    </form>
  </profile>

const UserNameSection = ({user, edit, update}) =>
  <div class='field'>
    <TextInputField
      name='username'
      label='Username'
      placeholder='Select a username'
      value={user.username}
      edit={edit}
      update={update} />
  </div>

const PasswordSection = ({user, edit, update}) =>
  <div class='field'>
    <PasswordInputField
      label='Password'
      placeholder={passwordPlaceholder(user)}
      edit={edit}
      update={update}  />
  </div>

const ProfileImageSection = ({photo, prepareUpload}) => {
  if (photo) {
    if (photo.photo) {
      return (<ProfileImage photoURL={photo.photo} />)
    }
  }

  return (<ProfileImageUploadButton photo={photo} prepareUpload={prepareUpload} />)
}

const ProfileImage = ({photoURL}) =>
  <img src={photoURL} />

const ProfileImageUploadButton = ({photo, prepareUpload}) =>
  <div class="field file has-name is-boxed is-fullwidth">
    <label class="file-label">

      <input class="file-input"
        type="file"
        name="profilePhoto"
        onchange={el => prepareUpload(el.target)}/>

      <span class="file-cta has-text-centered">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          Choose a file…
        </span>
      </span>

      <span class="file-name has-text-centered">
        <div><ProfileImageName photo={photo} /></div>
        <div class='field'><UploadProgressBar photo={photo} /></div>
      </span>
    </label>
  </div>


const NameSection = ({user, edit, update}) =>
  <div class='field'>
    <TextInputField
      name='firstName'
      label='First Name'
      value={user.firstName}
      edit={edit}
      update={update}
      placeholder='Alex' />

    <TextInputField
      name='lastName'
      label='Last Name'
      value={user.lastName}
      edit={edit}
      update={update}
      placeholder='Jones'/>
  </div>

const TextInputField = ({label, name, value, edit, update, placeholder, isLoading}) =>
  <div class='field'>
    <label class='label'>{label}</label>
    <div class={textInputIsLoadingClass(isLoading)}>
      <StringInput name={name}
        value={value}
        change={edit}
        enter={update}
        placeholder={placeholder} />
    </div>
  </div>

const PasswordInputField = ({label, name, value, edit, update, placeholder}) =>
  <div class='field control'>
    <label class='label'>{label}</label>
    <PasswordInput change={edit} enter={update} value={value} placeholder={placeholder} />
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

const sectionTitle = (user) => {
  if (user) {
    if (user.isVerified) {
      return 'Manage Profile'
    }
  }

  return 'Setup your profile'
}

const passwordPlaceholder = (user) => {
  if (user) {
    if (user.isVerified) {
      return 'Update your password'
    }
  }
  return 'Set your password'
}

const isLoadingClass = (user) => {
  if (user) {
    if (user.isLoading) {
      return "button is-info is-fullwidth is-expanded is-loading"
    }
  }
  return "button is-info is-fullwidth is-expanded"
}

const textInputIsLoadingClass = (user) => {
  if (user) {
    if (user.isCheckingAvailable) {
      return 'has-icons-right is-loading'
    }
  }
  return 'control has-icons-right'
}
