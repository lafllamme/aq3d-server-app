<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div
      :id="id"
      data-popover
      role="tooltip"
      class="absolute z-10 mr-12 invisible inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div
        class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
      </div>
      <div class="px-3 py-2">
        <p>{{ description }}</p>
      </div>
      <div data-popper-arrow></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PopoverProps {
  id: string
  title: string
  description: string
}
const props = defineProps<PopoverProps>()
</script>

<style scoped></style>
