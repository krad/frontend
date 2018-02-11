import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

export const HeaderSection = ({ input, user }) =>
  <nav class='navbar is-warning' role='navigation' aria-label='main navigation'>
    <HeaderLeftSection user={user} />
    <HeaderRightSection user={user} />
  </nav>

const HeaderLeftSection = ({user}) =>
  <div class='navbar-start'>
    <div class='navbar-brand'>
      <a href='/' class='navbar-item'>
        <img src='https://www.krad.io/public/images/krad.png' alt='krad.tv - pretty far out radical stuff' />
      </a>
    </div>
  </div>

const HeaderRightSection = ({user}) =>
  <div class='navbar-end'>
    <HeaderSignUpSection />
  </div>

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

const HeaderSearch = () =>
  <div class='navbar-item'>
    <form class='field has-addons' role='search'>
      <div class='control'>
        <input type='text' class='input' placeholder='Search' />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </form>
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
