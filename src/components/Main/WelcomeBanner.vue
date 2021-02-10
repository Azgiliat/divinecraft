<template>
  <section class="welcome-banner">
    <div class="container">
      <div class="welcome-banner__info">
        <h1 class="welcome-banner__header">
          DivineCraft — самый динамично растущий Minecraft проект
        </h1>
        <p class="welcome-banner__text">
          У нас вы можете весело провести время на таких режимах, как: BrawlStars, SkyWars, BedWars, Анархия
        </p>
      </div>
      <div class="welcome-banner__logo-wrapper">
        <picture>
          <source
            :media="`(${retinaQueryWithoutQuotes})`"
            :srcset="require('st/images/logo@2x.png')"
          >
          <img
            class="welcome-banner__logo"
            src="~st/images/logo@1x.png"
          >
        </picture>
      </div>
    </div>
  </section>
</template>

<script>
import { retinaQuery } from '@/assets/css/vars.scss'

export default {
  name: 'WelcomeBanner',
  data () {
    return {
      retinaQuery
    }
  },
  computed: {
    retinaQueryWithoutQuotes () {
      return this.retinaQuery.replace(/["]/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.welcome-banner {
  @include back-retina('main/welcome-banner');
  width: 100%;
  max-width: 100%;
  min-height: 690px;
  padding-top: 30px;

  @media ($laptop) {
    height: 690px;
  }

  @media ($desktop) {
    padding-top: 200px;
  }

  .container {
    @media ($desktop) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__header, &__text {
    margin: 0;
    color: $white;
  }

  &__info {
    @media ($desktop) {
      width: 870px;
    }
  }

  &__header {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 30px;
    line-height: 38px;
    @media ($laptop) {
      font-weight: bold;
      font-size: 38px;
      line-height: 44px;
      text-align: center;
    }
    @media ($desktop) {
      text-align: left;
    }
  }

  &__text {
    margin-bottom: 30px;
    @media ($laptop) {
      text-align: center;
    }
    @media ($desktop) {
      text-align: left;
    }
  }

  &__logo-wrapper {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;

    @media ($desktop) {
      width: 280px;
      height: 285px;
      margin: 0;
    }
  }

  &__logo {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
