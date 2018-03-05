import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"
import { HorseshoeSpinner } from './spinner'
import { StringInput } from './inputs'

export const BetaSignupView = (beta, actions) => ({ location, match }) => {
  if (beta.signedUp) { return (<ThankYou />) }

  return (<PromptToSignup beta={beta} actions={actions} />)
}

const PromptToSignup = ({beta, actions}) =>
  <div class='container'>
    <div class="column is-4 is-offset-4">
      <h1 class="title has-text-grey">Beta Signup</h1>
      <h3 class='subtitle'>Lead an awesome life? Show us.</h3>
      <div class="box">
        <BetaSignupForm beta={beta}
                       email={beta.details.email}
                       error={beta.error}
                       {...actions} />
      </div>
    </div>
  </div>

const BetaSignupForm = ({beta, email, edit, error, apply}) =>
  <form id='beta'>
    <StringInput name='email'
                value={email}
                placeholder='Email address'
                change={edit}
                enter={apply}
                />
    <a id='betaButton' class={isLoadingClass(beta)} onclick={apply}>
    Help test the krad.tv app
    </a>
    <p class='help is-danger has-text-centered'>{error}</p>
  </form>

const ThankYou = () =>
  <div class='container'>
      <section class='section'>
      <h1 class='title'>Thank you!</h1>
      <h2 class='subtitle'>We received your application.</h2>
      <p>We'll be in touch soon.</p>
      <p>
        Once we have a chance to review and approve, you will receive a
        TestFlight link that will allow you to install the app.
      </p>
    </section>
  </div>

const isLoadingClass = (beta) => {
  if (beta) { if (beta.isLoading) {
    return "button is-block is-info is-loading"
  }}
  return "button is-block is-info"
}
