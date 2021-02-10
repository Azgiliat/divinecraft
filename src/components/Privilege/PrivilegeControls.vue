<template>
  <div class="privilege__controls">
    <button
      v-for="type in privilegeTypes"
      :key="type"
      type="button"
      class="privilege__control"
      :class="currentType === type.value && 'privilege__control--active'"
      @click="$emit('update:current-type', type.value)"
    >
      <span class="privilege__control-text">
        {{ type.title }}
      </span>
    </button>
  </div>
</template>
<script>
import privilegesTypeTranslator from '@/utils/privilegesTypeTranslator'
import { TYPES } from '@/constants/privileges/privilegesTypes'

export default {
  name: 'PrivilegeControls',
  props: {
    currentType: {
      type: String,
      require: false,
      default: 'forever'
    }
  },
  emits: {
    'update:current-type': null
  },
  setup () {
    const privilegeTypes = []

    TYPES.forEach((val) => {
      privilegeTypes.push({
        title: privilegesTypeTranslator(val),
        value: val
      })
    })

    return {
      privilegeTypes
    }
  }
}
</script>

<style lang="scss" scoped>
.privilege {
  &__controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    @media ($tablet) {
      justify-content: space-between;
    }

    @media ($desktop) {
      justify-content: start;
    }
  }

  &__control {
    $self: &;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid var(--text-color);
    border-radius: 10px;
    background-color: transparent;
    transition: border-color $transition;

    @media ($tablet) {
      margin-bottom: 0;
    }

    &-text {
      @include transition(color);
      color: var(--text-color);
    }

    &--active {
      border-color: $blue;

      #{$self} {
        &-text {
          color: $blue;
        }
      }
    }

    &:not(:last-child) {
      margin-right: 10px;

      @media($tablet) {
        margin-right: 0;
      }

      @media ($desktop) {
        margin-right: 10px;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
