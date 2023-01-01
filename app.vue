<script setup lang="ts">
type serverType = {
  [key: string]: any // 👈️ variable keys
}
const servers: serverType = ref<serverType>([])
const { data }: { data: any } = await useFetch('/api/serverData')

const getCurrentDate = () => {
  const addZ = (n: string) => {
    return parseInt(n) < 10 ? '0' + n : '' + n
  }
  const now = new Date()

  let M = now.getMonth().toString()
  let D = now.getDate().toString()
  let Y = now.getFullYear()
  let h = now.getHours().toString()
  let m = now.getMinutes().toString()
  let s = now.getSeconds().toString()

  // add zero in front of numbers < 10
  D = addZ(D)
  m = addZ(m)
  h = addZ(h)
  s = addZ(s)
  return `${M + 1}/${D}/${Y} ${h}:${m}:${s}`
}

let lastUpdate = ref<string>(getCurrentDate())
let onlineStatus = ref<boolean>(true)

//assign apiData to apiRef
servers.value = data

//create apiHandler as function that calls and returns the apiData
const apiHandler = async () => {
  const { data }: { data: any } = await useFetch('/api/serverData')

  console.log('I got called')

  //if server has zero connections, set onlineStatus to false
  if (data.value[0].Connections === 0) {
    onlineStatus.value = false
  }
  console.log(data.value[0].Connections)
  lastUpdate.value = getCurrentDate()
  return data
}

//setInterval to call apiHandler every 10-50s asynchroniously
setInterval(async () => {
  servers.value = await apiHandler()
}, Math.floor(Math.random() * (50000 - 10000 + 1) + 10000))

//calculate total server workload
const totalWorkload = computed(() => {
  let total = 0
  servers.value.forEach((server: any) => {
    total += server.Workload
  })
  return total
})
//check for dark mode in localstorage
onMounted(() => {
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
<template>
  <LayoutMenu :last-update="lastUpdate" :online-status="onlineStatus">
    <div
      class="py-12 md:py-14 mx-auto text-center bg-zinc-200 dark:text-white dark:bg-gray-900"
    >
      <div class="py-3 mt-5 md:mt-8">
        <MessageInfo />
        <HeadingWelcome />
      </div>

      <PlayerTable :server-data="servers.value" />
      
      <LayoutFooter />
    </div>
  </LayoutMenu>
</template>
