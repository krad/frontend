import { Link, Route, location } from "@hyperapp/router"

const getVideoBucket = () => {
  if (process.NODE_ENV && process.NODE_ENV == 'production') {
    return 'https://s3.amazonaws.com/krad-tv-production-video'
  } else {
    return 'https://s3.amazonaws.com/krad-tv-staging-video'
  }
}

export const state = {
  videoBucket: getVideoBucket(),
  user: null,
  broadcasts: [],
  currentBroadcast: null,
  player: null,
  isFetching: false
}
