<script setup lang="ts">
import { reactive, ref } from "vue";

type serverType = {
  [key: string]: any // 👈️ variable keys
}
const props = defineProps<{
  foo: string
  bar?: number
}>()

interface ServerData {
  id: number
  sortIndex: number,
  name: string,
  hostName: string,
  port: number,
  userCount: number,
  maxUsers: number,
  state: true,
  chat: true,
  language: string,
  ip: string,
  localIp: string,
  lastUpdated: string,
  connections: number,
  alertLevel: number,
  inputQueueLength?: number,
  gemQueueLength?: number,
  status: number,
  region: string
}

const getServerData: ServerData[] = reactive([{
  id: 0,
  sortIndex: 0,
  name: '',
  hostName: '',
  port: 0,
  userCount: 0,
  maxUsers: 0,
  state: true,
  chat: true,
  language: '',
  ip: '',
  localIp: '',
  lastUpdated: '',
  connections: 0,
  alertLevel: 0,
  inputQueueLength: 0,
  gemQueueLength: 0,
  status: 0,
  region: ''
}])
const servers: serverType = ref<serverType>([])
const { data }: { data: serverType } = await useFetch('/api/serverData')
const {data: newData}: ServerData[] = await useFetch('/api/serverData')

//for each value inside newData, assign it to getServerData with same interface prop
for (const [key, value] of Object.entries(newData)) {
  getServerData[key] = value
  console.log(key, value, 'loop');
}
console.log( newData.value, 'im still here');
console.log( getServerData, 'im x here');


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

let lastUpdate: any = ref<string>(getCurrentDate())
let onlineStatus = ref<boolean>(true)
let totalOnline = ref<number>(0)
let workload = ref<number>(0)
let style = ref<string>('')
let inputQueueLength = ref<number>(0)
let gemQueueLength = ref<number>(0)
//assign apiData to apiRef
servers.value = data
//create apiHandler as function that calls and returns the apiData
const apiHandler = async () => {
  const { data }: { data: any } = await useFetch('/api/serverData')
  console.log('I got called')

  //calculate statistics
  const serverStatistics = await totalWorkload(servers).then((result) => result)
  const online = await checkOnline(servers)

  //check if online length equals servers.length
  onlineStatus.value = online === servers.value.value.length;

  //assign statistics to totalOnline and workload
  totalOnline.value = serverStatistics.sum
  workload.value = serverStatistics.workload
  style.value = `width: ${workload.value.toFixed(2)}%`
  inputQueueLength.value = data.value[0].InputQueueLength
  gemQueueLength.value = data.value[0].GEMQueueLength

  lastUpdate.value = getCurrentDate()

  return data
}

//setInterval to call apiHandler every 10-50s asynchroniously
setInterval(async () => {
  servers.value = await apiHandler()
}, Math.floor(Math.random() * (50000 - 10000 + 1) + 10000))

//if every server.Connections is over 3, set onlineStatus to true
const checkOnline = async (server: any) => {
  console.log('Checking online status')
  server = servers.value.value

  //we have two servers that are always online, so we start with 2
  return server.reduce((total: number, server: any) => {
    if (server.Connections > 3) {
      return total + 1
    } else {
      return total
    }
  }, 2)
}
//calculate total server workload
const totalWorkload = async (servers: any) => {
  //calculate total workload
  const server = servers.value.value
  //for each server.Connections, add to total
  const sum = server.reduce(
    (total: number, server: any) =>
      total + (server.Connections ? server.Connections : 0),
    0
  )
  //divide amount of server connection by total space of 3600
  const workload = (sum / 3600) * 100
  return {
    sum,
    workload,
  }
}

const serverStatistics = await totalWorkload(servers).then((result) => result)

//assign statistics to totalOnline and workload
totalOnline.value = serverStatistics.sum
workload.value = serverStatistics.workload ? serverStatistics.workload : 0
style.value = workload.value
  ? `width: ${workload.value.toFixed(2)}%`
  : 'width: 33%'

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
  <title>A3QD Status</title>
  <LayoutMenu
    :last-update="lastUpdate"
    :total-online="totalOnline"
    :workload="workload"
    :style="style"
  >
    <div
      class="py-14 mt-12 md:py-8 md:mt-6 mx-auto text-center bg-slate-200 dark:text-white dark:bg-gray-900"
    >
      <div class="py-8 mt-6 md:mt-6 md:py-12">
        <MessageInfo />
        <HeadingWelcome />
        <ServerStatus :server-status="onlineStatus" />
      </div>

      <div class="py-5 px-10 mb-5">
        <ServerStatistics
          :input-queue-length="inputQueueLength"
          :gem-queue-length="gemQueueLength"
        />
        <ServerFAQ />
      </div>

      <PlayerTable :server-data="servers.value" />

      <LayoutFooter />
    </div>
  </LayoutMenu>
</template>
