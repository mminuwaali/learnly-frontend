<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['update:q'])
const props = defineProps<{ q: string }>()

const searchQuery = ref(props.q)

watch(searchQuery, (newValue) => {
  emit('update:q', newValue)
})

const submitSearch = () => {
  if (searchQuery.value.trim()) {
    emit('update:q', searchQuery.value.trim())
    searchQuery.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="submitSearch" class="flex lg:w-1/3 md:w-3/5">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Enter your search query"
      class="flex-grow px-4 py-2 text-base border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
    />
    <button
      type="submit"
      class="px-6 py-2 text-base text-white bg-slate-500 rounded-r-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
    >
      Search
    </button>
  </form>
</template>
