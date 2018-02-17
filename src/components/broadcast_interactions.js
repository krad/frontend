import { h, app } from "hyperapp"

export const OpinionButton = ({details, opinion, action, name}) =>
  <a
    class={loadingButtonClass(opinion, name)}
    onclick={() => action(details.broadcastID)}>
    <span class="icon is-small"><i class={iconClassFor(name)}></i></span>
    <span>{nameFor(opinion, name)}</span>
  </a>

const nameFor = (opinion, name) => {
  if (opinion) {
    switch (name) {
      case 'Like':
        if (opinion.value) { return "Liked" }
        return name
      case 'Dislike':
        if (opinion.value) { return "Disliked" }
        return name
      case 'Flag':
        if (opinion.value) { return "Flagged" }
        return name
    }
  }
  return name
}

const iconClassFor = (name) => {
  switch (name) {
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

const loadingButtonClass = (state, name) => {
  if (state) {
    if (state.isLoading) {
      return ['button', buttonTypeFor(name), 'is-loading'].join(' ')
    }
  }

  return ['button', buttonTypeFor(name)].join(' ')
}
