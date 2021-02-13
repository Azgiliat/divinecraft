<template>
  <header
    class="header"
    :class="[isMenuShow ? 'header--opened' : 'header--closed', `header--${color}`]"
  >
    <BurgerMenu
      v-show="isBurgerShow"
      :color="color"
      :is-open="isMenuShow"
      class="header__burger-menu"
      @click="toggleMenu"
    />
    <div class="header__navigation container container--no-mobile container--no-tablet">
      <HeaderNav
        class="header__nav"
        :color="color"
      />
      <HeaderCart
        class="header__basket"
        :color="color"
      />
      <Switcher
        v-model:is-checked="themeSwitcher"
        class="header__switcher"
      />
    </div>
  </header>
</template>

<script>
import { useStore } from 'vuex'

import menuLogic from '../../composition/Header/Menu'
import menuColor from '@/composition/Header/Colors'
import themeSwitcherLogic from '@/composition/Header/themeSwitcherLogic'

import BurgerMenu from '@/components/Header/BurgerMenu'
import HeaderCart from '@/components/Header/HeaderCart'
import HeaderNav from '@/components/Header/HeaderNav'
import Switcher from '@/components/UI/Switcher'

export default {
  name: 'Header',
  components: {
    BurgerMenu,
    HeaderNav,
    HeaderCart,
    Switcher
  },
  setup () {
    const store = useStore()
    const { isMenuShow, toggleMenu } = menuLogic()
    const { color } = menuColor(store)
    const { themeSwitcher } = themeSwitcherLogic(store)

    return {
      color,
      isMenuShow,
      toggleMenu,
      themeSwitcher
    }
  },
  computed: {
    isBurgerShow () {
      return this.$mq === 'mobile' || this.$mq === 'tablet'
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 50%;
  padding-left: 30px;
  background-color: transparent;
  transition: transform $transition, background-color $transition;

  @media ($laptop) {
    position: static;
    width: 100%;
    padding: 0;
    background-color: var(--second-back-color);
    box-shadow: 0px 1px 20px -5px rgba(0, 0, 0, 0.35);
    transform: translateX(0);
  }

  &__burger-menu {
    position: absolute;
    top: 15px;
    left: 5px;
  }

  &__nav, &__basket {
    margin-bottom: 20px;

    @media ($laptop) {
      margin-bottom: 0;
    }
  }

  &__basket {
    @media ($laptop) {
      margin-left: 15%;
    }
  }

  &__navigation {
    position: relative;
    padding-top: 5px;
    padding-left: 15px;
    transition: opacity $transition;

    @media ($laptop) {
      display: flex;
      padding: 25px 0;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -30px;
      z-index: -1;
      display: block;
      width: calc(100% + 30px);
      height: calc(100% + 80px);
      background: var(--header-accent-gradient);
      transition: opacity $transition, background $transition;

      @media ($laptop) {
        display: none;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -30px;
      z-index: -1;
      display: block;
      width: calc(100% + 30px);
      height: calc(100% + 80px);
      background: var(--header-gradient);
      transition: opacity $transition, background $transition;

      @media ($laptop) {
        display: none;
      }
    }
  }

  &--closed {
    transform: translateX(calc(200% - 30px));

    @media ($laptop) {
      transform: translateX(0);
    }

    .header__navigation::before, .header__navigation::after {
      opacity: 0;
    }
  }

  &--opened {
    transform: translateX(100%);

    @media ($laptop) {
      transform: translateX(0);
    }
  }

  &--opened#{&}--accent {
    .header__navigation::before {
      opacity: 1;
    }

    .header__navigation::after {
      opacity: 0;
    }
  }

  &-opened#{&}--text {
    .header__navigation::before {
      opacity: 0;
    }

    .header__navigation::after {
      opacity: 1;
    }
  }
}
</style>
