<script setup lang="ts">
import { computed } from 'vue'
const { product } = defineProps<{ product: ProductType }>()

const price = computed(() => product.price)
</script>

<template>
  <div class="p-6 gap-4 rounded-md flex flex-col shadow bg-white transition-all hover:bg-slate-100">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-60 rounded-md object-contain bg-slate-200"
    />

    <div class="w-full flex flex-col items-center -gap-1">
      <router-link
        class="lowercase text-center"
        style="font-variant: small-caps"
        :to="{ name: 'detail', params: { id: product.id } }"
        >{{ product.name }}</router-link
      >
      <b class="text-md">{{ price }}</b>
    </div>
  </div>
</template>
