import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

export const ShowSpinnerIf = ({isFetching}) => {
  if (isFetching) { return LoadingSpinner() }
  else { return <div></div> }
}

const LoadingSpinner = () =>
  <div class='container'>
    <div class='columns is-mobile'>
      <div class='column is-half is-offset-one-quarter has-text-centered'>
        <WaveSpinner />
      </div>
    </div>
  </div>

const WaveSpinner = () =>
  <img src='https://s3.amazonaws.com/krad-tv-staging-assets/Wave-1s-200px.gif' />

export const HorseshoeSpinner = () =>
  <img src='https://s3.amazonaws.com/krad-tv-staging-assets/Rolling-1.5s-46px.gif' />
