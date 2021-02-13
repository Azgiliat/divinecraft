<template>
  <div
    class="switcher"
    :class="{'switcher--off': !checked, 'switcher--on': checked}"
    @click="checked = !checked"
  >
    <div class="switcher__line" />
    <div class="switcher__circle" />
    <div
      class="switcher__icon-wrapper"
    >
      <slot name="icon">
        <svg
          width="24"
          height="24"
          class="switcher__icon"
        >
          <use xlink:href="#theme-switcher" />
        </svg>
      </slot>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'

export default {
  name: 'Switcher',
  props: {
    isChecked: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  emits: ['update:isChecked'],
  setup (props, { emit }) {
    const { isChecked } = toRefs(props)
    const checked = computed({
      get () {
        return isChecked.value
      },
      set () {
        emit('update:isChecked', !isChecked.value)
      }
    })

    return {
      checked
    }
  }
}
</script>

<style lang="scss" scoped>
.switcher {
  $self: &;
  @include hover();
  position: relative;
  display: flex;
  align-items: center;
  width: 50px;
  padding: 2px;

  &__icon-wrapper {
    margin-left: 10px;
  }

  &__icon {
    @include transition(fill);
    fill: var(--accent-color);
  }

  &__line {
    @include transition(background-color);
    width: 100%;
    min-width: 46px;
    height: 10px;
    border-radius: 10px;
    background-color: var(--text-color);
  }

  &__circle {
    @include transition(background-color, transform);
    position: absolute;
    top: calc(50% - 7px);
    left: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--accent-color);
  }

  &--off {
    #{$self}__circle {
      transform: translateX(0);
    }
  }

  &--on {
    #{$self}__circle {
      transform: translateX(calc(46px - 50%));
    }
  }
}
</style>
