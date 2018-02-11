import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

export const ShowSpinnerIf = ({isFetching}) => {
  if (isFetching) { return LoadingSpinner() }
  else { return "" }
}

const LoadingSpinner = () =>
  <div class='container'>
    <div class='columns is-mobile'>
      <div class='column is-half is-offset-one-quarter has-text-centered'>
        <img src='https://s3.amazonaws.com/krad-tv-staging-assets/Wave-1s-200px.gif' />
      </div>
    </div>
  </div>
