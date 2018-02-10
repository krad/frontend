import { h, app } from "hyperapp"

export const LikeButton = ({state, actions, broadcast}) =>
  <a
    class={LoadingButtonClass(state, 'is-success')}
    onclick={() => actions.like(broadcast.broadcastID)}>
    <span class="icon is-small"><i class="fas fa-thumbs-up"></i></span>
    <span>Like</span>
  </a>


export const DislikeButton = ({state, actions, broadcast}) =>
  <a
    class={LoadingButtonClass(state, 'is-info')}
    onclick={() => actions.dislike(broadcast.broadcastID)}>
    <span class="icon is-small"><i class="fas fa-thumbs-down"></i></span>
    <span>Dislike</span>
  </a>

export const FlagButton = ({state, actions, broadcast}) =>
  <a
    class={LoadingButtonClass(state, 'is-danger')}
    onclick={() => actions.flag(broadcast.broadcastID)}>
    <span class="icon is-small"><i class="fas fa-flag"></i></span>
    <span>Flag</span>
  </a>

var LoadingButtonClass = (state, color) => {
  if (state.isLoading) {
    return ['button', color, 'is-loading'].join(' ')
  } else {
    return ['button', color].join(' ')
  }
}
