<template>
  <section class="privileges">
    <div class="container">
      <h2 class="privileges__header">
        Привилегии
      </h2>
      <div class="privileges__wrapper">
        <ul class="privileges__list">
          <li
            v-for="privilegeName in privilegesNames"
            :key="privilegeName"
            class="privileges__element"
          >
            <Privilege
              class="privileges__privilege"
              v-bind="{privilegeName}"
            />
          </li>
        </ul>
        <div class="privileges__corner privileges__corner--top-left" />
        <div class="privileges__corner privileges__corner--top-right" />
        <div class="privileges__corner privileges__corner--bottom-right" />
        <div class="privileges__corner privileges__corner--bottom-left" />
      </div>
    </div>
  </section>
</template>

<script>
import Privilege from '@/components/Main/Privileges/Privilege'

import ShowPrivileges from '@/composition/Privileges/ShowPrivileges'

export default {
  name: 'Privileges',
  components: {
    Privilege
  },
  setup () {
    const { privilegesNames, isLoading } = ShowPrivileges()

    return {
      privilegesNames,
      isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.privileges {
  padding-top: 40px;
  padding-bottom: 40px;

  &__header {
    @include transition(color);
    margin: 0 0 20px;
    color: var(--text-color);
    text-align: center;

    @media ($laptop) {
      font-weight: bold;
      font-size: 38px;
      line-height: 44px;
    }
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;

    @media ($tablet) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  &__element {
    margin-bottom: 20px;

    @media ($tablet) {
      width: calc(50% - 5px);
      &:nth-child(2n) {
        margin-left: 5px;
      }
      &:nth-child(2n + 1) {
        margin-right: 5px;
      }
      &:nth-last-child(-n+2) {
        margin-bottom: 0;
      }
    }

    @media ($desktop) {
      width: calc(33% - 5px);
      &:nth-child(2n) {
        margin-left: 0;
      }
      &:nth-child(2n + 1) {
        margin-right: 0;
      }
      &:nth-last-child(-n+3) {
        margin-bottom: 0;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__privilege {
    margin: 0 auto;
  }

  &__wrapper {
    position: relative;
  }

  &__corner {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: transparent;

    &--top-left {
      top: -20px;
      left: -20px;
      border-top: 2px solid rgba($black, 0.25);
      border-left: 2px solid rgba($black, 0.25);
    }

    &--top-right {
      top: -20px;
      right: -20px;
      border-top: 2px solid rgba($black, 0.25);
      border-right: 2px solid rgba($black, 0.25);
    }

    &--bottom-right {
      right: -20px;
      bottom: -20px;
      border-right: 2px solid rgba($black, 0.25);
      border-bottom: 2px solid rgba($black, 0.25);
    }

    &--bottom-left {
      bottom: -20px;
      left: -20px;
      border-bottom: 2px solid rgba($black, 0.25);
      border-left: 2px solid rgba($black, 0.25);
    }
  }
}
</style>
