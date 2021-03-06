export function setErrorText (state, payload) {
  state.errorText = payload
}

export function setDevErrorText (state, payload) {
  state.devErrorText = payload
}

export function setActiveSection (state, payload) {
  if (state.activeSection !== payload) {
    state.activeSection = payload
  }
}

export function setActiveTheme (state, payload) {
  state.activeTheme = payload
}
