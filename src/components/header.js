import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { UserProfileNavItem } from './users'

export const HeaderSection = ({ input, user, logout, checkLoginState }) =>
  <nav
    class='navbar is-warning'
    role='navigation'
    aria-label='main navigation'
    oncreate={checkLoginState} >

    <HeaderLeftSection user={user} />
    <HeaderRightSection user={user} logout={logout} />
  </nav>

const HeaderLeftSection = ({user}) =>
  <div class='navbar-start'>
    <div class='navbar-brand'>
      <a href='/' class='navbar-item'>
        <img src='https://www.krad.io/public/images/krad.png' alt='krad.tv - pretty far out radical stuff' />
      </a>
    </div>
  </div>

const HeaderRightSection = ({user, logout}) =>
  <div class='navbar-end'>
    <UserLinkOrSignupSection user={user} logout={logout} />
  </div>

const UserLinkOrSignupSection = ({user, logout}) => {
  if (user.isVerified) {
    return (<UserProfileNavItem user={user} logout={logout} />)
  } else {
    return (<HeaderSignUpSection />)
  }
}

const HeaderSignUpSection = () =>
  <div class="navbar-end">
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
  </div>

export const HeroSection = ({motto}) =>
    <section class='hero is-info'>
      <div class='hero-body'>
        <div class='container'>
          <h1 class='title'>krad.tv</h1>
          <h2 class='subtitle'>{motto ? motto : 'Some pretty far out radical stuff.'}</h2>
        </div>
      </div>
    </section>
