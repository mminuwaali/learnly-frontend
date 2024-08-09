<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { authBanner } from '@/constants/media'

const store = useStore()
const router = useRouter()

const user = computed(() => store.state.account.data)

watch(
  user,
  (newUser) => {
    if (newUser !== null) router.replace({ name: 'home' })
  },
  { immediate: true }
)
</script>

<template>
  <section class="w-screen h-screen flex md:p-10 md:px-16">
    <aside class="w-1/3 md:w-1/2 h-full bg-black md:relative absolute top-0 left-0">
      <img :src="authBanner" alt="" class="w-full h-full object-cover brightness-75 blur-sm" />
    </aside>

    <main class="grow basis-2/3 z-10 h-full shadow flex flex-col">
      <header class="w-full flex items-center justify-start px-10">
        <router-link replace :to="{ name: 'home' }" class="font-bold text-3xl text-slate-800">
          logo
        </router-link>
      </header>

      <section class="grow items-center justify-center flex">
        <router-view />
      </section>
    </main>
  </section>
</template>

<style></style>
