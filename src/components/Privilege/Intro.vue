<template>
  <div class="intro">
    <div class="intro__img-wrapper">
      <div
        class="intro__back"
        :class="`intro__back--${name.toLowerCase()}`"
      />
      <img
        class="intro__img"
        :src="imgLink"
      >
    </div>
    <h2 class="intro__title">
      <slot name="title" />
    </h2>
    <PrivilegeControls
      v-model:current-type="innerCurrentType"
      class="intro__controls"
    />
    <p class="intro__description">
      <slot name="description" />
    </p>
  </div>
</template>

<script>
import { toRefs, computed } from 'vue'
import PrivilegeControls from '@/components/Privilege/PrivilegeControls'

export default {
  name: 'Intro',
  components: {
    PrivilegeControls
  },
  props: {
    imgLink: {
      type: String,
      require: false,
      default: ''
    },
    currentType: {
      type: String,
      require: false,
      default: 'forever'
    },
    name: {
      type: String,
      require: true,
      default: ''
    }
  },
  emits: {
    'update:current-type': null
  },
  setup (props, { emit }) {
    const { currentType } = toRefs(props)

    return {
      innerCurrentType: computed({
        get () {
          return currentType.value
        },
        set (newVal) {
          emit('update:current-type', newVal)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 314px;
  padding: 0 10px;

  @media ($tablet) {
    display: grid;
    grid-template-areas: 'img controls' 'img description' 'title description';
    grid-template-columns: 314px 1fr;
    grid-row-gap: 10px;
    max-width: none;
  }

  @media ($laptop) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
  }

  @media ($desktop) {
    display: grid;
    flex-grow: 1;
    grid-template-areas: 'img title' 'img description' 'img controls';
    width: auto;
    max-width: calc(100% - 420px);
  }

  &__title {
    margin: 0 0 10px 0;
    color: var(--text-color);
    font-weight: 800;
    font-size: 30px;
    line-height: 39px;

    @media ($tablet) {
      grid-area: title;
      margin-bottom: 0;
      text-align: center;
    }

    @media ($desktop) {
      grid-area: title;
      margin-bottom: 25px;
      font-weight: bold;
      font-size: 42px;
      line-height: 48px;
      text-align: left;
    }
  }

  &__description {
    margin: 0 0 10px 0;
    color: var(--text-color);
    font-size: 16px;
    line-height: 21px;

    @media ($tablet) {
      grid-area: description;
      align-self: start;
      margin-top: 25px;
      margin-bottom: 0;
    }

    @media ($desktop) {
      grid-area: description;
      margin: 0 0 70px 0;
      font-weight: 300;
      font-size: 24px;
      line-height: 28px;
    }
  }

  &__controls {
    @media ($tablet) {
      grid-area: controls;
      margin-top: 25px;
    }

    @media ($desktop) {
      grid-area: controls;
      margin: 0;
    }
  }

  &__control-text {
    color: var(--text-color);
  }

  &__img-wrapper {
    position: relative;
    width: 204px;
    height: 264px;
    margin-bottom: 10px;

    @media ($tablet) {
      grid-area: img;
      justify-self: center;
      margin-bottom: 0;
    }

    @media ($desktop) {
      grid-area: img;
      margin-right: 30px;
    }
  }

  &__img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  &__back {
    position: absolute;
    top: calc(50% - 70px);
    left: -10px;
    z-index: 1;
    width: calc(100% + 20px);
    height: 100px;
    border-radius: 10px;

    @each $privilege, $color in $privileges {
      &--#{$privilege} {
        background-color: $color;
      }
    }
  }
}
</style>
