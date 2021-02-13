import themesWithColorSwitch from '@/constants/themesWithColorSwitch'
import { TEXT } from '@/constants/headerColors'

export function currentColorForHeader (state) {
  if (themesWithColorSwitch.has(state.activeTheme)) {
    return state.headerColors[state.activeSection]
  } else {
    return TEXT
  }
}
