import { h, app } from "hyperapp"

export const OpinionButton = ({broadcast, opinion, name}) =>
  <a
    class={loadingButtonClass(broadcast, name)}
    onclick={() => opinion(broadcast.broadcastID)}>
    <span class="icon is-small"><i class={iconClassFor(name)}></i></span>
    <span>{nameFor(broadcast, name)}</span>
  </a>

const nameFor = (state, opinion) => {
  if (state.opinion == opinion.toLowerCase()) {
    switch (state.opinion) {
      case 'like':
        return 'Liked'
        break;
      case 'dislike':
        return 'Disliked'
        break;
      case 'flag':
        return 'Flagged'
        break
    }
  }
  return opinion
}

const iconClassFor = (opinion) => {
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

const buttonTypeFor = (opinion) => {
  switch (opinion) {
    case 'Like':
      return 'is-success'
      break;
    case 'Dislike':
      return 'is-info'
      break;
    case 'Flag':
      return 'is-danger'
      break;
    default:
    return 'is-success'
  }
}

const loadingButtonClass = (state, opinion) => {
  if (state.isLoading) {
    if (state.isLoading.hasOwnProperty(opinion.toLowerCase())) {
      if(state.isLoading[opinion.toLowerCase()]) {
        return ['button', buttonTypeFor(opinion), 'is-loading'].join(' ')
      }
    }
  }

  return ['button', buttonTypeFor(opinion)].join(' ')
}
