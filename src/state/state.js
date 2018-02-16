import { Link, Route, location } from "@hyperapp/router"

export const state = {
  user: {profile:{details:{}}},
  player: null,
  isFetching: false,
  error: null,
  broadcasts: {fetched:[]},
  currentBroadcast: {}
}
