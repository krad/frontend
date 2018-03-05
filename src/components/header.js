import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { UserProfileNavItem, UserProfileNavItemLoading } from './users'
import { HorseshoeSpinner } from './spinner'

export const HeaderSection = ({ input, user, header, profile }) =>
  <nav
    class='navbar is-warning'
    role='navigation'
    aria-label='main navigation'
    oncreate={profile.checkLoginState} >

    <HeaderLeftSection {...header} />
    <HeaderRightSection user={user} {...profile} />
  </nav>

const HeaderLeftSection = ({hamburger}) =>
  <div class='navbar-start'>
    <div class='navbar-brand'>
      <a href='/' class='navbar-item'>
        <img src='https://www.krad.io/public/images/krad.png' alt='krad.tv - pretty far out radical stuff' />
      </a>
      <div class="navbar-burger burger" onclick={hamburger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>

const HeaderRightSection = ({user, logout}) =>
  <div class={controlsActiveClass(user.header)} id='navbarUserControls'>
    <UserLinkOrSignupSection user={user.profile} logout={logout} />
  </div>

const UserLinkOrSignupSection = ({user, logout}) => {
  if (user.isLoading || user.isChangingAuthState) {
    return <UserProfileNavItemLoading />
  }

  if (user.isLoggedIn) {
    return (<UserProfileNavItem user={user.details} logout={logout} />)
  }

  return (<HeaderSignUpSection />)
}

const HeaderSignUpSection = () =>
    <div class="navbar-item">
      <div class="field is-grouped">
        <p class="control">
          <Link to='/signup' class="button is-info is-outlined">
            <span class="icon"><i class="fa fa-user-plus"></i></span>
            <span>Signup</span>
          </Link>
        </p>
        <p class="control">
          <Link to='/login' class="button is-info is-outlined">
            <span class="icon"><i class="fa fa-user"></i></span>
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>

export const HeroSection = ({motto}) =>
    <section class='hero is-info is-bold'>
      <div class='hero-body'>
        <div class='container'>
          <h1 class='title'>krad.tv</h1>
          <h2 class='subtitle'>{motto ? motto : 'Some pretty far out radical stuff.'}</h2>
          <BetaSignupLink />
        </div>
      </div>
    </section>

export const BetaSignupLink = () =>
  <div id='beta-signup' class='left'>
    <Link to='/beta'>Wanna try out our mobile app?</Link>
  </div>

const controlsActiveClass = (controls) => {
  if (controls) {
    if (controls.active) {
      return "navbar-menu is-active"
    }
  }
  return "navbar-menu"
}
