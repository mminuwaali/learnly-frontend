<script setup lang="ts">
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'

const store = useStore()

const state = computed(() => store.state.account)
const data = reactive({ email: '', username: '', password: '', repeat: '' })

const handleSubmit = async () => await store.dispatch('signup', data)
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-8 bg-white bg-opacity-80 shadow backdrop-blur-md py-16 p-8 md:p-14 w-5/6 md:w-7/12"
  >
    <header class="flex flex-col items-center w-full">
      <h2 class="font-bold text-xl capitalize">welcome guest</h2>
      <p class="text-sm">Become our most valuable customer</p>
    </header>

    <div class="flex flex-wrap gap-4">
      <input
        required
        name="email"
        type="email"
        placeholder="Email"
        v-model="data.email"
        :disabled="state.loading"
        class="bg-white shadow px-4 p-2 border-none rounded-md w-full disabled:pointer-events-none outline-none"
      />
      <input
        required
        type="text"
        name="username"
        placeholder="Username"
        v-model="data.username"
        :disabled="state.loading"
        class="bg-white shadow px-4 p-2 border-none rounded-md w-full disabled:pointer-events-none outline-none"
      />
      <input
        required
        name="password"
        type="password"
        v-model="data.password"
        placeholder="Password"
        :disabled="state.loading"
        class="bg-white disabled:bg-slate-200 shadow px-4 p-2 border-none rounded-md w-full disabled:pointer-events-none outline-none"
      />
      <input
        required
        name="repeat"
        type="password"
        v-model="data.repeat"
        placeholder="Repeat Password"
        :disabled="state.loading"
        class="bg-white disabled:bg-slate-200 shadow px-4 p-2 border-none rounded-md w-full disabled:pointer-events-none outline-none"
      />

      <router-link
        replace
        :to="{ name: 'signin' }"
        style="font-variant: small-caps"
        class="ml-auto text-sm underline underline-offset-2"
        >have an account?</router-link
      >
    </div>

    <div class="flex flex-col gap-1 w-full">
      <button
        type="submit"
        :disabled="state.loading"
        class="bg-black disabled:bg-gray-500 py-3 rounded-md w-full font-bold text-center text-sm text-white disabled:cursor-not-allowed"
      >
        Register
      </button>
      <p v-if="state.error" class="mt-2 text-center text-red-500 text-sm">{{ state.error }}</p>
    </div>
  </form>
</template>

<style></style>
