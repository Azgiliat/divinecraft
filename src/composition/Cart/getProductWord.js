import { computed } from 'vue'

export default function (amount) {
  return computed(() => {
    switch (amount.value) {
      case 0:
        return ''
      case 1:
        return 'товар'
      case 2:
      case 3:
      case 4:
        return 'товара'
      default:
        return 'товаров'
    }
  })
}
