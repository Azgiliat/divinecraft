<template>
  <div
    class="privilege"
    :class="`privilege--${privilegeName.toLowerCase()}`"
  >
    <div class="privilege__info">
      <p class="privilege__header">
        {{ privilegeName }}
      </p>
      <p class="privilege__description">
        {{ description }}
      </p>
      <router-link
        :to="`/privilege/${privilegeName}`"
        class="privilege__price"
      >
        от {{ price }} ₽
      </router-link>
    </div>
    <div class="privilege__img-wrapper">
      <img
        :src="imgLink"
        class="privilege__img"
        alt="privilege image"
      >
    </div>
  </div>
</template>

<script>
import DisplayPrivilegeCard from '@/composition/Privileges/DisplayPrivilegeCard'

export default {
  name: 'Privilege',
  props: {
    privilegeName: {
      type: String,
      require: true,
      default: ''
    }
  },
  setup (props) {
    const { theCheapestPrivilege } = DisplayPrivilegeCard(props.privilegeName)

    return {
      ...theCheapestPrivilege.value
    }
  }
}
</script>

<style lang="scss" scoped>
.privilege {
  display: flex;
  justify-content: space-between;
  max-width: 314px;
  padding-right: 5px;
  border-radius: 8px;

  @each $privilege, $color in $privileges {
    &--#{$privilege} {
      background-color: $color;
    }
  }
  @supports (filter: drop-shadow(0px 4px 40px rgba(0, 193, 73, 0.4))) {
    filter: drop-shadow(0px 4px 40px rgba(0, 193, 73, 0.4));
  }

  @media ($tablet) {
    height: 100%;
  }

  @media ($laptop) {
    max-width: 400px;
    padding: 20px;
  }

  &__header, &__description {
    margin: 0;
    color: $white;
  }

  &__info {
    flex-grow: 1;
    padding: 10px;

    @media ($tablet) {
      display: flex;
      flex-direction: column;
    }
  }

  &__header {
    margin-bottom: 15px;
    font-weight: 900;
    font-size: 20px;
    line-height: 28px;
    text-align: center;

    @media ($laptop) {
      font-weight: bold;
      font-size: 28px;
      line-height: 32px;
    }
  }

  &__description {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 18px;
    font-family: $second-font;
    line-height: 21px;

    @media ($laptop) {
      font-weight: normal;
      font-size: 16px;
      line-height: 18px;
    }
  }

  &__img-wrapper {
    width: 120px;
    height: 166px;
  }

  &__img {
    width: auto;
    height: 100%;
  }

  &__price {
    display: block;
    width: 100%;
    margin: 0;
    padding: 10px 15px;
    border: 2px solid $white;
    border-radius: 10px;
    background-color: transparent;
    color: $white;
    outline: none;
    text-align: center;

    @media ($tablet) {
      margin-top: auto;
    }

    &:hover {
      cursor: pointer;
    }
  }

}
</style>
