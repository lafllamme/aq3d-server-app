<script setup lang="ts">
interface ServerProps {
  ID: number
  SortIndex: number
  HostName: string
  Port: number
  State: boolean
  Chat: boolean
  Language: string
  IP: string
  LocalIP: string
  LastUpdated: string
  AlertLevel: number
  Status: number
  Region: string
}

const props = defineProps<ServerProps>()
</script>
<template>
  <div>
    <h1>Server Information</h1>
  </div>
</template>

<style scoped></style>
