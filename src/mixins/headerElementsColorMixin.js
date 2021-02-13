import { TEXT } from '@/constants/headerColors'

export default {
  computed: {
    realColor () {
      return this.$mq === 'laptop' || this.$mq === 'desktop' ? TEXT : this.color
    }
  }
}
