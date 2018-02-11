import { h, app } from "hyperapp"

export const OpinionButton = ({broadcast, opinion, name}) =>
  <a
    class={loadingButtonClass(broadcast, 'is-success')}
    onclick={() => opinion(broadcast.broadcastID)}>
    <span class="icon is-small"><i class={iconClassFor(name)}></i></span>
    <span>{name}</span>
  </a>

var iconClassFor = (opinion) => {
  switch (opinion) {
    case 'Like':
      return "fas fa-thumbs-up"
      break;
    case 'Dislike':
      return "fas fa-thumbs-down"
      break;
    case 'Flag':
      return "fas fa-flag"
      break;
    default:
      return "fas"
  }
}

var loadingButtonClass = (state, color) => {
  if (state.isLoading) {
    return ['button', color, 'is-loading'].join(' ')
  } else {
    return ['button', color].join(' ')
  }
}
