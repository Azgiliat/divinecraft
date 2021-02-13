import { PLAY_LINK } from '@/constants/links'

export default async function () {
  try {
    await navigator.clipboard.writeText(PLAY_LINK)
  } catch (err) {
    console.error('Can\'t copy to clipboard')
  }
}
