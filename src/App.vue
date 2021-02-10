<template>
  <div
    class="app"
    :class="{[`app--${theme}-theme`]: true}"
  >
    <Header class="app__header" />
    <router-view class="app__body" />
    <Footer class="app__footer" />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'

import { computed } from 'vue'
import { useStore } from 'vuex'
import LoadProducts from '@/composition/App/LoadProducts'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup () {
    const store = useStore()

    LoadProducts(store)

    return {
      err: computed(() => store.state.global.errorText),
      theme: computed(() => store.state.global.activeTheme)
    }
  }
}
</script>
<style lang="scss">
.app {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;

  @media ($laptop) {
    display: flex;
    flex-direction: column;
  }

  &--dark-theme {
    @import "assets/css/dark-theme.scss";
    @include theme($back-color, $text-color, $header-color, $header-accent-color, $gold);
  }

  &--light-theme {
    @import "assets/css/light-theme.scss";
    @include theme($back-color, $text-color, $header-color, $header-accent-color, $blue);
  }

  &__footer {
    @media ($laptop) {
      margin-top: auto;
    }
  }
}
</style>
