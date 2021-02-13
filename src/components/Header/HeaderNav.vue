<template>
  <nav
    class="nav"
    :class="`nav--${realColor}`"
  >
    <a
      href="#"
      class="nav__play-link"
      @click="copyPlayLink"
    >
      {{ PLAY_LINK }}
    </a>
    <router-link
      class="nav__main nav__link"
      to="/"
    >
      Главная
    </router-link>
    <a
      class="nav__link"
      href="#"
    >
      Донат
    </a>
    <router-link
      to="/terms-of-use"
      class="nav__link"
      href="#"
    >
      Правила
    </router-link>
    <a
      class="nav__link"
      href="#"
    >
      Вконтакте
    </a>
    <a
      class="nav__link"
      href="#"
    >
      Дискорд
    </a>
  </nav>
</template>

<script>
import { ACCENT } from '@/constants/headerColors'
import { PLAY_LINK } from '@/constants/links'
import headerElementsColorMixin from '@/mixins/headerElementsColorMixin'
import copyPlayLink from '@/composition/Header/copyPlayLink'

export default {
  name: 'HeaderNav',
  mixins: [headerElementsColorMixin],
  props: {
    color: {
      type: String,
      require: true,
      default: ACCENT
    }
  },
  setup () {
    return {
      copyPlayLink,
      PLAY_LINK
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  @media ($laptop) {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
  }

  &__link {
    display: block;
    margin-bottom: 10px;
    color: var(--text-color);
    font-size: 18px;
    font-family: $second-font;
    line-height: 21px;
    text-decoration: none;
    transition: color $transition;

    @media ($laptop) {
      margin-bottom: 0;
    }
  }

  &__link:last-child {
    margin-bottom: 0;
  }

  &__play-link {
    display: block;
    margin-bottom: 10px;
    color: $blue;
    font-size: 14px;
    line-height: 21px;

    @media ($laptop) {
      margin-right: 15%;
      margin-bottom: 0;
    }
  }

  &--accent {
    .nav {
      &__link {
        color: var(--accent-color);
      }
    }
  }

  &--text {
    .nav {
      &__link {
        color: var(--text-color);
      }
    }
  }
}
</style>
