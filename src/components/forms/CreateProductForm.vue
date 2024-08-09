<script setup lang="ts">
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import { portalApp } from '@/portal'

const image = ref(null)
const store = useStore()
const data = reactive({ name: '', price: 0, description: '' })
console.log(store)

const handleSubmit = async () => {
  const formData = new FormData()

  formData.append('name', data.name)
  formData.append('price', data.price.toString())
  formData.append('description', data.description)
  if (image.value) formData.append('image', image.value)

  await store.dispatch('createProduct', formData)
}

const closeForm = () => {
  portalApp.unmount()
}

const handleImageChange = (event: any) => {
  image.value = event.target.files[0]
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-8 w-3/5 md:w-1/2 bg-white py-16 p-8 md:p-14 bg-opacity-80 backdrop-blur-md shadow rounded-md relative"
  >
    <button
      @click="closeForm"
      type="button"
      class="self-end px- py-0.5 text-sm bg-gray-200 rounded-md top-4 right-4 absolute"
    >
      Close
    </button>

    <header class="flex flex-col items-center w-full">
      <h2 class="font-bold text-xl capitalize">Create Product</h2>
      <p class="text-sm">Enter product details</p>
    </header>

    <div class="flex flex-wrap gap-2">
      <input
        required
        name="name"
        type="text"
        placeholder="Product Name"
        v-model="data.name"
        class="bg-white shadow px-4 p-2 border-none rounded-md w-full outline-none"
      />
      <input
        required
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        v-model="data.price"
        class="bg-white shadow px-4 p-2 border-none rounded-md w-full outline-none"
      />
      <input
        required
        name="image"
        type="file"
        placeholder="Image URL"
        @change="handleImageChange"
        class="bg-white shadow px-4 p-2 border-none rounded-md w-full outline-none"
      />
      <textarea
        required
        name="description"
        placeholder="Description"
        v-model="data.description"
        class="bg-white shadow px-4 p-2 border-none rounded-md w-full outline-none"
      ></textarea>
    </div>

    <div class="flex flex-col gap-1 w-full">
      <button
        type="submit"
        class="bg-black py-3 rounded-md w-full font-bold text-center text-sm text-white"
      >
        Create Product
      </button>
    </div>
  </form>
</template>
