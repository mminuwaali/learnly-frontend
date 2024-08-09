<script setup lang="ts">
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const store = useStore()

onMounted(() => {
  store.dispatch('getProducts')
})
</script>

<template>
  <router-view />
</template>

<style>
@tailwind base;
@tailwind utilities;
@tailwind components;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 10px;
    background: #e3e3e3;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #3e3e3e;
  }
}

body {
  width: 100vw;
  height: auto;
  display: flex;
  overflow-x: hidden;

  :is(#app, #portal) {
    width: 100vw;
    display: flex;
    position: relative;
    align-items: center;
    overflow: hidden auto;
    justify-content: center;
  }

  #app {
    flex: 1 0 auto;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
  }

  #portal {
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    position: fixed;
    transition: 400ms;
    backdrop-filter: blur(1em);
    background-color: rgba(0 0 0 / 0.6);

    &:empty {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
