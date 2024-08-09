<script setup lang="ts">
import HeaderView from "../HeaderView.vue";
import FooterView from "../FooterView.vue";
</script>

<template>
  <HeaderView />

  <main class="w-full grow flex flex-col">
    <RouterView />
  </main>

  <FooterView />
</template>

<style></style>
