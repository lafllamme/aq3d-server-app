<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface QueueProps {
  InputQueueLength: number
  GEMQueueLength: number
}

const props = defineProps<QueueProps>()
</script>
<template>
  <div>
    <h1>Queu Information</h1>
  </div>
</template>

<style scoped></style>
