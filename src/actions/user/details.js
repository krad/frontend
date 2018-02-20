export const edit = (value) => (state, actions) => {
  if (!state.details) { state.details = {} }
  state.details[value.name] = value.value
  return state
}
