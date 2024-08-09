<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isAuthenticated = computed(() => store.state.account.data !== null)
</script>

<template>
  <header
    style="font-variant: small-caps"
    class="w-4/5 md:w-2/3 lg:w-1/3 sticky top-5 h-10 -mb-10 flex px-2 md:px-10 items-center justify-between bg-white flex-none z-50 rounded shadow-md"
  >
    <router-link :to="{ name: 'home' }" class="font-bold">logo</router-link>

    <nav v-if="isAuthenticated" class="grow flex items-center justify-end gap-4 text-xs md:text-sm">
      <button
        @click="store.dispatch('signout')"
        class="px-6 rounded-xl py-0.5 text-white bg-slate-600"
      >
        logout
      </button>
    </nav>
    <nav v-else class="grow flex items-center justify-end gap-4 text-xs md:text-sm">
      <router-link :to="{ name: 'signin' }" class="">login</router-link>
      <router-link :to="{ name: 'signup' }" class="px-6 rounded-xl py-0.5 text-white bg-slate-600"
        >register</router-link
      >
    </nav>
  </header>
</template>

<style></style>
