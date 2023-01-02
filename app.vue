<script setup lang="ts">
type serverType = {
  [key: string]: any // 👈️ variable keys
}
const servers: serverType = ref<serverType>([])
const { data }: { data: serverType } = await useFetch('/api/serverData')

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
let totalOnline = ref<number>(0)
let workload = ref<number>(0)
let style = ref<string>('')

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
  //calculate statistics

  const serverStatistics = await totalWorkload(servers).then((result) => result)

  //assign statistics to totalOnline and workload
  totalOnline.value = serverStatistics.sum
  workload.value = serverStatistics.workload
  style.value = `width: ${workload.value.toFixed(2)}%`
  lastUpdate.value = getCurrentDate()
  console.log(totalOnline.value, workload.value, 'totalOnline, workload')
  console.log('style', style.value)

  return data
}

//setInterval to call apiHandler every 10-50s asynchroniously
setInterval(async () => {
  servers.value = await apiHandler()
}, Math.floor(Math.random() * (50000 - 10000 + 1) + 10000))

//calculate total server workload
const totalWorkload = async (servers: any) => {
  //calculate total workload
  console.log('calculating workload')
  const server = servers.value.value

  //for each server.Connections, add to total
  const sum = server.reduce(
    (total: number, server: any) =>
      total + (server.Connections ? server.Connections : 0),
    0
  )
  //divide amount of server connection by total space of 3600
  const workload = (sum / 3600) * 100
  const statistics = {
    sum,
    workload,
  }
  return statistics
}
const serverStatistics = await totalWorkload(servers).then((result) => result)

//assign statistics to totalOnline and workload
totalOnline.value = serverStatistics.sum
workload.value = serverStatistics.workload
style.value = workload.value
  ? `width: ${workload.value.toFixed(2)}%`
  : 'width: 33%'

console.log('style', style.value)

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
  <LayoutMenu
    :last-update="lastUpdate"
    :total-online="totalOnline"
    :workload="workload"
    :online-status="onlineStatus"
    :style="style"
  >
    <div
      class="py-14 mt-12 md:py-8 md:mt-6 mx-auto text-center bg-slate-200 dark:text-white dark:bg-gray-900"
    >
      <div class="py-8 mt-6 md:mt-6 md:py-12">
        <MessageInfo />
        <HeadingWelcome />
      </div>

      <PlayerTable :server-data="servers.value" />

      <LayoutFooter />
    </div>
  </LayoutMenu>
</template>
