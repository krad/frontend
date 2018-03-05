import { Link, Route, location } from "@hyperapp/router"

export const state = {
  user: {profile:{details:{}}},
  beta: {details:{email: null}},
  player: null,
  isFetching: false,
  error: null,
  broadcasts: {fetched:[]},
  currentBroadcast: {like:{}, dislike:{}, flag:{},},
  channel: {broadcasts: [], user: {}}
}
