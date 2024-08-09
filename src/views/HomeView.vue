<script setup lang="ts">
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { portalApp } from '@/portal'
import HeroView from '@/components/HeroView.vue'
import SearchForm from '@/components/forms/SearchForm.vue'
import ProductCard from '@/components/cards/ProductCard.vue'
import CreateProductForm from '@/components/forms/CreateProductForm.vue'

const store = useStore()
const getProducts = async () => await store.dispatch('getProducts')

const state = computed(() => store.state.product)
const accountState = computed(() => store.state.account)

const q = ref('')
const updateQ = (newQ: string) => {
  q.value = newQ
}

const products = computed(() =>
  state.value.data.filter((product: ProductType) =>
    product.name.toLowerCase().includes(q.value.toLowerCase())
  )
)

const isLoggedIn = computed(() => !!accountState.value.data)

const showCreateProductForm = () => {
  portalApp.mount(CreateProductForm)
}
</script>

<template>
  <HeroView />

  <span
    style="font-variant: small-caps"
    class="text-xl md:text-3xl w-full flex items-center gap-4 my-4 before:h-1 before:grow before:bg-black after:h-1 after:grow after:bg-black px-[10%]"
  >
    products
  </span>

  <section class="w-full flex justify-between items-center px-[8%] mb-4">
    <SearchForm :q="q" @update:q="updateQ" />

    <button
      v-if="isLoggedIn"
      @click="showCreateProductForm"
      class="px-6 py-1 bg-slate-500 text-white rounded hover:bg-slate-600"
    >
      Add Product
    </button>
  </section>

  <section class="w-full px-[8%] mb-10">
    <div v-if="state.loading" class="text-center py-8 flex items-center justify-center">
      <div class="w-8 h-8 rounded-full border-t border-t-slate-600 animate-spin" />
    </div>

    <div v-else-if="state.error" class="text-center py-8">
      <p class="text-red-500">{{ state.error }}</p>
      <button
        @click="getProducts"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh
      </button>
    </div>

    <div v-if="!state.loading && products.length === 0" class="text-center py-8 flex flex-col items-center gap-4">
      <p v-if="q">No products match your search.</p>
      <p v-else>No products available.</p>

      <button
        v-if="!q"
        @click="getProducts"
        class="px-8 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        Refresh
      </button>
    </div>

    <div v-else class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(14em,1fr))]">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<style></style>
