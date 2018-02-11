import { Link, Route, location } from "@hyperapp/router"

export const state = {
  user: null,
  player: null,
  isFetching: false,
  error: null,
  broadcasts: [],
  currentBroadcast: {}
}
