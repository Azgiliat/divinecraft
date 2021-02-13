<template>
  <router-link
    to="/cart"
    class="cart"
    :class="`cart--${realColor}`"
  >
    <div class="cart__icon-wrapper">
      <svg class="cart__icon">
        <use xlink:href="#cart" />
      </svg>
      <p class="cart__notification">
        <span
          v-show="amountInCart"
          class="cart__amount"
        >
          {{ amountInCart }}
        </span>
        <span class="cart__product-word">
          {{ productWord }}
        </span>
      </p>
    </div>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import headerElementsColorMixin from '@/mixins/headerElementsColorMixin'

import getProductWord from '@/composition/Cart/getProductWord'

export default {
  name: 'HeaderCart',
  mixins: [headerElementsColorMixin],
  props: {
    color: {
      type: String,
      require: true,
      default: 'accent'
    }
  },
  setup () {
    const store = useStore()
    const amountInCart = computed(() => store.getters['cart/productsModule/getTotalAmountInCart'])
    const productWord = getProductWord(amountInCart)

    return {
      amountInCart,
      productWord
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  $self: &;
  display: flex;
  text-decoration: none;

  @media ($laptop) {
    min-width: 130px;
  }

  &__icon-wrapper {
    display: flex;

    @media ($laptop) {
      align-items: center;
    }
  }

  &__icon {
    display: block;
    width: 34px;
    height: 28px;
    transition: fill $transition;
  }

  &__notification {
    margin: 0;

    @media ($laptop) {
      margin-left: 10px;
    }
  }

  &__product-word {
    display: none;

    @media ($laptop) {
      display: inline-block;
      margin-left: 5px;
    }
  }

  &--accent {
    color: $accent;

    #{$self}__icon {
      fill: $accent;
    }
  }

  &--text {
    color: var(--text-color);

    #{$self}__icon {
      fill: var(--text-color);
    }
  }
}
</style>
