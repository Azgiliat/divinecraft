<template>
  <div class="price">
    <p class="price__title">
      <span class="price__title">
        Цена
      </span>
      <span
        v-if="$slots['pre-price']"
        class="price__pre-price"
      >
        <slot name="pre-price" />₽
      </span>
      <span class="price__price">
        <slot name="price" />₽
      </span>
    </p>
    <p class="price__chosen">
      <span class="price__chosen-name">
        Выбран товар: Статус <slot name="name" />
      </span>
      <span class="price__chosen-type">
        Длительность: <slot name="type" />
      </span>
    </p>
    <button
      type="button"
      class="price__add"
      @click="$emit('addPrivilegeToCart')"
    >
      Добавить в корзину
    </button>
  </div>
</template>
<script>
export default {
  name: 'Price',
  emits: {
    addPrivilegeToCart: null
  }
}
</script>

<style lang="scss" scoped>
.price {
  padding: 25px 20px 20px 20px;
  border-radius: 8px;
  background-color: var(--second-back-color);

  @media ($laptop) {
    align-self: center;
    width: 40%;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
  }

  @media ($desktop) {
    width: 400px;
  }

  &__title {
    display: flex;
    align-items: baseline;
    margin: 0;
    color: var(--text-color);
    font-size: 32px;
    line-height: 37px;
  }

  &__pre-price {
    margin-right: 15px;
    margin-left: auto;
    color: $grey;
    font-size: 22px;
    line-height: 25px;
    text-decoration: line-through;
  }

  &__price {
    color: var(--text-color);
    font-weight: bold;
  }

  &__chosen {
    color: var(--text-color);
    font-size: 14px;
    line-height: 17px;

    &-name, &-type {
      display: block;
      width: 100%;
    }
  }

  &__add {
    @include hover;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: $blue;
    color: $white;
    outline: none;
  }
}
</style>
