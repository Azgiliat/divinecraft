import { DARK_THEME } from '@/constants/themeNames'
import { TEXT, ACCENT } from '@/constants/headerColors'

export default function () {
  return {
    errorText: '',
    devErrorText: '',
    activeSection: '',
    headerColors: {
      banner: ACCENT,
      privileges: TEXT,
      products: ACCENT,
      categories: TEXT
    },
    activeTheme: DARK_THEME
  }
}
