<template>
  <section class="privilege">
    <div
      class="container"
    >
      <Back
        class="privilege__back"
        :to="'/'"
      >
        Вернуться к выбору привилегии
      </Back>
      <div
        v-if="privilege"
        class="privilege__content"
      >
        <Intro
          v-model:current-type="currentType"
          :name="privilege.displayName"
          :img-link="privilege.imgLink"
          class="privilege__intro"
        >
          <template #title>
            {{ privilege.displayName }}
          </template>
          <template #description>
            {{ privilege.description }}
          </template>
        </Intro>
        <Price
          class="privilege__price"
          @addPrivilegeToCart="addPrivilegeToCart"
        >
          <template #pre-price>
            {{ privilege.prePrice }}
          </template>
          <template #price>
            {{ privilege.price }}
          </template>
          <template #name>
            {{ privilege.displayName }}
          </template>
          <template #type>
            {{ formattedType }}
          </template>
        </Price>
        <Description
          class="privilege__description"
          :description="privilege.description"
        />
        <OtherPrivileges
          :key="otherPrivilegesKey"
          class="privilege__other-privileges"
          :privilege-name="name"
        />
      </div>
    </div>
  </section>
</template>

<script>
import OtherPrivileges from '@/components/Privilege/OtherPrivileges'
import Description from '@/components/Privilege/Description'
import Price from '@/components/Privilege/Price'
import Back from '@/components/UI/Back'
import Intro from '@/components/Privilege/Intro'

import { computed, toRefs, unref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import addPrivilege from '@/composition/Privileges/addPrivilegeToCart'

import { TYPES, FOREVER } from '@/constants/privileges/privilegesTypes'
import privilegesTypeTranslator from '@/utils/privilegesTypeTranslator'

export default {
  name: 'Privilege',
  components: {
    Back,
    Intro,
    Price,
    Description,
    OtherPrivileges
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const otherPrivilegesKey = ref(0)
    const { params, query } = toRefs(route)
    const privileges = computed(() => store.getters['privileges/getPrivilegesByName'](unref(params).name))
    const currentType = computed({
      get: () => TYPES.has(unref(query).type) ? unref(query).type : FOREVER,
      set: newVal => {
        router.push({
          query: {
            type: newVal
          }
        })
      }
    })
    const privilege = computed(() => unref(privileges)
      .find(privilege => privilege.name === `${unref(params).name.toLowerCase()}_${unref(currentType)}`) || unref(privileges)[0])
    const { addPrivilegeToCart } = addPrivilege(privilege)

    watch(() => params.value, () => {
      otherPrivilegesKey.value++
    })

    return {
      privileges,
      privilege,
      currentType,
      otherPrivilegesKey,
      addPrivilegeToCart,
      name: computed(() => unref(params).name),
      formattedType: computed(() => privilegesTypeTranslator(unref(currentType)))
    }
  }
}
</script>

<style lang="scss" scoped>
.privilege {
  padding-top: 20px;
  background-color: transparent;

  &__content {
    @media ($laptop) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__back {
    margin: 0 auto;

    @media ($laptop) {
      display: none;
    }
  }

  &__intro {
    margin: 0 auto 30px 0;

    @media ($laptop) {
      margin: 0 0 50px 0;
    }
  }

  &__price {
    margin-bottom: 30px;

    @media ($laptop) {
      margin-bottom: 0;
      margin-left: auto;
    }
  }

  &__description {
    margin-bottom: 30px;

    @media ($laptop) {
      width: 50%;
    }

    @media ($desktop) {
      flex-grow: 1;
      width: auto;
      min-width: 780px;
      max-width: calc(100% - 420px);
    }
  }

  &__other-privileges {
    @media ($laptop) {
      margin-left: auto;
    }

    @media ($desktop) {
      width: 400px;
    }
  }
}
</style>
