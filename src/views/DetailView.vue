<script setup lang="ts">
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()
const product = ref<null | ProductType>(null)

watch(() => route.params.id, (newId) => {
  if (newId) {
    const id = newId as string
    product.value = store.state.product.data.find((item: ProductType) => item.id === +id) || null
  }
}, { immediate: true })
</script>

<template>
  <section class="w-full mt-20 flex flex-wrap gap-8 p-10 px-[8%] md:px-[12%]">
    <div class="min-h-96 basis-60 grow">
      <img
        :src="product?.image"
        :alt="product?.name"
        class="w-full h-full bg-slate-600 rounded-md object-contain"
      />
    </div>
    <div
      class="min-h-96 basis-80 grow flex gap-8 py-4 flex-col justify-start items-center md:items-start"
    >
      <h2 class="text-xl md:text-4xl capitalize font-semibold drop-shadow text-slate-700">
        {{ product?.name }}
      </h2>

      <p class="text-gray-500 text-justify">{{ product?.description }}</p>

      <button
        style="font-variant: small-caps"
        class="mt-auto px-12 py-1 rounded-full bg-slate-700 text-white text-center"
      >
        purchase
      </button>
    </div>
  </section>
</template>

<style></style>
